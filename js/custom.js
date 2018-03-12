window.Arduino = {};

window.onload = function() {
  var mojeUrl = window.location.protocol + "//" + window.location.host + '/doomaster/sensors/';
        //mojeUrl: 'http://192.168.99.223:1818/doomaster/sensors/',

  Arduino.axios = axios.create({
    baseURL: mojeUrl,
    timeout: 100000
  });

  //vygeneruje HTML pro všechny BOXíky, které jsou požadovány v JSON
  Arduino.kontejnerShow();

  //vygeneruje OBSAH pro všechny HTML-BOXíky v JSON
  Arduino.showDeviceDetail();
}


// *************** Generuje HTML boxíky na stránku ********

//nove fce pro HTML boxiky - tzv. LivingStone = každá fce samostatný
LivingStone = {};

LivingStone.Null = function (sensorID) {
  //HTML boxík pro NIC
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-null" class="text-left">
            <h1>
              <span id="sensor-${sensorID}-null">NULL</span>&deg;
            </h1>
          </div>
          <div ><p id="sensor-${sensorID}-name">Severní pól</p></div>

      </div>
  </div>`;

  $("#boxScreen").append(templateHTML);

}

LivingStone.Temperature = function (sensorID) {
  //HTML boxík pro teplotu
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-teplota" class="text-left">
            <h1>
              <span id="sensor-${sensorID}-teplota">-99</span>&deg;
            </h1>
          </div>
          <div ><p id="sensor-${sensorID}-name">Severní pól</p></div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);

}

LivingStone.Pir = function (sensorID) {
  //HTML boxík pro Pir Motion Alarm
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-alarm" class="text-left">
            <i id="sensor-${sensorID}-alarm-stav" class="fas fa-exclamation-triangle text-danger"></i>
          </div>
          <div >
            <p id="sensor-${sensorID}-name">Severní pól</p>
            <i id="sensor-${sensorID}-time">25:61</i>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Camera = function (sensorID) {
  //HTML boxík pro Kameru
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_FUL}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent-camera">

          <div>
              <span id="sensor-${sensorID}-name">Severní pól</span>
              <span> | </span>
              <i id="sensor-${sensorID}-time">25:61</i>
          </div>
          <div id="sensor-${sensorID}-module-kamera" class="kameraBox kamera-value">
              <div class="cam-value ">
                <img id="sensor-${sensorID}-kamera-url" style="width:100%" src="images/image.jpg" alt="haha" class="img-fluid">
              </div>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);

}

LivingStone.Weather = function (sensorID) {
  //HTML boxík pro Počasí
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_MD}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent-pocasi">

          <div id="sensor-${sensorID}-module-pocasi" class="pocasi-value">
            <div class="cam-value ">
              <img id="sensor-${sensorID}-pocasi-url" style="width:90%" src="images/image.jpg" alt="pocasi" class="img-responsive">
            </div>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Water = function (sensorID) {
  //HTML boxík pro Vodu
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-voda" class="text-left">
              <h1>
                  <span id="sensor-${sensorID}-voda-numb">-99</span>
              </h1>
          </div>
          <div>
              <p id="sensor-${sensorID}-name">Severní pól</p>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Gate = function (sensorID) {
  //HTML boxík pro Bránu
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-brana" class="text-left">
              <h1>
                  <span id="sensor-${sensorID}-brana-numb">-99</span>
              </h1>
          </div>
          <div>
              <p id="sensor-${sensorID}-name">Severní pól</p>
          </div>

          <div class="btn-group btn-group-justified">
            <a id="sensor-${sensorID}-brana-but1" class="btn ">Otevřít</a>
            <a id="sensor-${sensorID}-brana-but2" class="btn ">Branka</a>
            <a id="sensor-${sensorID}-brana-but3" class="btn ">PULS</a>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);

  //ošetření kliknutí
  $(document).on("click", "#sensor-" + sensorID + "-brana-but1", function() {
    //až jednou nastane - že stranka bude vykreslena a "click" na toto ID (id=sensor-"+i+"-boxWrap)
    //tak se provede to, co je ve funkci:
    odeslatPUT($(this).attr("id"), DMbranaT1);
    alert("Odeslán PUT 1 na senzor " + sensorID);
  });
  $(document).on("click", "#sensor-" + sensorID + "-brana-but2", function() {
    odeslatPUT($(this).attr("id"), DMbranaT2);
    alert("Odeslán PUT 2 na senzor " + sensorID);
  });
  $(document).on("click", "#sensor-" + sensorID + "-brana-but3", function() {
    odeslatPUT($(this).attr("id"), DMbranaT3);
    alert("Odeslán PUT 3 na senzor " + sensorID);
  });

}

LivingStone.Light = function (sensorID) {
  //HTML boxík pro Světlo
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-svetlo">
              <div style="font-size:3em; color:"White">
                <i class="far fa-lightbulb"></i>
              </div>
          </div>
          <div>
              <p id="sensor-${sensorID}-name">Severní pól</p>
          </div>

      </div>
  </div>`;

  $("#boxScreen").append(templateHTML);


  $(document).on("click", "#sensor-" + sensorID + "-boxContent", function() {
    odeslatPUT($(this).attr("id"), "1");
    Arduino.showDeviceDetail();
  });

}

