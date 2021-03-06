

//Globální konstanty

const DMteplota = "1";
const DMkamera = "2";
const DMalarm = "3";
const DMCameraAlarm = "4";
const DMvoda = "5";
const DMsvetlo = "6";
const DMbrana = "7";
const DMpocasi = "8";
const DMgarage = "9";

const SchemeAir = "1";
const SchemeBoiler = "2";
const SchemeWater = "3";

const DMbranaT1 = "1";
const DMbranaT2 = "2";
const DMbranaT3 = "3";


const DMgarageT1 = "0";   //otevřít
const DMgarageT2 = "";
const DMgarageT3 = "1";   //zavřít

// ** Menu

const DMmenuID1 = "10101";
const DMmenuID2 = "10102";
const DMmenuID3 = "10103";
const DMmenuID4 = "10104";


//počet sloupců na stránce
//stoneSize: v Class Stone.render

//<576px col-
//≥576px col-sm-
//≥768px col.md-
//≥992px col.lg-
//≥1200px col.xl-

// do 4.4.2018
// const GRID_SM = "col-3 col-sm-2 col-md-3 col.xl-2"; //teplota
// const GRID_MD = "col-8 col-sm-6"; //např.počasí - nepoužito
// const GRID_FUL = "col-12 col-sm-6"; //kamera - napoužito
//
// const GRID_CAM = "col-12 col-sm-12 col-lg-6"; //kamera
// const GRID_CAMAL = "col-12 col-sm-6 col-md-6"; //kamera alarm
// const GRID_WEAD = "col-12 col-sm-6 col-md-4"; //weather
// const GRID_GATE = "col-12 col-sm-6 col-md-4"; //brána

const GRID_SM = "col-3 col-sm-3 col-md-3 col.xl-3"; //teplota
const GRID_MD = "col-8 col-sm-6"; //např.počasí - nepoužito
const GRID_FUL = "col-12 col-sm-12"; //kamera - napoužito

const GRID_CAM = "col-12 col-sm-12 col-lg-12"; //kamera
const GRID_CAMAL = "col-12 col-sm-12 col-md-12"; //kamera alarm
const GRID_WEAD = "col-12 col-sm-6 col-md-4"; //weather
const GRID_GATE = "col-3 col-sm-3 col-md-3 col.xl-3"; //brána

//uchování předešlého stavu obsahu všech LivingStones
//následně např. porovnávám, co má smysl měnit
// var deviceObjectLast = {} ;


//třída pro ukládání stavu zařízení - místo globální variable
class Devices {
  constructor(myDevices) {
    this._myDevices = myDevices;
  }
  // Getter
  get sensors() {
    return this._myDevices;
  }
  //Setter
  set sensors (newDevices) {
        this._myDevices = newDevices;
  }
}


var ServerDevices = new Devices ();   //aktuální stav ze serveru
var LastDevices = new Devices();      //stav o jedno přečtení zpět, předešlý stav




//doba za jakou zčervená pozadí při výpadku spojení se serverem
const TimeOutRed = 5000;




//co se má akualizovat - jen detaily nebo celá strana všechny livingStones
class WhatToUpdate {
  constructor (myUpdate) {
    this._myUpdate = myUpdate;
  }

  get myUpdate () {
    return this._myUpdate;
  }

  set myUpdate(myUpdate) {
    this._myUpdate = myUpdate;
  }
}
const ALL = "vsechno";
const DETAILS = "detaily";

var myPageUpdate = new WhatToUpdate ();
myPageUpdate = ALL;       //cedy celou stránku a všechny stones (ne detail)
console.log(myPageUpdate);


// ********** KOD hlavní **********


window.Arduino = {};

window.onload = function() {
  var mojeUrl = window.location.protocol + "//" + window.location.host + '/1996/doomaster/sensors/';
  // var mojeUrl = window.location.protocol + "//" + window.location.host + '/jednadevetdevetsest/doomaster/sensors/';
        //mojeUrl: 'http://192.168.99.223:1818/doomaster/sensors/',

  Arduino.axios = axios.create({
    baseURL: mojeUrl,
    timeout: 3000       //nastavení timeout, po kterém je pak hlášena chyba - červené pozadí -ztracená komunikace se serverem
  });

  // cookies test - zeptá se a vypíše
  console.log("Používaná kukina: ", checkCookie());

  empyWholePage();    //smaže celou obrazovku a vygeneruje obsah - pro livingStones i Menu

}


