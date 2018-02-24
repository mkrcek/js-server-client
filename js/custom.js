
window.Arduino = {};

window.onload = function() {

  var mojeUrl = window.location.protocol + "//" + window.location.host + '/doomaster/sensors/';
  //baseURL: 'http://192.168.0.25:1818//doomaster/sensors/',

  //baseURL: 'http://localhost:1818//doomaster/sensors/',
   //mojeUrl: 'http://192.168.0.22:1818//doomaster/sensors/',

  //pro interní testování pro refresh JS
  //mojeUrl = 'http://localhost:1818/doomaster/sensors/',

console.log(mojeUrl);
    Arduino.axios = axios.create({
      baseURL: mojeUrl,
      timeout: 100000
    });

  // Arduino.generateWeb();


  //test generovani AlertCam
  //ted jeste ne
  // Arduino.alercamShow();

  //vygeneruje HTML pro všechny BOXíky v JSON
  Arduino.kontejnerShow();

  //test generovani pro AlertCam
  //ted ješte ne:
  // Arduino.showAlarmCam();

  Arduino.showDeviceDetail();
  //vygeneruje obsah pro všechny HTML-BOXíky v JSON

  Arduino.changeDeviceDetail(0);
  //umožní zmenit jmeno zařízení číslo -0


}




//spusteni funkcíkazdou senkundu

var myVar = setInterval(function() {
  myTimer()
}, 1000);

function myTimer() {
  // Arduino.hodiny();
  // Arduino.showAlarmCam(); //test AlertCam
  Arduino.showDeviceDetail(); //box na obrazovce
}



//HODINY zobrazení reálných hodin na zařízení
// Arduino.hodiny = function() {
//   var d = new Date();
//   var t = d.toLocaleTimeString();
//   document.getElementById("hodiny").innerHTML = t; //hodiny
// }




//Aktualizace PUT: zmeni polozku (webname) a odesle pomoci PUT na API
Arduino.changeDeviceDetail = function(itemID) {

  //puvodni pracovni verze - jen pro prvni MODULek

  $('#device-detail-' + itemID + ' .save').click(() => {
    console.log("click " + itemID);
    $('#device-detail-' + itemID + ' form').submit();
  });

  $('#device-detail-' + itemID + ' form').submit((event) => {
    //  Arduino.axios.put ('/hodnota/'+itemID, {
    Arduino.axios.put('/' + itemID, {
        webname: $('#device-detail-' + itemID + ' input[name="webname"]').val()
      })
      .then(function(response) {
        console.log('UPDATE PUT' + itemID);
        Arduino.showDeviceDetail();
        console.log('Screen is refreshed');

      })
      .catch(function(error) {
        console.log(error);
      });
    event.preventDefault();
  });

} //end changeDeviceDetail






// ***********************************

var tmpBoxWrap = '';
var tmpBoxContent = '';
var tmpBoxSensor = '';

const DMteplota  = "1";
const DMkamera  = "2";
const DMalarm = "3";
const DMalarmCam = "4";
const DMvoda  = "5";
const DMsvetlo  = "6";
const DMbrana = "7";
const DMpocasi = "8";

const DMbranaT1 = "1";
const DMbranaT2 = "2";
const DMbranaT3 = "3";