LivingStone.AlarmCam = function (sensorID) {
  //HTML boxík pro Alarm Kameru
    let templateHTML =
    `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_FUL}">
        <div id="sensor-${sensorID}-boxContent" class="boxContent-camera">

            <div>
                <span id="sensor-${sensorID}-name">Severní pól</span>
                <span> | </span>
                <i id="sensor-${sensorID}-time">25:61</i>
            </div>

            <div id="sensor-${sensorID}-module-alertcam" class="alertcam-value alertCam">
                <div class="text-center">
                  <button id="sensor-${sensorID}-alertcam-btn-left" type="button" class="btn "> << </button>
                  <button id="sensor-${sensorID}-alertcam-btn-delete" type="button" class="btn "> DEL </button>
                  <button id="sensor-${sensorID}-alertcam-btn-right" type="button" class="btn "> >> </button>
                </div>
                <div class="alertcam-value ">
                  <img id="sensor-${sensorID}-alertcam-url" style="width:100%;" src="activitylog/image-0.jpg" alt="POZOR" class="img-fluid" >
                </div>
                <div class="progress">
                  <div id="sensor-${sensorID}-alertcam-progress-l" class="progress-bar bg-danger" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>

        </div>
    </div>`;

    $("#boxScreen").append(templateHTML);
}





// *************** Generuje OBSAH pro boxíky na stránce ********
LivingStoneUpdate = {};

LivingStoneUpdate.Temperature = function (sensorID, device)  {

  //var tempVal = device[i].value;
  //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
  var tempVal = Number(device.value);

  $('#sensor-' + sensorID + '-name').html(device.webname);
  $('#sensor-' + sensorID + '-time').html(device.lrespiot);
  $('#sensor-' + sensorID + '-teplota').html(formatNumber(tempVal));

  var temperatureScheme = device.subtype; //barevné schéma pro teplotu
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
    }
}

LivingStoneUpdate.Water = function (sensorID, device) {
  var tempVal = Number(device.value);
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  $("#sensor-" + sensorID + "-voda-numb").html(tempVal + " %");
  // $("#sensor-" + sensorID + "-voda").height(tempVal + "%");

  //změna barvy po dosažení hodnoty v Subtype
  var temperatureScheme = Number(device.subtype); //barevné schéma pro teplotu

  switch (true) {
    case tempVal < temperatureScheme:
      $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
      $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
      break;
    default:
      $('#sensor-' + sensorID + '-boxContent').css("background-color", "LightGreen");
      $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
  }
}

LivingStoneUpdate.Light = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);

  var tempVal = Number(device.value);
  //console.log(tempVal);
  switch (true) {

    case tempVal == 1:
      $('#sensor-' + sensorID + '-boxContent').css("background-color", "GoldenRod");
      $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
      break;
    default:
      $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
      $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
  }
}

LivingStoneUpdate.Pir = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
}

LivingStoneUpdate.Gate = function (sensorID, device) {
  var tempVal = Number(device.value);

  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  if (tempVal == 0) {
    $("#sensor-" + sensorID + "-brana-numb").html("ZAVŘENO");
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
  } else {
    $("#sensor-" + sensorID + "-brana-numb").html(tempVal + " % OTEVŘENO");
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
  }
}

LivingStoneUpdate.Camera = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku
  d = new Date();
  document.getElementById("sensor-" + sensorID + "-kamera-url").src = device.subtype + "?" + d.getTime();

  // $('#sensor-'+i+'-boxWrap').css("height",auto);
}

LivingStoneUpdate.Weather = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  d = new Date();
  document.getElementById("sensor-" + sensorID + "-pocasi-url").src = device.subtype + "?" + d.getHours(); //aktualizuje každou hodinu

}

// *************** spusteni funkcí kazdou senkundu ********


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





// ***********************************


const DMteplota = "1";
const DMkamera = "2";
const DMalarm = "3";
const DMalarmCam = "4";
const DMvoda = "5";
const DMsvetlo = "6";
const DMbrana = "7";
const DMpocasi = "8";
const DMlight = "9";

const DMbranaT1 = "1";
const DMbranaT2 = "2";
const DMbranaT3 = "3";

//počet sloupců na stránce

const GRID_SM = "col-3"; //teplota
const GRID_MD = "col-8 col-sm-6"; //počasí
const GRID_FUL = "col-12 col-sm-6"; //kamera


