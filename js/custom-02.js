<!-- //verze 2.0 - pevně napsane JS pro HTML-->
window.Arduino = {};
window.onload = function() {
  Arduino.axios = axios.create({
    //baseURL: 'http://192.168.0.25:1818/select/devices/',
    baseURL: 'http://localhost:1818/select/devices/',
    //baseURL: 'http://192.168.0.39:1818/select/devices/',

    timeout: 100000
  });


  Arduino.initNewDeviceDetail();
  Arduino.showDeviceDetail();

//for (var i = 0; i < 1; i++) {
  Arduino.changeDeviceDetail(0);
//}
  // Arduino.changeDeviceDetail(0);
  // Arduino.changeDeviceDetail(1);


  Arduino.initDeviceDetail();
}




//nitialize Bootstrap Switch.
//puvodni: $("[name='my-checkbox']").bootstrapSwitch();
//nove:
$("input[type='checkbox']").bootstrapSwitch();





//posunovani modulu za pomoci tlačítek
$(document).ready(function() {
    $('#moveleft').click(function() {
        $('#textbox').animate({
        'marginLeft' : "-=30px" //moves left
        });
    });
    $('#moveright').click(function() {
        $('#textbox').animate({
        'marginLeft' : "+=30px" //moves right
        });
    });
    $('#movedown').click(function() {
        $('#textbox').animate({
        'marginTop' : "+=30px" //moves down
        });
    });
    $('#moveup').click(function() {
        $('#textbox').animate({
        'marginTop' : "-=30px" //moves up
        });
    });
})

//a



//spusteni kazdou senkundu

var myVar = setInterval(function(){ myTimer() }, 1000);
function myTimer() {

    Arduino.hodiny ();
    Arduino.showDeviceDetail();                    //kartičky
}



//HODINY zobrazení reálných hodin na zařízení
Arduino.hodiny = function () {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("hodiny").innerHTML = t; //hodiny
}

Arduino.initNewDeviceDetail = function() {
}



//Arduino.showDeviceDetail = function(deviceId) {
//  Arduino.axios.get('/temperatures/' + deviceId)