//smaže celou obrazovku a vygeneruje obsah - pro livingStones i Menu
function empyWholePage() {

  myPageUpdate = ALL;   //zapne aktualizace celá stránky

  $("#boxScreen").empty();  //smazne všechen obsah - všechny Stones
  $("#bottomMenu").empty(); //smazne všechen obsah - všechny MENU
  //vygeneruje HTML pro všechny BOXíky, které jsou požadovány v JSON
  Arduino.containerShow();

  MenuStone.Home(DMmenuID1);
  MenuStone.Zvonecek(DMmenuID2);
  // MenuStone.Email(DMmenuID4);
  MenuStone.ServerTime(DMmenuID3);

  //vygeneruje OBSAH pro všechny HTML-BOXíky v JSON
  console.log("EEEMPTYYY");
  Arduino.containerUpdate();
}


// *************** Generuje HTML boxíky pro MENU ********


MenuStone = {};

MenuStone.Home = function (menuID) {
  //HTML boxík tlačítho HOME (DM)

  // var templateHTML =
  // `
  // <div onclick="" id="menu-${menuID}-menuContent" class="text-left" >
  //   <i style="font-size:1em" class=" fas fa-home"></i>
  //   <span id="menu-${menuID}-homeButton">HOME</span>
  // </div>
  // `;
  //<svg rect x="0" y="0"  height="20" viewBox="0 0 20 20">
  //   <use xlink:href="fontawesome/fa-solid.svg#home"></use>
  // </svg>
  //  f015 ikona domečku
  // https://fontawesome.com/icons/home?style=solid

    var templateHTML =
    `
    <div onclick="" id="menu-${menuID}-menuContent" class="text-left" >
      <i style="font-size:1.5rem; color:"Black" class="pekneIkony">&#xf015;</i>
      <span id="menu-${menuID}-homeButton">HOME</span>
    </div>
    `;

    $("#bottomMenu").append(templateHTML);

    //co se stane při kliknutí
    $(document).on("click", "#menu-" + menuID + "-menuContent", function() {
      odeslatPUT($(this).attr("id"), "1");
      location.reload(); //refresh obrazovky po kliknutí a odeslání PUT
    });
}

MenuStone.Zvonecek = function (menuID) {

  //HTML boxík pro activityLog / počet alarmů
    var templateHTML =
    `
    <div onclick="" id="menu-${menuID}-menuContent" class="text-left" >
      <span id="menu-${menuID}-activityBut">ACTIVITY</span>
    </div>
    `;

    $("#bottomMenu").append(templateHTML);
    $("#menu-" + menuID + "-activityBut").css({"font-size": "1.2rem"});

    //co se stane při kliknutí
    $(document).on("click", "#menu-" + menuID + "-menuContent", function() {
      odeslatPUT($(this).attr("id"), "1");
      Arduino.containerUpdate();
    });
}

MenuStone.ServerTime = function (menuID) {

  //HTML boxík pro čas ze Serveru
    var templateHTML =
    `
    <div onclick="" id="menu-${menuID}-menuContent" class="text-right" >

      <span id="menu-${menuID}-server-date" style="font-size:1rem">
        PONDELI 2018-19-2
      </span>
      <span id="menu-${menuID}-server-time" style="font-size:1rem">
        25:62:62
      </span>
    </div>
    `;

    $("#bottomMenu").append(templateHTML);

    //co se stane při kliknutí
    $(document).on("click", "#menu-" + menuID + "-menuContent", function() {
      odeslatPUT($(this).attr("id"), "1");
      deleteCookie("username");
      console.log("Smazání cookie");
      Arduino.containerUpdate();
    });
}