//zatím nepoužíváno: - generování HTML pro alertCam
Arduino.alercamShow = function() {

  var sensorType = "";
  var sensorID = 0; //cislo senzoru UNID

  var device;
  //načtení z JSON bude zde
  // device.webtype = "alertcam";
  // device.unid = 0;

  sensorID = 0;
  sensorType = "templateAlertcam";

  $("#boxScreen").append(LivingStone.Temperature(sensorID));
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

var poziceObrazkuAlertCam = 0;
var pocetObratkuAlertCam = 33;
//pozice a celkovy obrazku na ALARMU

//zatím nepoužíváno: - generování obsahu pro HTML pro alertCam
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



//odešle PUT na server s jménem a hodnotou
function odeslatPUT(jmenoSenzoru, hodota) {
  //oříznutí jen na číslo senzoru: tedy z sensor-123456-xxx => 123456
  const url = `${jmenoSenzoru}`;
  console.log(url);

  poradiPomlcky = jmenoSenzoru.search("-");
  jmenoSenzoru = jmenoSenzoru.substring(poradiPomlcky + 1);
  poradiPomlcky = jmenoSenzoru.search("-");
  jmenoSenzoru = jmenoSenzoru.substring(0, poradiPomlcky);

  //odešle PUT s hodnotou "value"
  Arduino.axios.put('/' + jmenoSenzoru, {
      value: hodota
    })
    .then(function(response) {
      console.log('Odeslán PUT s URL /' + jmenoSenzoru + " s hodnotou " + hodota);
    })
    .catch(function(error) {
      console.log(error);
    });
}


//vygeneruje HTML pro všechny livingStones (BOXíky), které jsou požadovány v JSON
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

        sensorID = device[i].unid;
        if (sensorID != "0") { //pokud se nejedné o systémový ID

          switch (device[i].webtype) {

            case DMteplota: //teplota
              LivingStone.Temperature(sensorID);
              break;
            case DMvoda: //voda
              LivingStone.Water(sensorID);
              break;
            case DMsvetlo: //svetlo
              LivingStone.Light(sensorID);
              break;
            case DMalarm: //alarm - PIR
              LivingStone.Pir(sensorID);
              break;
            case DMbrana: //brána
              LivingStone.Gate(sensorID);
              break;
            case DMkamera: //kamera
              LivingStone.Camera(sensorID);
              break;
            case DMpocasi: //počasí
              LivingStone.Weather(sensorID);
              break;

            default:
              //pokud náhodou bude něco úplně nestandardního - bez LivingStonu
              LivingStone.Null(sensorID);
          }
        }
      }  // konec cyklu

    })
    //když nasane nějaký chyba - např. server není připojen.
    //řeší se v aktualizaci dat v JSON - teď jen vypíše na konzolu
    .catch(function(error) {
      console.log(error);
    });
}






//převede des. číslo na Sting na 2 pozice, a dá des. čárku (9.321 -> "9,3")
function formatNumber(x) {
  const POCET_DESETIN = 1;
  //převede vždy na 2 des. místa
  x = x.toFixed(POCET_DESETIN);
  //vráti hodnutu zalomenou podle jazykového nastavení. Natvrdo CZ
  //nejede - musím udělat upravu ručně
  //  const LANGUAGE = 'cs-CZ';
  //s = x.toLocaleString(LANGUAGE);
  s = x.replace(".", ",")
  return s;
}


//vygeneruje obsah pro HTML pro všechny livingStones (BOXíky), které jsou aktualizované v JSON
Arduino.showDeviceDetail = function() {

  var sensorID = "0"; //unikatni sensorID

  Arduino.axios.get('/')
    .then(function(response) {

      //nastavení barvy pozadí - když jsou data-tak bílé
      $("body").css("background-color", "White");

      var device = response.data;

      for (var i = 0; i < device.length; i++) {

        sensorID = device[i].unid;

        //jestliže je systémový údaj
        if (sensorID == "0") {
          //jestliže je chyba = ukaž badge (zvoneček)
          if (device[i].error == "0") {
            $('#homeButton').removeClass("badge badge-pill badge-danger");
            $('#homeButton').html("");
          } else {
            $('#homeButton').addClass("badge badge-pill badge-danger");
            $('#homeButton').html(device[i].error);
          }
          //zobrazí čas
          $('#server-time').html(device[i].value);
        }

        //podle typu se naplní hodnoty
        switch (device[i].webtype) {
          case "-1": //Pokud se jedná o systémove UNID = systemovy cas - nedělej nic
          break;

          case DMteplota: //teplota
            LivingStoneUpdate.Temperature (sensorID, device[i]);
            break;

          case DMvoda: //voda
            LivingStoneUpdate.Water(sensorID, device[i]);
            break;

          case DMsvetlo: //světlo
            LivingStoneUpdate.Light (sensorID, device[i]);
            break;

          case DMalarm: //alarm - PIR
            LivingStoneUpdate.Pir (sensorID, device[i]);
            break;

          case DMbrana: //brána
            LivingStoneUpdate.Gate (sensorID, device[i]);
            break;

          case DMkamera: //kamera (ne počasí)
            LivingStoneUpdate.Camera (sensorID, device[i]);
            break;

          case DMpocasi: //počasí
            LivingStoneUpdate.Weather (sensorID, device[i]);

            break;
        } //konec :switch:

      } //konec cyklu pro kreslení obsahu

    })
    .catch(function(error) {
      console.log(error);
      console.log("nejsou data");
      //nastavení barvy pozadí - když NEjsou data-tak ČERVENÉ
      $("body").css("background-color", "Red");
      $("container").addClass("alert alert-danger");

    });

}
