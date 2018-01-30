<!-- //verze 2018-1-28 - kontejnery s HTML + klikaci tlačítka-->


window.Arduino = {};

window.onload = function() {

   var mojeUrl = window.location.protocol + "//" + window.location.host+'/select/devices';
  Arduino.axios = axios.create({
    //baseURL: 'http://192.168.0.25:1818/select/devices/',

     //baseURL: 'http://localhost:1818/select/devices/',
    //baseURL: 'http://192.168.0.20:1818/select/devices/',
    //baseURL: 'http://10.66.1.71:1818/select/devices/',
    baseURL: mojeUrl,
    timeout: 100000
  });

  // Arduino.generateWeb();


  //vygeneruje HTML pro všechny BOXíky v JSON
  Arduino.kontejnerShow();

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






// ***********************************

var tmpBoxWrap = '';
var tmpBoxContent = '';
var tmpBoxSensor = '';


Arduino.kontejnerTemplate = function(sensorType, sensorID) {
//vloži HTML podle template TEPLOTA dle sensorID

switch (sensorType) {
  case "templateCam":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-12 col-sm-6">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      tmpBoxName = '<div class="vlastniBox2 sensor-name"><span id="sensor-ID-name">Severní pól</span><span>  ---  </span> <i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = tmpBoxName + $("#"+sensorType).html();
    break;
  case "templateWeather":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-4 col-sm-2">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      tmpBoxName = '<div class="vlastniBox2 sensor-name"><span id="sensor-ID-name">Severní pól</span><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = $("#"+sensorType).html();
     break;
   default:
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-4 col-sm-2">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      tmpBoxName = '<div class="vlastniBox2 sensor-name"><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = $("#"+sensorType).html() + tmpBoxName;
      //načte HTML template z index.html - casem se vloží přímo sem.
    } //end switch

    generatePage = tmpBoxContent.replace ("OBSAH", tmpBoxSensor);
    generatePage = tmpBoxWrap.replace ("OBSAH", generatePage);
    generatePage = generatePage.replace (/sensor-ID/g, "sensor-" + sensorID);
      // parametr  /g  znamena globalne - vsechny vyskyty, ne jen prvni

    return generatePage;

}



Arduino.kontejnerShow = function() {

    var sensorType = "";
    var sensorID = 0; //cislo senzoru UNID

    Arduino.axios.get("/")
    .then( function (response) {
        var device = response.data;

        for (var i = 0; i < device.length; i++) {
          // console.log(device[i].devType);
          sensorID = device[i].devId;
          switch (device[i].devType) {
            case "teplota": sensorType = "templateTemp";
                break;
            case "voda": sensorType = "templateWater";
                break;
            case "svetlo": sensorType = "templateLight";
                break;
            case "alarm": sensorType = "templateAlarm";
                break;
            case "brana": sensorType = "templateGate";
                break;
            case "kamera": sensorType = "templateCam";
                break;
            case "pocasi": sensorType = "templateWeather";
                break;
            default:
          }
          $("#boxScreen").append(Arduino.kontejnerTemplate(sensorType, sensorID));

          //rezervace budouciho kliku
          $(document).on("click", "#sensor-"+sensorID+"-boxWrap" , function() {
            //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
            //tak se provede to, co je ve funkci:
              // console.log($(this).attr("id")); //tisk cisla senzoru

              // $(this).animateCss('pulse');
              // $(this).addClass("fa fa-lightbulb-o");

              alert("BOxík bude vymazán. ID: " + $(this).attr("id"));
              $(this).addClass("hidden");


              // alert("klik");


//nejede na mobilu - je s obrazky. Ale jejich web jede.

              // $(this).css("background-color", "Blue");
              // $(this).addClass('animated bounceOutLeft');
              // $( this ).hide("display": "none");

              // alert($(this).attr("value"));
          });




        }
    })
    .catch(function (error) {
        console.log(error);
    });
}






Arduino.showDeviceDetail = function() {

  var sensorID = 0; //unikatni sensorID

  Arduino.axios.get('/')
  .then(function (response) {
    var device = response.data;

    //zobrazení casu, který je na serveru
    $('#server-time').html(device[0].devSerTime);
    //getElementById je prej rychlejši ???

    for (var i = 0; i < device.length; i++) {

        // //aby byl box stejně široký jako vysoky
        // sirka = $('#sensor-'+i+'-boxWrap').css("width");
        // $('#sensor-'+i+'-boxWrap').css("height", sirka);

        sensorID = device[i].devId;

        switch (device[i].devType) {

          case "teplota":
              var tempVal = device[i].devTemp;

              $('#sensor-'+sensorID+'-name').html(device[i].devName);
              $('#sensor-'+sensorID+'-time').html(device[i].devTime);
              $('#sensor-'+sensorID+'-teplota').html(tempVal);

               switch (true) {
                 case tempVal<3:
                      $('#sensor-'+sensorID+'-boxContent').css("background-color", "CornflowerBlue");
                      $('#sensor-'+sensorID+'-boxContent').css("color", "AliceBlue");
                 break;
                 case tempVal<16:
                   $('#sensor-'+sensorID+'-boxContent').css("background-color", "DeepSkyBlue");
                   $('#sensor-'+sensorID+'-boxContent').css("color", "Black");
                 break;
                 case tempVal<21:
                   $('#sensor-'+sensorID+'-boxContent').css("background-color", "BlueViolet");
                   $('#sensor-'+sensorID+'-boxContent').css("color", "Black");
                 break;
                 case tempVal<31:
                   $('#sensor-'+sensorID+'-boxContent').css("background-color", "Orange");
                   $('#sensor-'+sensorID+'-boxContent').css("color", "Black");
                 break;
                 case tempVal>30:
                   $('#sensor-'+sensorID+'-boxContent').css("background-color", "Red");
                   $('#sensor-'+sensorID+'-boxContent').css("color", "Black");
                 break;
                 default:
               }
            break; //teplota
          case "voda":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);
              $("#sensor-"+sensorID+"-voda-numb").html(device[i].devWater);
              $("#sensor-"+sensorID+"-voda").height(device[i].devWater+"%");

              //změna barvy po dosažení 60%
              if (device[i].devWater > 60){
                document.getElementById("sensor-"+sensorID+"-voda").className = "progress-bar progress-bar-striped active progress-bar-danger";
              } else {
                document.getElementById("sensor-"+sensorID+"-voda").className = "progress-bar progress-bar-striped active progress-bar-success"
              }
              break;
          case "svetlo":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);

              //jakože bliká
              if ((device[i].devLight % 2) == 0){
                document.getElementById("sensor-"+sensorID+"-svetlo-stav").className = "fa fa-lightbulb-o ";
              } else
              {
                document.getElementById("sensor-"+sensorID+"-svetlo-stav").className = "fa fa-lightbulb-o text-warning";
              }
            break;
        case "alarm":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);
              if (device[i].devAlarm){
                document.getElementById("sensor-"+sensorID+"-alarm-stav").className = "fa fa-exclamation-triangle  text-danger";
              } else {
                document.getElementById("sensor-"+sensorID+"-alarm-stav").className = "fa fa-exclamation-triangle ";
              }
            break;
        case "brana":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);
              document.getElementById("sensor-"+sensorID+"-brana-left").style.width = device[8].devPosition+"%";
              document.getElementById("sensor-"+sensorID+"-brana-right").style.width = 100-device[8].devPosition+"%";
            break;
        case "kamera":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);
              d = new Date();
              document.getElementById("sensor-"+sensorID+"-kamera-url").src = device[i].devCamIP+"?"+d.getTime();
              // $('#sensor-'+i+'-boxWrap').css("height",auto);
            break;
        case "pocasi":
              $("#sensor-"+sensorID+"-name").html(device[i].devName);
              $("#sensor-"+sensorID+"-time").html(device[i].devTime);
              d = new Date();
              document.getElementById("sensor-"+sensorID+"-pocasi-url").src = device[i].devWeatherIP+"?"+d.getHours();  //aktualizuje každou hodinu
        break;
        } //konec :switch:

    }  //konec cyklu pro kreslení obsahu

  })
  .catch(function (error) {
    console.log(error);
  });

}


// animace tlačítka - přidání rozšíření do jQuery

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd =
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  },
});