MenuStone.Email = function (menuID) {
  //HTML boxík pro email ikonu
  // var templateHTML =
  // `
  // <div onclick="" id="menu-${menuID}-menuContent" class="text-center" >
  //   <i style="font-size:1em" class="fas fa-envelope"></i>
  //   <span id="menu-${menuID}-email">EMAIL</span>
  // </div>
  // `;
  // <svg rect x="0" y="0"  height="20" viewBox="0 0 20 20">
  //   <use xlink:href="fontawesome/fa-regular.svg#envelope"></use>
  // </svg>
  // f0e0 ikona obálky:
  // https://fontawesome.com/icons?d=gallery&q=envelope&s=regular,solid

    var templateHTML =
    `
    <div onclick="" id="menu-${menuID}-menuContent" class="text-center" >
      <i style="font-size:1rem; color:"Black" class="pekneIkony">&#xf0e0;</i>
      <span id="menu-${menuID}-email">EMAIL</span>
    </div>
    `;

    $("#bottomMenu").append(templateHTML);

    //co se stane při kliknutí
    $(document).on("click", "#menu-" + menuID + "-menuContent", function() {
      odeslatPUT($(this).attr("id"), "1");
      Arduino.containerUpdate();
    });
}



// *************** Generuje OBSAH pro MENU ********
MenuStoneUpdate = {};

MenuStoneUpdate.Home = function (menuID, deviceItem)  {
  $("#menu-" + menuID + "-homeButton").html("");
}

MenuStoneUpdate.Zvonecek = function (menuID, deviceItem)  {
  // var sensorID = deviceItem.unid;
  //jestliže je chyba = ukaž badge (zvoneček na ikone DM)

  if (deviceItem.error == null || deviceItem.error == "") {
    $("#menu-" + menuID + "-activityBut").removeClass("badge badge-pill badge-danger");
    $("#menu-" + menuID + "-activityBut").html("");
  } else {
    $("#menu-" + menuID + "-activityBut").addClass("badge badge-pill badge-danger");
    $("#menu-" + menuID + "-activityBut").html(deviceItem.error);
  }
}

MenuStoneUpdate.ServerTime = function (menuID, deviceItem)  {

  var sensorID = deviceItem.unid;
  //zobrazi serverovy cas


    //načte čas ze serveru a standardizuje

    // var actiondate = new Date(deviceItem.value);
      //nefungovalo na iphone proto tatto metoda
      //The reason of the problem is iPhone Safari doesn't support the Y-m-d H:i:s (ISO 8601) date format. I have encountered this problem in 2017/7/19, I do not understand why Safari did not fix the problem after two years.
      //https://stackoverflow.com/questions/26657353/date-on-ios-device-returns-nan/26671796

    var t = deviceItem.value.split(/[- :]/);
    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    var actiondate = new Date(d);

    var minuta = actiondate.getMinutes();
    if (minuta < 10) {
      minuta = "0" + minuta.toString();
    }

    var sekunda = actiondate.getSeconds();
    if (sekunda < 10) {
      sekunda = "0" + sekunda.toString();
    }

    var cas = actiondate.getHours() + ":" + minuta + ":" + sekunda;
    //cas = "99:99:99"; - testovací čas

    var denVTydnu = "";
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
      case 0:
        denVTydnu = "Neděle"
        break;
      default:
      denVTydnu = "Fakt netuším"
    }

  var datum = denVTydnu + " " + actiondate.getDate() + "." + actiondate.getMonth() + ".";


  $("#menu-" + menuID + "-server-date").html(datum);
  $("#menu-" + menuID + "-server-date").css({"font-size": "0.7rem"});

  $("#menu-" + menuID + "-server-time").html(cas);
  $("#menu-" + menuID + "-server-time").css({"font-size": "1.5rem"});

  //js_date_methods pro rozdělání dní
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

}

MenuStoneUpdate.Email = function (menuID, deviceItem)  {
  $("#menu-" + menuID + "-email").html("");
  $('#menu-' + menuID + '-menuContent').css("color", "DimGray ");

}




// ****************** hlavní fce *********************

// spusteni funkcí kazdou senkundu

var myVar = setInterval(function() {
  myTimer()
}, 1000);

function myTimer() {
  // Arduino.hodiny();

  //co se má aktualizovat
  switch (myPageUpdate) {
    case ALL:     //uktualizuji všechny položky
        // console.log("vsechno");
        Arduino.containerUpdate(); //box na obrazovce
      break;
    default:    //aktualizuji pouze jednu položky - která se vrací jako string  myPageUpdate
        // console.log("detail");
        Arduino.detailUpdate(myPageUpdate);
  }

}




