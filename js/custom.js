  // verze 2.0: HTML
// HTML boxíky jsou generované podle JSON (typ informace a velikost)
// na pořadí JSON již nezáleží
// kamera má rozmer 6, jinak ostatni jsou 2

window.Arduino = {};

window.onload = function() {
  Arduino.axios = axios.create({
    //baseURL: 'http://192.168.0.25:1818/select/devices/',
    // baseURL: 'http://localhost:1818/select/devices/',
    baseURL: 'http://192.168.0.20:1818/select/devices/',

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



// // $('#sensor-'+i+'-time').addClass('hidden');  //schová informaci o čase Aktualizace
// $('#sensor-'+i+'-size').click(function(){
//     // $('#sensor-'+i+'-time').toggle();       //prohodi stav hide - show
//     stav = $('#sensor-'+i+'-time').is(":visible");
//     console.log(stav);
//     if (stav) {
//
//       $('#sensor-'+i+'-time').removeClass('show');
//       $('#sensor-'+i+'-time').addClass('hidden');
//       console.log("stav-A");
//     } else {
//       $('#sensor-'+i+'-time').removeClass('hidden');
//       $('#sensor-'+i+'-time').addClass('show');
//       console.log("stav");
//     }
//
// });




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

        sirka = $('#sensor-'+i+'-size').css("width");
        $('#sensor-'+i+'-size').css("height", sirka);


        // podle typu device zobrazí položky - ostatní jsou stále neviditelné
        switch (device[i].devType) {



          case "teplota":
              var tempVal = device[i].devTemp;

              $('#sensor-'+i+'-name').html(device[i].devName);

              $('#sensor-'+i+'-time').html(device[i].devTime);


              // document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              // document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

               $('#sensor-'+i+'-module-teplota').removeClass('hidden');
               $('#sensor-'+i+'-module-teplota').addClass('show');
               $('#sensor-'+i+'-teplota').html(tempVal);
               // document.getElementById("sensor-"+i+"-teplota").innerHTML = tempVal;



               switch (true) {
                 case tempVal<3:
                      $('#sensor-'+i+'-size').css("background-color", "Blue");
                      $('#sensor-'+i+'-size').css("color", "AliceBlue");

                 break;
                 case tempVal<16:
                   $('#sensor-'+i+'-size').css("background-color", "CornflowerBlue");
                   $('#sensor-'+i+'-size').css("color", "Black");
                 break;
                 case tempVal<21:
                   $('#sensor-'+i+'-size').css("background-color", "BlueViolet");
                   $('#sensor-'+i+'-size').css("color", "Black");
                 break;
                 case tempVal<31:
                   $('#sensor-'+i+'-size').css("background-color", "Orange");
                   $('#sensor-'+i+'-size').css("color", "Black");
                 break;
                 case tempVal>30:
                   $('#sensor-'+i+'-size').css("background-color", "Red");
                   $('#sensor-'+i+'-size').css("color", "Black");
                 break;
                 default:

               }

              break;

          case "voda":

              $('#sensor-'+i+'-module-voda').removeClass('hidden');
              $('#sensor-'+i+'-voda-modul').addClass('show');

              $("#sensor-"+i+"-name").html(device[i].devName);
              $("#sensor-"+i+"-time").html(device[i].devTime);
              $("#sensor-"+i+"-voda-numb").html(device[i].devWater);

              // document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              // document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;
              // document.getElementById("sensor-"+i+"-voda-numb").innerHTML = device[i].devWater;
              //document.getElementById("sensor-"+i+"-voda").style.height = device[i].devWater+"%"; //plneni progressbaru
              $("#sensor-"+i+"-voda").height(device[i].devWater+"%");

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
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o ";
              } else
              {
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o text-warning";
              }

              break;

          case "alarm":

              document.getElementById("sensor-"+i+"-name").innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-time").innerHTML = device[i].devTime;

              $('#sensor-'+i+'-module-alarm').removeClass('hidden');
              $('#sensor-'+i+'-module-alarm').addClass('show');

              if (device[i].devAlarm){
                document.getElementById("sensor-"+i+"-alarm-stav").className = "fa fa-exclamation-triangle  text-danger";
              } else {
                document.getElementById("sensor-"+i+"-alarm-stav").className = "fa fa-exclamation-triangle ";
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
              // $('#sensor-'+i+'-size').removeClass('col-xs-2');
              // $('#sensor-'+i+'-size').addClass('col-xs-6');
              $('#sensor-'+i+'-size-big').removeClass('col-xs-4 col-sm-2');
              $('#sensor-'+i+'-size-big').addClass('col-xs-12 col-sm-6');

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

              $('#sensor-'+i+'-name').removeClass('show');
              $('#sensor-'+i+'-name').addClass('hidden');
              $('#sensor-'+i+'-time').removeClass('show');
              $('#sensor-'+i+'-time').addClass('hidden');

              d = new Date();
              document.getElementById("sensor-"+i+"-pocasi-url").src = device[i].devWeatherIP+"?"+d.getHours();  //aktualizuje každou hodinu



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


//kliknutím na cokoliv se zobrazí čas v 1. čidlu
// $("#vzorBoxu").click(function(){
//     $("#sensor-0-time").toggle();
// });


$(function() {
    var $log = $('#log');
    $('#sensor-5-module-pocasi').on('click dblclick', function(e) {
        $log.append(' ' + e.type);
        if (e.type == 'mousedown') {
            if (e.which == 1) {
                $log.append(' Left Button');
            } else if (e.which == 3) {
                $log.append(' Right Button');
            } else if (e.which == 2) {
                $log.append(' Middle Button');
            }
        }
    });
});