Arduino.kontejnerTemplate = function(sensorType, sensorID) {
  //vloži HTML podle templatů

  //pole, ve kterém jsou HTML vzory jednotlivých čidel.

  var tmpHtmlBox = [
    // 0 = NILL
    '<div id="sensor-ID-module-null" class="text-left">' +
    '<h1>' +
    '<span id="sensor-ID-null">NULL</span>' +
    '</h1>' +
    '</div>',
    // 1 = Teplota
    '<div id="sensor-ID-module-teplota" class="text-left">' +
    '<h1>' +
    '<span id="sensor-ID-teplota">-99</span>&deg;' +
    '</h1>' +
    '</div>',
    // 2 = HTTP outDOOM Obrázek  (jen kamera, pocasi ma jiné)
    '<div id="sensor-ID-module-kamera" class=" kameraBox kamera-value">' +
    '<div class="cam-value ">' +
    '<img id="sensor-ID-kamera-url" style="width:100%" src="images/image.jpg" alt="haha" class="img-fluid">' +
    '</div>' +
    '</div>',
    //3 = PIR
    '<div id="sensor-ID-module-alarm">' +
    '<i id="sensor-ID-alarm-stav" class="fas fa-exclamation-triangle text-danger"></i>' +
    '</div>',
    //4 = PIR obrázek
    '<div id="sensor-ID-module-alertcam" class="alertcam-value alertCam">' +
    '<div class="alertcam-value ">' +
    '<img id="sensor-ID-alertcam-url" style="width:100%" src="activitylog/image-0.jpg" alt="POZOR" class="img-fluid" >' +
    '</div>' +
    '<div class="progress">' +
    '<div id="sensor-ID-alertcam-progress-l" class="progress-bar bg-danger" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>' +
    '</div>' +
    '<div class="text-center">' +
    '<button id="sensor-ID-alertcam-btn-left" type="button" class="btn "> <<< - Před</button>' +
    '<button id="sensor-ID-alertcam-btn-right" type="button" class="btn ">Další - >>></button>' +
    '</div>' +
    '</div>',


    // 5 = VODA
    //dřívější model s progress barem:
    // '<div id="sensor-ID-module-voda" class="  progress progress-bar-vertical text-center">' +
    // '<div id="sensor-ID-voda" class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="height: 44%;">' +
    // '  <span id="sensor-ID-voda-numb">44%</span>' +
    // '</div>' +
    // '</div>'
    `<div id="sensor-ID-module-voda" class="text-left">
        <h1>
          <span id="sensor-ID-voda-numb">-99</span>
        </h1>
    </div>
    `
    ,

    // 6 = svetlo
    '<div id="sensor-ID-module-svetlo">' +
    '<i id="sensor-ID-svetlo-stav" class="far fa-lightbulb"></i>' +
    '</div>',

    // 7 = brána
    // '<div id="sensor-ID-module-brana" class="progress">' +
    // '<div id="sensor-ID-brana-left" class="progress-bar bg-warning" role="progressbar" style="width:30%">' +
    // '</div>' +
    // '<div id="sensor-ID-brana-right" class="progress-bar bg-success" role="progressbar" style="width:70%">' +
    // '</div>' +
    // '</div>'

    `<div id="sensor-ID-module-brana" class="text-left">
        <h1>
          <span id="sensor-ID-brana-numb"> -99 </span>
        </h1>
    </div>
    `
    ,

    //8 = počasí : mělo by se sjednotit s KAMERA
    '<div id="sensor-ID-module-pocasi" class="pocasi-value">' +
    '<div class="cam-value ">' +
    '<img id="sensor-ID-pocasi-url" style="width:90%" src="images/image.jpg" alt="haha" class="img-responsive">' +
    '</div>' +
    '</div>'


  ];

  switch (sensorType) {

    // test securitycap
    case "templateServerTime":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-12 col-sm-6">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent-camera">OBSAH\n   </div>';
      tmpBoxName = '<div ><span id="sensor-ID-name">Severní pól</span><span> | </span> <i id="sensor-ID-time">25:61</i></div>';
      tmlIkony = '<div class="btn-group btn-group-justified"><a href="#" class="btn btn-primary"><i class="fas fa-star"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-video"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-thermometer-empty"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-lightbulb"></i></div></a>'
      tmpBoxSensor = tmpBoxName + tmlIkony + tmpHtmlBox[4];
      break;

      // test securitycap
    case "templateAlertcam":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-12 col-sm-6">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent-camera">OBSAH\n   </div>';
      tmpBoxName = '<div ><span id="sensor-ID-name">Severní pól</span><span> | </span> <i id="sensor-ID-time">25:61</i></div>';
      tmlIkony = '<div class="btn-group btn-group-justified"><a href="#" class="btn btn-primary"><i class="fas fa-star"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-video"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-thermometer-empty"></i></a><a href="#" class="btn btn-primary"><i class="fas fa-lightbulb"></i></div></a>'
      tmpBoxSensor = tmpBoxName + tmlIkony + tmpHtmlBox[4];
      break;

    case "templateCam":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-12 col-sm-6">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent-camera">OBSAH\n   </div>';
      tmpBoxName = '<div ><span id="sensor-ID-name">Severní pól</span><span> | </span> <i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = tmpBoxName + tmpHtmlBox[2];
      break;
    case "templateWeather":
      //jine rozlozeni NAZVU a sirka GRIDU
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-8 col-sm-6">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent-pocasi">OBSAH\n   </div>';
      tmpBoxName = '<div ><span id="sensor-ID-name">Severní pól</span></div>';
      tmpBoxSensor = tmpHtmlBox[8];
      break;

    case "templateTemp":
      // teplota
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-4 ">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      // tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p></div>';

      tmpBoxSensor = tmpHtmlBox[1] + tmpBoxName;
      break;

    case "templateAlarm":
      //PIR alarm
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-4 ">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = tmpHtmlBox[3] + tmpBoxName;
      break;

    case "templateWater":
      //VODA
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-4 ">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      // tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxSensor = tmpHtmlBox[5] + tmpBoxName;
      break;

    case "templateLight":
      //SVETLO
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-4 ">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      // tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';

      tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p></div>';
      tmpBoxSensor = tmpHtmlBox[6] + tmpBoxName;
      break;


    case "templateGate":
      //Brána
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-8 col-sm-6 ">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      // tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';
      tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p></div>';
      tmpButtons =
      `
      <div class="btn-group btn-group-justified">
        <a id="sensor-ID-brana-but1" class="btn ">Otevřít</a>
        <a id="sensor-ID-brana-but2" class="btn ">Branka</a>
        <a id="sensor-ID-brana-but3" class="btn ">PULS</a>
      </div>
      <div></div>
      `
      tmpBoxSensor = tmpHtmlBox[7] + tmpBoxName + tmpButtons;
      break;


      //a pro všechny ostatní typy: jako je třeba ???? NIC
    default:
      tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-4 col-sm-2">\n   OBSAH\n</div>';
      tmpBoxContent = '<div id="sensor-ID-boxContent" class="boxContent">OBSAH\n   </div>';
      // tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p><i id="sensor-ID-time">25:61</i></div>';

      tmpBoxName = '<div ><p id="sensor-ID-name">Severní pól</p></div>';
      tmpBoxSensor = $("#" + sensorType).html() + tmpBoxName;
      //načte HTML template z index.html - casem se vloží přímo sem.
  } //end switch

  // generatePage: proměná s HTML kodem dle Template podle typu senzoru

  generatePage = tmpBoxContent.replace("OBSAH", tmpBoxSensor);
  generatePage = tmpBoxWrap.replace("OBSAH", generatePage);
  generatePage = generatePage.replace(/sensor-ID/g, "sensor-" + sensorID);
  // parametr  /g  znamena globalne - vsechny vyskyty, ne jen prvni

  return generatePage;

}