//uložiště všech Stones na obrazovce... Class Stone
Arduino.devices = {};


//vygeneruje HTML pro všechny livingStones (BOXíky), které jsou požadovány v JSON
Arduino.containerShow = function() {

  var sensorType = "";
  var sensorID = "0"; //cislo senzoru UNID

  //pošle GET s cookie za otazníkem
  Arduino.axios.get("/"  + `?`+checkCookie())
    .then(function(response) {
      var device = response.data;

      // setřídění obsah pole (LivingStone) podle weborder
      // console.log("před: ", device);
      // device = device.sort(function(a, b) {
      //   // return a.weborder - b.weborder;
      //   if (a.weborder < b.weborder)
      //     return -1;
      //   if (a.weborder > b.weborder)
      //     return 1;
      //   return 0;
      // });

console.log("Před: ", device);

      device = device.sort(function(a, b) {
        return a.weborder - b.weborder;
        // if (a.weborder < b.weborder)
        //   return -1;
        // if (a.weborder > b.weborder)
        //   return 1;
        // return 0;
      });


      console.log("Po: ", device);
      //načtení POPRVÉ stavu obsahu všech LivingStones
      //následně např. porovnávám, co má smysl měnit
      //jako objekt - historický stav LivingStonu
      //uložím do [globální střídy: s unid
      //všechny data převede na objekt s klícem unid
      ServerDevices.sensors = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});
      LastDevices = ServerDevices; //a udělá zálohu pro porovnání s minulým stavem
      // var popo =[];
      // popo = Object.keys(LastDevices.sensors); //převede na pole
      // console.log(popo.length);

      //cyklus pomocí forEach a třídou
      // Object.keys(LastDevices.sensors).forEach( function(key) {
      //   console.log(LastDevices.sensors[key]);
      // });
      // console.log(Object.keys(LastDevices.sensors)); //převeden a pole
      // https://sta]ckoverflow.com/questions/31096596/why-is-foreach-not-a-function-for-this-map/31096661



      device.forEach(function(deviceItem) {

        sensorID = deviceItem.unid;
        sensorWebType = deviceItem.webtype;

        if (sensorID != "0") { //pokud se nejedné o systémový ID

          switch (sensorWebType) {
            case DMteplota: //teplota
              //pomocí Class
              var temp = new Temperature($("#boxScreen"), deviceItem);    //udělá nový objekt
              temp.render();                                              //zobrazí na obrazovce - nový DOM
              Arduino.devices[deviceItem.unid] = temp;                    //uloží do "globální proměné" s klíčm deviceItem.unid pro snadnější vyhledávání - viz update
              break;
            case DMvoda: //voda
              var temp = new Water ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMsvetlo: //svetlo
              var temp = new Light ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMalarm: //alarm - PIR
              var temp = new Pir ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMbrana: //brána
              var temp = new Gate ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMkamera: //kamera
              var temp = new Camera ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMpocasi: //počasí
              var temp = new Weather ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMCameraAlarm: //Obrazek z kamery po alarmu
              var temp = new CameraAlarm ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            case DMgarage: //Obrazek z kamery po alarmu
              var temp = new Garage ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
              break;
            default:
              var temp = new EmptyBox ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;
          } //switch

          // aktualizuj Stone NA reálnou hodnotu
          Arduino.devices[deviceItem.unid].update(deviceItem);

        }   //if sensorID

      }); //konec forEach cyklu



    })
    //když nasane nějaký chyba - např. server není připojen.
    //řeší se v aktualizaci dat v JSON - teď jen vypíše na konzolu
    .catch(function(error) {
      console.log("chyba při vykreslení");
      console.log(error);
    });
}





