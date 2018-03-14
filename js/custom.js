//Globální konstanty

const DMteplota = "1";
const DMkamera = "2";
const DMalarm = "3";
const DMCameraAlarm = "4";
const DMvoda = "5";
const DMsvetlo = "6";
const DMbrana = "7";
const DMpocasi = "8";
const DMlight = "9";

const SchemeAir = "1";
const SchemeBoiler = "2";
const SchemeWater = "3";

const DMbranaT1 = "1";
const DMbranaT2 = "2";
const DMbranaT3 = "3";



//počet sloupců na stránce

const GRID_SM = "col-3"; //teplota
const GRID_MD = "col-8 col-sm-6"; //počasí
const GRID_FUL = "col-12 col-sm-6"; //kamera


//uchování předešlého stavu obsahu všech LivingStones
//následně např. porovnávám, co má smysl měnit
var deviceObjectLast = {} ;



// ********** KOD


window.Arduino = {};

window.onload = function() {
  var mojeUrl = window.location.protocol + "//" + window.location.host + '/doomaster/sensors/';
        //mojeUrl: 'http://192.168.99.223:1818/doomaster/sensors/',

  Arduino.axios = axios.create({
    baseURL: mojeUrl,
    timeout: 100000
  });

  //vygeneruje HTML pro všechny BOXíky, které jsou požadovány v JSON
  Arduino.containerShow();

  //vygeneruje OBSAH pro všechny HTML-BOXíky v JSON
  Arduino.containerUpdate();
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
              <span id="sensor-${sensorID}-null">NULL-Stone</span>
            </h1>
          </div>
          <div ><p id="sensor-${sensorID}-name">NUL-pól</p></div>

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
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_MD}">
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
    alert("Odeslán PUT 1 na sensor " + sensorID);
  });
  $(document).on("click", "#sensor-" + sensorID + "-brana-but2", function() {
    odeslatPUT($(this).attr("id"), DMbranaT2);
    alert("Odeslán PUT 2 na sensor " + sensorID);
  });
  $(document).on("click", "#sensor-" + sensorID + "-brana-but3", function() {
    odeslatPUT($(this).attr("id"), DMbranaT3);
    alert("Odeslán PUT 3 na sensor " + sensorID);
  });

}