//zmeni polozku a odesle pomoci PUT na API
Arduino.changeDeviceDetail = function(itemID){

//bylo tady #device-detail-0 .save
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



//specialni TEST místo na webu
Arduino.initDeviceDetail = function(){

$('#device-detail .save').click(() => {
  $('#device-detail form').submit();
});

$('#device-detail form').submit((event) => {
//  Arduino.axios.put ('/hodnota/5', {
  Arduino.axios.put ('/temperatures/5', {
    devName: $('#device-detail input[name="devName"]').val(),
    devLight: parseInt ($('#device-detail input[name="devLight"]').val())
    //prevede vlozeny string na cislo//

  })
    .then(function(response) {
      console.log('UPDATE PUT');
    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
});

}//end initDeviceDetail






//zobrazení detailu

Arduino.showDeviceDetail = function() {

//Arduino.axios.get('/temperatures/11')
  Arduino.axios.get('/')
  .then(function (response) {
    var device = response.data;
    console.log(device);
    console.log("ahoja");

    //getElementById je prej rychlejši
    //1.prvni TEPLOTA

    for (var i = 0; i < 8; i++) {

        switch (device[i].devType) {
          case "teplota":

              document.getElementById("devName-"+i).innerHTML = device[i].devName;
              document.getElementById("devTime0").innerHTML = device[i].devTime;

               $('#sensor-'+i+'-teplota').removeClass('hidden');
               $('#sensor-'+i+'-teplota').addClass('show');
               document.getElementById("devTemp-"+i).innerHTML = device[i].devTemp;


              $('#sensor-'+i+'-voda-modul').addClass('hidden');
              $('#sensor-'+i+'-svetlo').addClass('hidden');
              $('#sensor-'+i+'-alarm').addClass('hidden');
              $('#sensor-'+i+'-brana').addClass('hidden');
              $('#sensor-'+i+'-kamera').addClass('hidden');

              break;

          case "voda":
          //document.getElementById("devId"+i).innerHTML = device[i].devId;

              $('#sensor-'+i+'-voda-modul').removeClass('hidden');
              //$('#sensor-'+i+'-voda-modul').addClass('show');
              //když nechám show . tak se obrátí vzhuru nohama. Nevim proc

              document.getElementById("devName-"+i).innerHTML = device[i].devName;
              document.getElementById("sensor-"+i+"-voda-numb").innerHTML = device[i].devWater;
              document.getElementById("sensor-"+i+"-voda").style.height = device[i].devWater+"%"; //plneni progressbaru

              if (device[i].devWater > 60){
                document.getElementById("sensor-"+i+"-voda").className = "progress-bar progress-bar-striped active progress-bar-danger";
              } else {
                document.getElementById("sensor-"+i+"-voda").className = "progress-bar progress-bar-striped active progress-bar-success"
              }
              $('#sensor-'+i+'-teplota').addClass('hidden');
              $('#sensor-'+i+'-svetlo').addClass('hidden');
              $('#sensor-'+i+'-alarm').addClass('hidden');
              $('#sensor-'+i+'-brana').addClass('hidden');
              $('#sensor-'+i+'-kamera').addClass('hidden');
              break;

          case "svetlo":
          //document.getElementById("devId"+i).innerHTML = device[i].devId;


            document.getElementById("devName-"+i).innerHTML = device[i].devName;


              $('#sensor-'+i+'-svetlo').removeClass('hidden');
              $('#sensor-'+i+'-svetlo').addClass('show');

              if ((device[i].devLight % 2) == 0){
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o fa-5x";
              } else
              {
                document.getElementById("sensor-"+i+"-svetlo-stav").className = "fa fa-lightbulb-o fa-5x text-warning";
              }

              $('#sensor-'+i+'-teplota').addClass('hidden');
              $('#sensor-'+i+'-alarm').addClass('hidden');
              $('#sensor-'+i+'-brana').addClass('hidden');
              $('#sensor-'+i+'-kamera').addClass('hidden');
              break;

          case "alarm":
          //document.getElementById("devId"+i).innerHTML = device[i].devId;

              document.getElementById("devName-"+i).innerHTML = device[i].devName;

              $('#sensor-'+i+'-alarm').removeClass('hidden');
              $('#sensor-'+i+'-alarm').addClass('show');

              if (device[i].devAlarm){
                document.getElementById("sensor-"+i+"-alarm").className = "fa fa-exclamation-triangle fa-5x text-danger";
              } else {
                document.getElementById("sensor-"+i+"-alarm").className = "fa fa-exclamation-triangle fa-5x";
              }


              $('#sensor-'+i+'-teplota').addClass('hidden');
              $('#sensor-'+i+'-svetlo').addClass('hidden');
              $('#sensor-'+i+'-brana').addClass('hidden');
              $('#sensor-'+i+'-kamera').addClass('hidden');
              break;
          //default:
            //něco
        }

    }  //konec cyklu pro kreslení obsahu





    //2.druhy Alarma 2
    document.getElementById("devId7").innerHTML = device[7].devId;
    document.getElementById("devName7").innerHTML = device[7].devName;
    document.getElementById("devTime7").innerHTML = device[7].devTime;
    if (device[7].devAlarm){
      document.getElementById("alarmLevelIcon2").className = "fa fa-exclamation-triangle fa-5x text-danger";
    } else {
      document.getElementById("alarmLevelIcon2").className = "fa fa-exclamation-triangle fa-5x";
    }

    //3.druhy VRATA - GATE
    document.getElementById("devId8").innerHTML = device[8].devId;
    document.getElementById("devName8").innerHTML = device[8].devName;
    document.getElementById("gateLevel").innerHTML = device[8].devPosition;
    document.getElementById("devTime8").innerHTML = device[8].devTime;

    document.getElementById("gateLevelBar-left").style.width = device[8].devPosition+"%";
    document.getElementById("gateLevelBar-right").style.width = 100-device[8].devPosition+"%";


    //1.treti KAMERA - CAM
    document.getElementById("devId9").innerHTML = device[9].devId;
    document.getElementById("devName9").innerHTML = device[9].devName;
    document.getElementById("devTime9").innerHTML = device[9].devTime;
    d = new Date();
    document.getElementById("devCamUrl").src = device[9].devCamIP+"?"+d.getTime();

    //document.getElementById("devCamUrl").src = "https://apl.brno.cz/kamery/mn3/image.jpg"+"?"+d.getTime();
    //document.getElementById("devCamUrl2").src = device[9].devCamIP+"?"+device[9].devTemp;

    //na pozadí se obrázek se třepe při načítání
    //reseni: https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2016/may/why-background-images-are-slow-to-display-and-how-to-make-them-appear-faster/
    //document.getElementById("devCamUrl").style.backgroundImage = "url(" + device[9].devCamIP +'?'+d.getTime() + ")";

    //2.treti KAMERA - CAM
    document.getElementById("devId10").innerHTML = device[10].devId;
    document.getElementById("devName10").innerHTML = device[10].devName;
    document.getElementById("devTime10").innerHTML = device[10].devTime;
    document.getElementById("devCamUrl2").src = device[10].devCamIP+"?"+d.getTime();


  })
  .catch(function (error) {
    console.log(error);
  });

}
