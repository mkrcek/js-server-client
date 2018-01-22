// verze 2.0: HTML
// HTML boxíky jsou generované podle JSON (typ informace a velikost)
// na pořadí JSON již nezáleží
// kamera má rozmer 6, jinak ostatni jsou 2

window.Arduino = {};

window.onload = function() {
  Arduino.axios = axios.create({
    //baseURL: 'http://192.168.0.25:1818/select/devices/',
    baseURL: 'http://localhost:1818/select/devices/',
    //baseURL: 'http://192.168.0.39:1818/select/devices/',

    timeout: 100000
  });

  Arduino.generateWeb();
  //vygeneruje HTML pro všechny BOXíky v JSON

  Arduino.showDeviceDetail();
  //vygeneruje obsah pro všechny HTML-BOXíky v JSON

  Arduino.changeDeviceDetail(0);
  //umožní zmenit jmeno zařízení číslo -0


}




//spusteni funkcíkazdou senkundu

var myVar = setInterval(function(){ myTimer() }, 1000);
function myTimer() {
    Arduino.hodiny ();
    Arduino.showDeviceDetail();                    //box na obrazovce
}



//HODINY zobrazení reálných hodin na zařízení
Arduino.hodiny = function () {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("hodiny").innerHTML = t; //hodiny
}




//Aktualizace PUT: zmeni polozku (devName) a odesle pomoci PUT na API
Arduino.changeDeviceDetail = function(itemID){

//puvodni pracovni verze - jen pro prvni MODULek

$('#device-detail-'+itemID+' .save').click(() => {
  console.log("click "+itemID);
  $('#device-detail-'+itemID+' form').submit();
});

$('#device-detail-'+itemID+' form').submit((event) => {
//  Arduino.axios.put ('/hodnota/'+itemID, {
  Arduino.axios.put ('/'+itemID, {
    devName: $('#device-detail-'+itemID+' input[name="devName"]').val()
  })
    .then(function(response) {
      console.log('UPDATE PUT' + itemID);
      Arduino.showDeviceDetail();
      console.log('Screen is refreshed');

    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
});

}//end changeDeviceDetail







//vytvoreni template z HTML a uprava dle noveho ID

Arduino.generateWeb = function(){

var boxik = $("#vzorBoxu").html();

Arduino.axios.get("/")
.then (function (response){
  var device = response.data;
  for (var i = 0; i < device.length; i++) {
    var boxikNew = boxik.replace (/sensor-ID/g, "sensor-" + i);
    //parametr  /g  znamena globalne - vsechny vyskyty, ne jen prvni

    $("#vzorBoxu").append(boxikNew);
    //generuje HTML a vloží ho nakonec
  }
  })
  .catch(function (error) {
    console.log(error);
  });

}



//zobrazení detailu - naplnění HTML teplate hodnotami z JSON

Arduino.showDeviceDetail = function() {

  Arduino.axios.get('/')
  .then(function (response) {
    var device = response.data;


    //zobrazení casu, který je na serveru

    document.getElementById("server-time").innerHTML = device[0].devSerTime; //hodiny

    //getElementById je prej rychlejši

    for (var i = 0; i < device.length; i++) {

        $(".vlastniBox:gt(0)").removeClass('hidden');
        $(".vlastniBox:gt(0)").removeClass('hidden');
        //zobrazi cely box, kromě vzorového s císlem - greater than 0, tedy od 1

        //schování všecho nepotřebného ...nasledne v kodu SWITCH bude zobrazeno
        $('#sensor-'+i+'-module-teplota').addClass('hidden');
        $('#sensor-'+i+'-module-voda').addClass('hidden');
        $('#sensor-'+i+'-module-svetlo').addClass('hidden');
        $('#sensor-'+i+'-module-alarm').addClass('hidden');
        $('#sensor-'+i+'-module-brana').addClass('hidden');
        $('#sensor-'+i+'-module-kamera').addClass('hidden');
        $('#sensor-'+i+'-module-pocasi').addClass('hidden');



        // podle typu device zobrazí položky - ostatní jsou stále neviditelné
        switch (device[i].devType) {
          case "teplota":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

               $('#sensor-'+i+'-module-teplota').removeClass('hidden');
               $('#sensor-'+i+'-module-teplota').addClass('show');
               document.getElementById("sensor-"+i+"-teplota").innerHTML = device[i].devTemp;

              break;

          case "voda":

              $('#sensor-'+i+'-module-voda').removeClass('hidden');
              $('#sensor-'+i+'-voda-modul').addClass('show');

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;
              document.getElementById("sensor-"+i+"-voda-numb").innerHTML = device[i].devWater;
              document.getElementById("sensor-"+i+"-voda").style.height = device[i].devWater+"%"; //plneni progressbaru

              //změna barvy po dosažení 60%
              if (device[i].devWater > 60){
                document.getElementById("sensor-"+i+"-voda").className = "progress-bar progress-bar-striped active progress-bar-danger";
              } else {
                document.getElementById("sensor-"+i+"-voda").className = "progress-bar progress-bar-striped active progress-bar-success"
              }
              break;

          case "svetlo":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

              $('#sensor-'+i+'-module-svetlo').removeClass('hidden');
              $('#sensor-'+i+'-module-svetlo').addClass('show');

              //jakože bliká
              if ((device[i].devLight % 2) == 0){
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o fa-4x";
              } else
              {
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o fa-4x text-warning";
              }

              break;

          case "alarm":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

              $('#sensor-'+i+'-module-alarm').removeClass('hidden');
              $('#sensor-'+i+'-module-alarm').addClass('show');

              if (device[i].devAlarm){
                document.getElementById("sensor-"+i+"-alarm-stav").className = "fa fa-exclamation-triangle fa-4x text-danger";
              } else {
                document.getElementById("sensor-"+i+"-alarm-stav").className = "fa fa-exclamation-triangle fa-4x";
              }


              break;

            case "brana":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

              $('#sensor-'+i+'-module-brana').removeClass('hidden');
              $('#sensor-'+i+'-module-brana').addClass('show');

              document.getElementById("sensor-"+i+"-brana-left").style.width = device[8].devPosition+"%";
              document.getElementById("sensor-"+i+"-brana-right").style.width = 100-device[8].devPosition+"%";


              break;

            case "kamera":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

              //zmeni rozmery BOXu, pokud se jedná o obrazek. Kamera má 6, ostatní jen 2
              $('#sensor-'+i+'-size').removeClass('col-xs-2');
              $('#sensor-'+i+'-size').addClass('col-xs-6');

              $('#sensor-'+i+'-module-kamera').removeClass('hidden');
              $('#sensor-'+i+'-module-kamera').addClass('show');

              d = new Date();
              document.getElementById("sensor-"+i+"-kamera-url").src = device[i].devCamIP+"?"+d.getTime();
            break;

            case "pocasi":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;


              $('#sensor-'+i+'-module-pocasi').removeClass('hidden');
              $('#sensor-'+i+'-module-pocasi').addClass('show');

              d = new Date();
              document.getElementById("sensor-"+i+"-pocasi-url").src = device[i].devWeatherIP+"?"+d.getTime();

            break;

          //default:
            //něco
        } //konec :switch:

    }  //konec cyklu pro kreslení obsahu

  })
  .catch(function (error) {
    console.log(error);
  });

}