Arduino.alercamShow = function() {

  var sensorType = "";
  var sensorID = 0; //cislo senzoru UNID

  var device;
  //načtení z JSON bude zde
  // device.webtype = "alertcam";
  // device.unid = 0;

  sensorID = 0;
  sensorType = "templateAlertcam";


  $("#boxScreen").append(Arduino.kontejnerTemplate(sensorType, sensorID));
  //rezervace budouciho kliku
  $(document).on("click", "#sensor-" + sensorID + "-alertcam-btn-left", function() {
    //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
    //tak se provede to, co je ve funkci:
    if (poziceObrazkuAlertCam > 0) {
      poziceObrazkuAlertCam--;
    } else {
      poziceObrazkuAlertCam = (pocetObratkuAlertCam - 1);
    }
    Arduino.showAlarmCam(); //aktualizace obrazovky
  });
  $(document).on("click", "#sensor-" + sensorID + "-alertcam-btn-right", function() {

    if (poziceObrazkuAlertCam < pocetObratkuAlertCam - 1) {
      poziceObrazkuAlertCam++;
    } else {
      poziceObrazkuAlertCam = 0;
    }
    Arduino.showAlarmCam(); //aktualizace obrazovky
  });



}



Arduino.kontejnerShow = function() {

  var sensorType = "";
  var sensorID = 0; //cislo senzoru UNID

  Arduino.axios.get("/")
    .then(function(response) {
      var device = response.data;

      // setřídění podle weborder
      device = device.sort(function(a, b) {
        // return a.weborder - b.weborder;
        if (a.weborder < b.weborder)
          return -1;
        if (a.weborder > b.weborder)
          return 1;
        return 0;
      });


      for (var i = 0; i < device.length; i++) {
        // console.log(device[i].webtype);
        sensorID = device[i].unid;

        if (sensorID != "0") { //pokud se nejedné o systémový ID

          switch (device[i].webtype) {
            case DMteplota: //teplota
              sensorType = "templateTemp";
              break;
            case DMvoda: //voda
              sensorType = "templateWater";
              break;
            case DMsvetlo: //svetlo
              sensorType = "templateLight";
              break;
            case DMalarm: //alarm - PIR
              sensorType = "templateAlarm";
              break;
            case DMbrana: //brána
              sensorType = "templateGate";
              break;
            case DMkamera: //kamera
              sensorType = "templateCam";
              break;
            case DMpocasi: //počasí
              sensorType = "templateWeather";
              break;
            default:
          }
          $("#boxScreen").append(Arduino.kontejnerTemplate(sensorType, sensorID));

          //rezervace budouciho kliku
          // $(document).on("click", "#sensor-" + sensorID + "-boxWrap", function() {
            //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
            //tak se provede to, co je ve funkci:
            // console.log($(this).attr("id")); //tisk cisla senzoru

            // $(this).animateCss('pulse');
            // $(this).addClass("fa fa-lightbulb-o");

          //   alert("BOxík bude vymazán. ID: " + $(this).attr("id"));
          //   $(this).addClass("hidden");
          //
          // });







          $(document).on("click", "#sensor-" + sensorID + "-brana-but1", function() {
            //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
            //tak se provede to, co je ve funkci:

              Arduino.axios.put('/' + sensorID, {
                  value: DMbranaT1
                })
                .then(function(response) {
                  console.log('Odeslán PUT s URL /' + sensorID + "s hodnotou " + DMbranaT1);

                })
                .catch(function(error) {
                  console.log(error);
                });

            alert("Tlačítko 1 ID: " + $(this).attr("id"));
          });
          $(document).on("click", "#sensor-" + sensorID + "-brana-but2", function() {
            //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
            //tak se provede to, co je ve funkci:
            Arduino.axios.put('/' + sensorID, {
                value: DMbranaT2
              })
              .then(function(response) {
                console.log('Odeslán PUT s URL /' + sensorID + "s hodnotou " + DMbranaT2);

              })
              .catch(function(error) {
                console.log(error);
              });
            alert("Tlačítko 2 ID: " + $(this).attr("id"));
          });
          $(document).on("click", "#sensor-" + sensorID + "-brana-but3", function() {
            //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
            //tak se provede to, co je ve funkci:
            Arduino.axios.put('/' + sensorID, {
                value: DMbranaT3
              })
              .then(function(response) {
                console.log('Odeslán PUT s URL /' + sensorID + "s hodnotou " + DMbranaT3);

              })
              .catch(function(error) {
                console.log(error);
              });
            alert("Tlačítko 3 ID: " + $(this).attr("id"));
          });



        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}




var poziceObrazkuAlertCam = 0;
var pocetObratkuAlertCam = 33;
//pozice a celkovy obrazku na ALARMU

Arduino.showAlarmCam = function() {

  var sensorID = 0; //unikatni sensorID
  var device;
  var sensorType;
  //bude načtení z JSON

  sensorID = 0;
  sensorType = "alertcam";
  adresaObrazku = "activitylog/image" //celá adresa pak bude /activitylog/image-1.jpg


  switch (sensorType) {
    case "alertcam":
      $("#sensor-" + sensorID + "-name").html(" < AKCE v HALE");
      $("#sensor-" + sensorID + "-time").html("31.12.2017 23:59");
      // $("#sensor-"+sensorID+"-time").addClass ("top-left");  //zobrazení času v rohu obrázku
      $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
      $('#sensor-' + sensorID + '-boxContent').css("height", "360");
      //progress bar
      document.getElementById("sensor-" + sensorID + "-alertcam-progress-l").style.width = ((poziceObrazkuAlertCam * 100) / pocetObratkuAlertCam) + "%";
      //novy obrazek
      document.getElementById("sensor-" + sensorID + "-alertcam-url").src = adresaObrazku + "-" + poziceObrazkuAlertCam + ".jpg";

      break;

  } //konec :switch:



}


function formatNumber(x) {

  const POCET_DESETIN = 1;



  //převede vždy na 2 des. místa
  x = x.toFixed(POCET_DESETIN);

  //vráti hodnutu zalomenou podle jazykového nastavení. Natvrdo CZ
  //nejede - musím udělat upravu ručně
  //  const LANGUAGE = 'cs-CZ';
  //s = x.toLocaleString(LANGUAGE);

  s = x.replace (".", ",")

  return s;

}


Arduino.showDeviceDetail = function() {

  var sensorID = 0; //unikatni sensorID

  Arduino.axios.get('/')
    .then(function(response) {
      var device = response.data;

      //zobrazení casu, který je na serveru
      // $('#server-time').html(device[0].devSerTime);
      //getElementById je prej rychlejši ???

      for (var i = 0; i < device.length; i++) {


        sensorID = device[i].unid;
        if (sensorID == "0") {
          $('#server-time').html(device[i].value);
        }

        //podle typu se naplní hodnoty
        switch (device[i].webtype) {
          case "-1": //Pokud se jedná o systémove UNID = systemovy cas - nedělej nic
            break;

          case DMteplota: //teplota
            //var tempVal = device[i].value;

            //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
            var tempVal = Number(device[i].value);

            $('#sensor-' + sensorID + '-name').html(device[i].webname);
            $('#sensor-' + sensorID + '-time').html(device[i].lrespiot);
            $('#sensor-' + sensorID + '-teplota').html( formatNumber(tempVal));

            var temperatureScheme = device[i].subtype; //barevné schéma pro teplotu
            switch (temperatureScheme) {
              case "1": //air - vzduch
                switch (true) {
                  case tempVal < 4:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
                    break;
                  case tempVal < 16:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 21:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 31:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal > 30:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  default:
                }
                break;
              case "2": //boiler
                switch (true) {
                  case tempVal < 4:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
                    break;
                  case tempVal < 40:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 70:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 81:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal > 80:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  default:
                }
                break;
              case "3": //swimming pool
                switch (true) {
                  case tempVal < 4:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
                    break;
                  case tempVal < 20:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 25:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal < 30:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  case tempVal > 29:
                    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
                    $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                    break;
                  default:
                }
                break;
              default:
            }
            break; //teplota KONEC

          case DMvoda: //voda

            var tempVal = Number(device[i].value);
            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);
            $("#sensor-" + sensorID + "-voda-numb").html(tempVal + " %");
            // $("#sensor-" + sensorID + "-voda").height(tempVal + "%");

            //změna barvy po dosažení hodnoty v Subtype
            var temperatureScheme = Number(device[i].subtype); //barevné schéma pro teplotu

            switch (true) {

              case tempVal < temperatureScheme:
                  $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
                  $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
                break;
              default:
                  $('#sensor-' + sensorID + '-boxContent').css("background-color", "LightGreen");
                  $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
            }


            // if (tempVal > 60) {
            //   document.getElementById("sensor-" + sensorID + "-voda").className = "progress-bar progress-bar-striped active bg-danger";
            // } else {
            //   document.getElementById("sensor-" + sensorID + "-voda").className = "progress-bar progress-bar-striped active bg-success";
            // }

            break;

          case DMsvetlo: //světlo
            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);

            var tempVal = Number(device[i].value);

            //jakože bliká
            if (tempVal % 2 == 0) {
              document.getElementById("sensor-" + sensorID + "-svetlo-stav").className = "far fa-lightbulb ";
            } else {
              document.getElementById("sensor-" + sensorID + "-svetlo-stav").className = "ffar fa-lightbulb text-warning";
            }
            break;
          case DMalarm: //alarm - PIR
            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);
            break;
          case DMbrana: //brána
            var tempVal = Number(device[i].value);

            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);
            $("#sensor-" + sensorID + "-brana-numb").html(tempVal + " %");

            // document.getElementById("sensor-" + sensorID + "-brana-left").style.width = tempVal + "%";
            // document.getElementById("sensor-" + sensorID + "-brana-right").style.width = 100 - tempVal + "%";
            break;
          case DMkamera: //kamera (ne počasí)
            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);
            // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku
            d = new Date();
            document.getElementById("sensor-" + sensorID + "-kamera-url").src = device[i].subtype + "?" + d.getTime();

            // $('#sensor-'+i+'-boxWrap').css("height",auto);
            break;
          case DMpocasi: //počasí
            $("#sensor-" + sensorID + "-name").html(device[i].webname);
            $("#sensor-" + sensorID + "-time").html(device[i].lrespiot);
            d = new Date();
            document.getElementById("sensor-" + sensorID + "-pocasi-url").src = device[i].subtype + "?" + d.getHours(); //aktualizuje každou hodinu
            break;
        } //konec :switch:

      } //konec cyklu pro kreslení obsahu

    })
    .catch(function(error) {
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