//vygeneruje obsah pro HTML pro všechny livingStones (BOXíky), které jsou aktualizované v JSON
Arduino.containerUpdate = function() {

  var sensorID = ""; //unikatni sensorID

  //pošle GET s kukinou za otazníkem
  Arduino.axios.get('/' + `?`+checkCookie())
    .then(function(response) {

//       console.log(response.data);
// console.log(response.status);
// console.log(response.statusText);
// console.log(response.headers);
// console.log(response.config);

      //nastavení barvy pozadí - když jsou data z JSON opět k dispozic, tak pozadí na bílou
      $("body").css("background-color", "White");

      var device = response.data;

      //pravidelné načítání stavu obsahu všech LivingStones
      //jako objekt s klíčem unid a obsahem LivingStonu
      //následně např. porovnávám, co má smysl měnit
      var deviceObject = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});

      //průchod objekty
      $.each( deviceObject, function( sensorID, deviceItem ) {

        if (deviceItem.unid == "0") {
            //0 = systémové UNID - neaktualizuje se obsah
            //Uděla update menu podle systemovych parametru
            MenuStoneUpdate.Home(DMmenuID1, deviceItem);
            MenuStoneUpdate.Zvonecek(DMmenuID2, deviceItem);
            MenuStoneUpdate.Email(DMmenuID4,deviceItem);
            MenuStoneUpdate.ServerTime(DMmenuID3, deviceItem);
        } else {
            // aktualizuj Stone, které má klíč deviceItem.unid .... jak prosté :-)
            Arduino.devices[deviceItem.unid].update(deviceItem);
        }

         //obarvit senzor když je chyba
        if (deviceItem.error!=null && deviceItem.error != "" && deviceItem.unid != "0" ) {
             Arduino.devices[deviceItem.unid].sensorErrorColorsOn(deviceItem);
        }

         //Vrátit zpět - senzor když není chyba
        if ((deviceItem.error == "" && deviceItem.unid != "0") || (deviceItem.error ==null && deviceItem.unid != "0" )) {
           Arduino.devices[deviceItem.unid].sensorErrorColorsOff(deviceItem);
        }

      }); //konec forEach cyklus


      //zapamatování si posledního stavu
      //následně např. porovnávám, co má smysl měni
      ServerDevices.sensors = deviceObject;
      LastDevices = ServerDevices;

      //aktualizace času, kdy byl server naposledny aktivní
      LastServer.time = new Date().getTime();

    })


    .catch(function(error) {

      console.log("Nastala chyba při update - catch: ");

      // Při výpadků serveru zobrazovat červené pozadí po 5 sekundách
      if ((new Date().getTime() - LastServer.time) > TimeOutRed) {
        //nastavení barvy pozadí - když NEjsou data-tak ČERVENÉ
        $("body").css("background-color", "Red");
        zvukoveZnameni(); //zahraje audioAlarm
      }

      //zobrazení chyby
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);

    });     //konec catch

}



//vygeneruje obsah pro detail  livingStonu (BOXíky), které jsou aktualizované v JSON
Arduino.detailUpdate = function(UnidDetails) {

    newURL = "";
    // newURL = '/' + `?`+checkCookie() + `&unid=` + UnidDetails;   //v budoucnu pro poptávku jen jednoho JSON
    newURL = '/' + `?`+checkCookie() + "A";

    //pošle GET s kukinou za otazníkem
  Arduino.axios.get(newURL)
    .then(function(response) {

      //nastavení barvy pozadí - když jsou data z JSON opět k dispozic, tak pozadí na bílou
      $("body").css("background-color", "White");

      var device = response.data;



      //pravidelné načítání stavu obsahu všech LivingStones
      //jako objekt s klíčem unid a obsahem LivingStonu
      //následně např. porovnávám, co má smysl měnit
      var deviceObject = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});

      var myUnidDetails = "";
      myUnidDetails = UnidDetails;

      Arduino.devices[UnidDetails].updateDetails(deviceObject[myUnidDetails]);    //všechny detaily
      Arduino.devices[UnidDetails].update(deviceObject[myUnidDetails]);           //a lehce zbytečně i vlastní Stone - používaný v detailu- Šlo by to u jinak :-)

      //aktualizace času, kdy byl server naposledny aktivní
      LastServer.time = new Date().getTime();

    })


    .catch(function(error) {

      console.log("Nastala chyba při update - catch: ");

      // Při výpadků serveru zobrazovat červené pozadí po 5 sekundách
      if ((new Date().getTime() - LastServer.time) > TimeOutRed) {
        //nastavení barvy pozadí - když NEjsou data-tak ČERVENÉ
        $("body").css("background-color", "Red");
        zvukoveZnameni(); //zahraje audioAlarm
      }

      //zobrazení chyby
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);

    });     //konec catch

}