LivingStone.Light = function (sensorID) {
  //HTML boxík pro Světlo
  let templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-svetlo">
              <div style="font-size:2em; color:"White">
                <i class="far fa-lightbulb"></i>
              </div>
          </div>
          <div>
              <p id="sensor-${sensorID}-name">Severní pól</p>
          </div>

          <div>
              <p id="sensor-${sensorID}-error">error time</p>
          </div>

      </div>
  </div>`;

  $("#boxScreen").append(templateHTML);

  //co se stane při kliknutí
  $(document).on("click", "#sensor-" + sensorID + "-boxContent", function() {
    odeslatPUT($(this).attr("id"), "1");
    Arduino.containerUpdate();
  });

}

LivingStone.CameraAlarm = function (sensorID) {

  //HTML boxík pro Obrazek z kamery po alarmu
    let templateHTML =
    `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_FUL}">
        <div id="sensor-${sensorID}-boxContent" class="boxContent-camera">

            <div>
                <span id="sensor-${sensorID}-name">Severní pól</span>
                <span> | </span>
                <i id="sensor-${sensorID}-time">25:61</i>
            </div>
            <div id="sensor-${sensorID}-module-cameraalarm" class="kameraBox kamera-value">
                <div class="cameraalarm-value ">
                  <img id="sensor-${sensorID}-cameraalarm-url" style="width:100%" src="images/image-no-alarm.jpg" alt="alarm" class="img-fluid">
                </div>
            </div>

        </div>
    </div>`;

    $("#boxScreen").append(templateHTML);

    //co se stane při kliknutí
    $(document).on("click", "#sensor-" + sensorID + "-boxContent", function() {
      odeslatPUT($(this).attr("id"), "DELETE");
      Arduino.containerUpdate();
    });
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
    case SchemeAir: //air - vzduch
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
      } //switch boiler
      break;
    case SchemeBoiler: //boiler
      switch (true) {
      case tempVal < 4:
        $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
        $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
        break;
      case tempVal < 35:
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
    } //switch boiler
      break;
    case SchemeWater: //water - swimming pool
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
    } //switch swimming pool
      break;
  } //switch (temperatureScheme)
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

//jestlize nastala chyba - tak orámečkovat a napsat chybu
//vložit i do livingStones.všechny

  if (device.error != "") {
    let serverDate = deviceObjectLast["0"].lrespiot; //čas ze serveru
    let deviceDate = device.lrespiot; //cas z device, LivingStone
    textLostConTime = device.error + " | " +timeCountDown(deviceDate, serverDate, false);
    console.log(textLostConTime);

    $("#sensor-" + sensorID + "-error").html(textLostConTime);
    $('#sensor-' + sensorID + '-boxWrap').css("background-color", "Black ");


  } else {
    textLostConTime = "";
    $("#sensor-" + sensorID + "-error").html(textLostConTime);
    $('#sensor-' + sensorID + '-boxWrap').css("background-color", "White");
  }

  $("#sensor-" + sensorID + "-name").html(device.webname);

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
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "LightGreen");
  }

}

LivingStoneUpdate.Camera = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku
  d = new Date();
  newUrl = device.subtype + "?" + d.getTime();
  $("#sensor-" + sensorID + "-kamera-url").attr("src",newUrl);
}

LivingStoneUpdate.Weather = function (sensorID, device) {
  $("#sensor-" + sensorID + "-name").html(device.webname);
  $("#sensor-" + sensorID + "-time").html(device.lrespiot);
  d = new Date();
  newUrl = device.subtype + "?" + d.getHours();
  $("#sensor-" + sensorID + "-pocasi-url").attr("src",newUrl);
}

LivingStoneUpdate.CameraAlarm = function (sensorID, device) {
  let newUrl = "";

  // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku

  //je li nějaká hodnota, tedy např. počet obrázku
  if (device.value != "") {
    $("#sensor-" + sensorID + "-name").html(device.webname);
    $("#sensor-" + sensorID + "-time").html(device.lrespiot);

    newUrl = device.subtype;  //adresa ze serveru
    console.log(newUrl);

    //obervení boxku
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
  } else {
    $("#sensor-" + sensorID + "-name").html("No Camera Alarm");
    $("#sensor-" + sensorID + "-time").html("");
    newUrl = "images/image-no-alarm.jpg";

    //obarvení boxíku
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
  }


  $("#sensor-" + sensorID + "-cameraalarm-url").attr("src",newUrl);
}


// *************** Generuje OBSAH pro MENU ********
MenuUpdate = {};

MenuUpdate.Zvonecek = function (sensorID, deviceItem)  {
  //jestliže je chyba = ukaž badge (zvoneček na ikone DM)

  if (deviceItem.error == "") {
    $('#homeButton').removeClass("badge badge-pill badge-danger");
    $('#homeButton').html("");
  } else {
    $('#homeButton').addClass("badge badge-pill badge-danger");
    $('#homeButton').html(deviceItem.error);
  }
}


timeCountDown = function (lastDate, serverDate, longText) {
  //vrátí string, ve kterém je rozdíl času oproti jinému času (serverový / frontendový / ..)
  //lastDate je formatu Date
  //serverDate je formátu Date (počítá se rozdíl do "distance")
  //longText je true => Výstup: dlouhý formát => 12 dní 4 hodiny 22 minut 2 sekundy
  //longText je false => Výstup: krátký formát => 292:22:02
  //užití: jak_dlouho_je_to = timeCountDown("2018-03-1 18:06:05", deviceObjectLast["0"].lrespiot, false);


  let t = lastDate.split(/[- :]/);
  // Apply each element to the Date function
  let d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  let historyTime = new Date(d);

  let t2 = serverDate.split(/[- :]/);
  // Apply each element to the Date function
  let d2 = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
  let currentTime = new Date(d2);

  // let currentTime = new Date(serverDate);
  let distance =  currentTime - historyTime;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (longText == true) {
    //dlouhý tvar vystupního textu
    switch (true) {
      case days == 0:
        days = "";
        break;
      case days == 1:
        days += " den";
        break;
      case (days>1 && days <5):
        days += " dny";
        break;
      case days>4:
        days += " dní";
        break;
      default:
    }
    switch (true) {
      case hours == 0:
        hours = "";
        break;
      case hours == 1:
        hours += " hodinu";
        break;
      case (hours > 1 && hours < 5):
        hours += " hodniny";
        break;
      case hours > 4:
        hours += " hodnin";
        break;
      default:
    }
  return (days + " " + hours + " " + minutes + " " + seconds);
  } //pokud je chtěná dlouhá odpověd Jinak
  else {

    let hours = Math.floor((distance / ( 1000 * 60 * 60 )));
    //vysledny tvar ma být v hhh:mm:ss

    if (hours == 0) {
      hours = "";
    } else {
      hours += ":"
    }

    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    }
    return (hours + minutes + ":" + seconds);
  }

}

MenuUpdate.ServerTime = function (sensorID, deviceItem)  {
  //zobrazi serverovy cas


    //načte čas ze serveru a standardizuje

    // var actiondate = new Date(deviceItem.value);
      //nefungovalo na iphone proto tatto metoda
      //The reason of the problem is iPhone Safari doesn't support the Y-m-d H:i:s (ISO 8601) date format. I have encountered this problem in 2017/7/19, I do not understand why Safari did not fix the problem after two years.
      //https://stackoverflow.com/questions/26657353/date-on-ios-device-returns-nan/26671796

    let t = deviceItem.value.split(/[- :]/);
    // Apply each element to the Date function
    let d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    let actiondate = new Date(d);

    let minuta = actiondate.getMinutes();
    if (minuta < 10) {
      minuta = "0" + minuta.toString();
    }

    let sekunda = actiondate.getSeconds();
    if (sekunda < 10) {
      sekunda = "0" + sekunda.toString();
    }

    let cas = actiondate.getHours() + ":" + minuta + ":" + sekunda;

    let denVTydnu = "";
    switch (actiondate.getDay()) {
      case 1:
        denVTydnu = "Pondělí"
        break;
      case 2:
        denVTydnu = "Úterý"
        break;
      case 3:
        denVTydnu = "Středa"
        break;
      case 4:
        denVTydnu = "Čtvrtek"
        break;
      case 5:
        denVTydnu = "Pátek"
        break;
      case 6:
        denVTydnu = "Sobota"
        break;
      case 7:
        denVTydnu = "Neděle"
        break;
      default:
      denVTydnu = "Fakt netuším"
    }

  let datum = denVTydnu + " " + actiondate.getDate() + "." + actiondate.getMonth() + ".";


  $("#server-date").html(datum);
  $("#server-date").css({"font-size": "0.7rem"});

  $("#server-time").html(cas);
  $("#server-time").css({"font-size": "1.5rem"});

  //js_date_methods pro rozdělání dní
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

}




// *************** spusteni funkcí kazdou senkundu ********


var myVar = setInterval(function() {
  myTimer()
}, 1000);



function myTimer() {
  // Arduino.hodiny();
  // Arduino.showAlarmCam(); //test AlertCam
  Arduino.containerUpdate(); //box na obrazovce
}



//HODINY zobrazení reálných hodin na zařízení
// Arduino.hodiny = function() {
//   var d = new Date();
//   var t = d.toLocaleTimeString();
//   document.getElementById("hodiny").innerHTML = t; //hodiny
// }





// ***********************************


//zatím nepoužíváno: - generování HTML pro alertCam
Arduino.alercamShow = function() {

  var sensorType = "";
  var sensorID = 0; //cislo senzoru UNID

  var device;  //pole dat načtených z API ve formatu JSON


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





// ****************** hlavní fce *********************




//vygeneruje HTML pro všechny livingStones (BOXíky), které jsou požadovány v JSON
Arduino.containerShow = function() {

  var sensorType = "";
  var sensorID = "0"; //cislo senzoru UNID

  Arduino.axios.get("/")
    .then(function(response) {
      var device = response.data;

      // setřídění obsah pole (LivingStone) podle weborder
      device = device.sort(function(a, b) {
        // return a.weborder - b.weborder;
        if (a.weborder < b.weborder)
          return -1;
        if (a.weborder > b.weborder)
          return 1;
        return 0;
      });

      //načtení POPRVÉ stavu obsahu všech LivingStones
      //následně např. porovnávám, co má smysl měnit
      //jako objekt - historický stav LivingStonu
      // klíčem unid
      // obsahující všechny informace o LivingStone
      deviceObjectLast = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});


      device.forEach(function(deviceItem) {

        sensorID = deviceItem.unid;
        sensorWebType = deviceItem.webtype;

        if (sensorID != "0") { //pokud se nejedné o systémový ID

          switch (sensorWebType) {
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
            case DMCameraAlarm: //Obrazek z kamery po alarmu
              LivingStone.CameraAlarm(sensorID);
              break;
            default:
              //pokud náhodou bude něco úplně nestandardního - bez LivingStonu
              LivingStone.Null(sensorID);
          } //switch
        }   //if sensorID
      }); //konec forEach cyklu
    })
    //když nasane nějaký chyba - např. server není připojen.
    //řeší se v aktualizaci dat v JSON - teď jen vypíše na konzolu
    .catch(function(error) {
      console.log(error);
    });
}





//vygeneruje obsah pro HTML pro všechny livingStones (BOXíky), které jsou aktualizované v JSON
Arduino.containerUpdate = function() {

  var sensorID = "0"; //unikatni sensorID

  Arduino.axios.get('/')
    .then(function(response) {

      //nastavení barvy pozadí - když jsou data-tak bílé
      $("body").css("background-color", "White");

      var device = response.data;

      //pravidelné načítání stavu obsahu všech LivingStones
      //jako objekt s klíčem unid a obsahem LivingStonu
      //následně např. porovnávám, co má smysl měnit
      var deviceObject = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});


      //projede všechno, něco jako cyklus : for (var i = 0; i < device.length; i++)
      $.each(deviceObject, function(index, deviceItem) {

        sensorID = index;
        sensorWebType = deviceItem.webtype;

        //hodnoty se změnily - je potřeba přepsat tabulku. Jinak ne.
        // if (deviceObjectLast[sensorID].value != deviceItem.value)
           {

              if (sensorID == "0") {
                //Uděla update menu podle systemovych parametru
                MenuUpdate.Zvonecek (sensorID, deviceItem);
                MenuUpdate.ServerTime (sensorID, deviceItem);
              }

              //podle typu se naplní hodnoty
              switch (sensorWebType) {
                case "-1": //Pokud se jedná o systémove UNID = systemovy cas - nedělej nic
                break;

                case DMteplota: //teplota
                  LivingStoneUpdate.Temperature (sensorID, deviceItem);
                  break;

                case DMvoda: //voda
                  LivingStoneUpdate.Water(sensorID, deviceItem);
                  break;

                case DMsvetlo: //světlo
                  LivingStoneUpdate.Light (sensorID, deviceItem);
                  break;

                case DMalarm: //alarm - PIR
                  LivingStoneUpdate.Pir (sensorID, deviceItem);
                  break;

                case DMbrana: //brána
                  LivingStoneUpdate.Gate (sensorID, deviceItem);
                  break;

                case DMkamera: //kamera (ne počasí)
                  LivingStoneUpdate.Camera (sensorID, deviceItem);
                  break;

                case DMpocasi: //počasí
                  LivingStoneUpdate.Weather (sensorID, deviceItem);
                  break;
                case DMCameraAlarm: //kamera s alarmovým obrazkem
                  LivingStoneUpdate.CameraAlarm (sensorID, deviceItem);
                  break;

              } //konec :switch:

          } //konec value=value

      }); //konec forEach cyklus


      //zapamatování si posledního stavu
      //následně např. porovnávám, co má smysl měnit
      deviceObjectLast = deviceObject;

    })
    .catch(function(error) {
      console.log(error);
      console.log("nejsou data");
      //nastavení barvy pozadí - když NEjsou data-tak ČERVENÉ
      $("body").css("background-color", "Red");
      // $("container").addClass("alert alert-danger");

    });

}
