

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

// ** Menu

const DMmenuID1 = "10101";
const DMmenuID2 = "10102";
const DMmenuID3 = "10103";
const DMmenuID4 = "10104";


//počet sloupců na stránce

//<576px col-
//≥576px col-sm-
//≥768px col.md-
//≥992px col.lg-
//≥1200px col.xl-

const GRID_SM = "col-3 col-sm-2 col-md-3 col.xl-2"; //teplota
const GRID_MD = "col-8 col-sm-6"; //např.počasí - nepoužito
const GRID_FUL = "col-12 col-sm-6"; //kamera - napoužito

const GRID_CAM = "col-12 col-sm-12 col-lg-6"; //kamera
const GRID_CAMAL = "col-12 col-sm-6 col-md-6"; //kamera alarm
const GRID_WEAD = "col-12 col-sm-6 col-md-4"; //weather
const GRID_GATE = "col-12 col-sm-6 col-md-4"; //brána


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





//test a DEMO class na měření času místo globální proměné
//uchovává globální čas
class TimeKeeper {
  constructor(myTime) {
    this._myTime = myTime;
  }
  // Getter
  get time() {
    return this._myTime;
  }
  //Setter
  set time (newTime) {
        this._myTime = newTime;
  }
}
//inicializace: let LastServer = new TimeKeeper (HODNOTA);
//update hodnot: LastServer.time = NOVA_HODNOTA;
//čtení hodnoty: console.log(LastServer.time);

var LastServer = new TimeKeeper (new Date().getTime());


// *****************
// *****************

// *****************
//28.3. - převedení LivingStones na Třídy Stones a práce s nimi

//základní prvek, ze kterého se všechno dědí.
//bude
// - generování HTML obálky (pomocí .Append se pak přidá dovnitř obálky obsah )
// - zrušení HTML-ID- a nahrazení práce s HTML class
// - jak dělat, když nastane chyba čidla...
// - osamostatnit funkčnost do souboru Class
// - realizovat refresh čidla u každého čidla vzlášť a to pířmo ve Stone


//_________________________________________

class Stone {
  constructor($parent, deviceItem) {    //parent - HTML kam umísti se, deviceItem: který Stone se má založit
                                        // znak $ znamená označení elementu jako jQuery znak  #
    this.$parent = $parent;
    this._deviceItem = deviceItem;
  }

  get deviceItem() {
    return this._deviceItem;
  }

  set deviceItem(deviceItem) {
    this._deviceItem = deviceItem;
  }

  getId() {
    return this.deviceItem.unid;
  }

  render() {
    // HTML vzor "boxíku" společný pro všechny STONE

    this.$element =
    $(`<div onclick="" id="sensor-boxWrap" class="boxWrap ${GRID_SM}">
         <div id="sensor-boxContent" class="boxContent">

         <!-- místo pro unikatní obsah kazdeho STONE -->

         </div>
     </div>`);

     this.$parent.append(this.$element);
     //vloží boxík na HTML stránku za #boxScreen

  }

  update(deviceItem) {
    console.log('Not implemented');

  }
}

class EmptyBox extends Stone {     //subTřída pro Svetlo  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    console.log("EmptyBox is Not Implemented");
  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-null" class="text-left">
      <h1>
        <span id="sensor-null">NULL-Stone</span>
      </h1>
    </div>
    <div ><p id="sensor-name">NUL-pól</p></div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render();
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

  }
}

class Temperature extends Stone {     //subTřída pro Teplotu  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    this.deviceItem = deviceItem;
    var sensorID = deviceItem.unid;

    // console.log("Update Teploty pro ID: ", sensorID);

    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší

    this.$element.find('#sensor-name').html(deviceItem.webname);    //
    this.$element.find('#sensor-time').html(deviceItem.lrespiot);
    this.$element.find('#sensor-teplota').html(formatNumber(tempVal));

    var temperatureScheme = deviceItem.subtype; //barevné schéma pro teplotu
    switch (temperatureScheme) {
      case SchemeAir: //air - vzduch
        switch (true) {
          case tempVal < 4:
            this.$element.find('#sensor-boxContent').css("background-color", "CornflowerBlue");
            this.$element.find('#sensor-boxContent').css("color", "AliceBlue");
            break;
          case tempVal < 16:
            this.$element.find('#sensor-boxContent').css("background-color", "CornflowerBlue");
            this.$element.find('#sensor-boxContent').css("color", "Black");
            break;
          case tempVal < 21:
            this.$element.find('#sensor-boxContent').css("background-color", "MediumOrchid");
            this.$element.find('#sensor-boxContent').css("color", "Black");
            break;
          case tempVal < 31:
            this.$element.find('#sensor-boxContent').css("background-color", "Orange");
            this.$element.find('#sensor-boxContent').css("color", "Black");
            break;
          case tempVal > 30:
            this.$element.find('#sensor-boxContent').css("background-color", "Red");
            this.$element.find('#sensor-boxContent').css("color", "Black");
            break;
          default:
        } //switch boiler
        break;
      case SchemeBoiler: //boiler
        switch (true) {
        case tempVal < 4:
          this.$element.find('#sensor-boxContent').css("background-color", "CornflowerBlue");
          this.$element.find('#sensor-boxContent').css("color", "AliceBlue");
          break;
        case tempVal < 35:
          this.$element.find('#sensor-boxContent').css("background-color", "CornflowerBlue");
          this.$element.find('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal < 70:
          this.$element.find('#sensor-boxContent').css("background-color", "MediumOrchid");
          this.$element.find('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal < 81:
          this.$element.find('#sensor-boxContent').css("background-color", "Orange");
          this.$element.find('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal > 80:
          this.$element.find('#sensor-boxContent').css("background-color", "Red");
          this.$element.find('#sensor-boxContent').css("color", "Black");
          break;
        default:
      } //switch boiler
        break;
      case SchemeWater: //water - swimming pool
        switch (true) {
        case tempVal < 4:
          $('#sensor-boxContent').css("background-color", "CornflowerBlue");
          $('#sensor-boxContent').css("color", "AliceBlue");
          break;
        case tempVal < 20:
          $('#sensor-boxContent').css("background-color", "CornflowerBlue");
          $('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal < 25:
          $('#sensor-boxContent').css("background-color", "MediumOrchid");
          $('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal < 30:
          $('#sensor-boxContent').css("background-color", "Orange");
          $('#sensor-boxContent').css("color", "Black");
          break;
        case tempVal > 29:
          $('#sensor-boxContent').css("background-color", "Red");
          $('#sensor-boxContent').css("color", "Black");
          break;
        default:
      } //switch swimming pool
        break;
    } //switch (temperatureScheme)
  }

  render() {                          // METODA pro vykreslení HTML boxíku
    //HTML boxík pro teplotu

    //unikátní obsah pro Stone - Teplota
    var uniqueContent = `
      <div id="sensor-module-teplota" class="text-left">
        <h1>
          <span id="sensor-teplota">-99</span>&deg;
        </h1>
      </div>
      <div ><p id="sensor-name">Severní pól</p></div>
      <div>
          <p id="sensor-error">error time</p>
      </div>`;


    super.render();
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

  }
}


class Light extends Stone {     //subTřída pro Svetlo  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu

    this.deviceItem = deviceItem;
    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
    this.$element.find('#sensor-name').html(deviceItem.webname);    //
    this.$element.find('#sensor-time').html(deviceItem.lrespiot);
    switch (true) {
      case tempVal == 1:
        this.$element.find('#sensor-boxContent').css("background-color", "GoldenRod");
        this.$element.find('#sensor-boxContent').css("color", "Black");
        break;
      default:
        this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3");
        this.$element.find('#sensor-boxContent').css("color", "Black");
    }
  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-svetlo">
        <i style="font-size:2rem; color:"Black" class="pekneIkony">&#xf0eb;</i>
    </div>
    <div>
        <p id="sensor-name">Severní pól</p>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>`;


    super.render();
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah


    //CLICK: ošetření klikání na žárovku
    this.$element.click(() => {
      console.log("ID kliku je: ",this.getId());
      odeslatPUT(this.getId(), "1"); //odeslatPUT
      Arduino.containerUpdate();  //refresh obrazovky
    });

    //METODA A:
      //jede krásně
      //to zajisti, ze scope this je stejny jako v bloku ktery je nadrazeny teto funkci, tzn. metode render()
      //kde je this instance Light tridy.
      // A na te uz muzes volat getId()

    //METODA B:
      // this.$element.click(function() {
      //   console.log("ID2 kliku je: ",this.getId());
      //   odeslatPUT(this.getId(), "1");
      // }.bind(this));
      //Timhle reknes funkci kterou bindujes, ze hodnotu this pro vsechna jeji volani chces nastavit na cokoliv ty potrebujes. v tomto pripade na this.
      //this je stale ve scope render funkci (neni obaleno jinou funkci) a tim padem odkazuje na instanci Light a ma getId()

  }
}

class Pir extends Stone {     //subTřída pro Svetlo  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu

    this.deviceItem = deviceItem;
    this.$element.find("#sensor-name").html(deviceItem.webname);
    this.$element.find("#sensor-time").html(deviceItem.lrespiot);
    this.$element.find("#sensor-boxContent").css("color", "Black");
  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-alarm" class="text-left">
        <div id="sensor-alarm-stav">
          <i style="font-size:2rem; color:"Black" class="pekneIkony">&#xf071;</i>
        </div>
    </div>
    <div >
      <p id="sensor-name">Severní pól</p>
      <i id="sensor-time">25:61</i>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render();
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

  }
}





// ********** KOD


window.Arduino = {};

window.onload = function() {
  var mojeUrl = window.location.protocol + "//" + window.location.host + '/fuck-in/doomaster/sensors/';
        //mojeUrl: 'http://192.168.99.223:1818/doomaster/sensors/',

  Arduino.axios = axios.create({
    baseURL: mojeUrl,
    timeout: 100000
  });


// cookies test - zeptá se a vypíše
console.log(checkCookie());



  //vygeneruje HTML pro všechny BOXíky, které jsou požadovány v JSON
  Arduino.containerShow();

  //vygeneruje OBSAH pro všechny HTML-BOXíky v JSON
  Arduino.containerUpdate();
}


// *************** Generuje HTML boxíky na stránku ********

//nove fce pro HTML boxiky - tzv. LivingStone = každá fce samostatný
LivingStone = {};

// LivingStone.EmptyBox = function (sensorID) {
//   //HTML boxík pro NIC
//   var templateHTML =
//   `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
//       <div id="sensor-${sensorID}-boxContent" class="boxContent">
//
//           <div id="sensor-${sensorID}-module-null" class="text-left">
//             <h1>
//               <span id="sensor-${sensorID}-null">NULL-Stone</span>
//             </h1>
//           </div>
//           <div ><p id="sensor-${sensorID}-name">NUL-pól</p></div>
//           <div>
//               <p id="sensor-${sensorID}-error">error time</p>
//           </div>
//
//       </div>
//   </div>`;
//
//   $("#boxScreen").append(templateHTML);
//
// }

//toto je původní - nahrazeno Class ... class Temperature extends Stone
//
// LivingStone.Temperature = function (deviceItem) {
//   //HTML boxík pro teplotu
//   var sensorID = deviceItem.unid;
//   var templateHTML =
//   `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
//       <div id="sensor-${sensorID}-boxContent" class="boxContent">
//
//           <div id="sensor-${sensorID}-module-teplota" class="text-left">
//             <h1>
//               <span id="sensor-${sensorID}-teplota">-99</span>&deg;
//             </h1>
//           </div>
//           <div ><p id="sensor-${sensorID}-name">Severní pól</p></div>
//           <div>
//               <p id="sensor-${sensorID}-error">error time</p>
//           </div>
//
//       </div>
//   </div>`;
//
//   //přidání boxku na stránku (do #boxScreen) na poslední místo
//   $("#boxScreen").append(templateHTML);
//
// }

LivingStone.Pir = function (sensorID) {
  //HTML boxík pro Pir Motion Alarm

  // var templateHTML =
  // `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
  //     <div id="sensor-${sensorID}-boxContent" class="boxContent">
  //
  //         <div id="sensor-${sensorID}-module-alarm" class="text-left">
  //           <i id="sensor-${sensorID}-alarm-stav" class="fas fa-exclamation-triangle text-danger"></i>
  //         </div>
  //         <div >
  //           <p id="sensor-${sensorID}-name">Severní pól</p>
  //           <i id="sensor-${sensorID}-time">25:61</i>
  //         </div>
  //         <div>
  //             <p id="sensor-${sensorID}-error">error time</p>
  //         </div>
  //
  //     </div>
  // </div>`;
  //https://fontawesome.com/icons/exclamation-triangle?style=solid

  // <svg rect x="0" y="0"  height=25 viewBox="0 0 100 100">
  //   <use xlink:href="fontawesome/fa-solid.svg#exclamation-triangle"></use>
  // </svg>
  //
  var templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent">

          <div id="sensor-${sensorID}-module-alarm" class="text-left">
              <div id="sensor-${sensorID}-alarm-stav">
                <i style="font-size:2rem; color:"Black" class="pekneIkony">&#xf071;</i>
              </div>
          </div>
          <div >
            <p id="sensor-${sensorID}-name">Severní pól</p>
            <i id="sensor-${sensorID}-time">25:61</i>
          </div>
          <div>
              <p id="sensor-${sensorID}-error">error time</p>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Camera = function (sensorID) {
  //HTML boxík pro Kameru
  //bylo GRID_FUL
  var templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_CAM}">
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
          <div>
              <p id="sensor-${sensorID}-error">error time</p>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);

}

LivingStone.Weather = function (sensorID) {
  //HTML boxík pro Počasí
  //bylo: GRID_MD
  var templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_WEAD}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent-pocasi">

          <div id="sensor-${sensorID}-module-pocasi" class="pocasi-value">
            <div class="cam-value ">
              <img id="sensor-${sensorID}-pocasi-url" style="width:90%" src="images/image.jpg" alt="pocasi" class="img-responsive">
            </div>
          </div>
          <div>
              <p id="sensor-${sensorID}-error">error time</p>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Water = function (sensorID) {
  //HTML boxík pro Vodu
  var templateHTML =
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
          <div>
              <p id="sensor-${sensorID}-error">error time</p>
          </div>

      </div>
  </div>`;

  //přidání boxku na stránku (do #boxScreen) na poslední místo
  $("#boxScreen").append(templateHTML);
}

LivingStone.Gate = function (sensorID) {
  //HTML boxík pro Bránu
  //bylo GRID_MD
  var templateHTML =
  `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_GATE}">
      <div id="sensor-${sensorID}-boxContent" class="boxContent-gate">

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
          <div>
              <p id="sensor-${sensorID}-error">error time</p>
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

// LivingStone.Light = function (sensorID) {
//   //HTML boxík pro Světlo
//
//   // <div id="sensor-${sensorID}-module-svetlo">
//     // <div style="font-size:2em; color:"White">
//         // <i class="far fa-lightbulb"></i>
//     // </div>
//   //</div>
//   //nově
//   //rozměr height=30, pozice a velikost viewBox="0 0 100 100"
//   // <svg id="sensor-${sensorID}-module-svetlo" height=30 viewBox="0 0 100 100">
//   //   <use xlink:href="fa-regular.svg#lightbulb"></use>
//   // </svg>
//
//   // <div style="font-size:2em; color:"White">
//   //     <svg rect x="0" y="0"  height="30" viewBox="0 0 100 100">
//   //       <use xlink:href="fontawesome/fa-regular.svg#lightbulb"></use>
//   //     </svg>
//   // </div>
//
//   //f0eb ikona svetla: https://fontawesome.com/icons/lightbulb?style=regular
//
//   var templateHTML =
//   `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_SM}">
//       <div id="sensor-${sensorID}-boxContent" class="boxContent">
//             <div id="sensor-${sensorID}-module-svetlo">
//               <i style="font-size:2rem; color:"Black" class="pekneIkony">&#xf0eb;</i>
//              </div>
//           <div>
//               <p id="sensor-${sensorID}-name">Severní pól</p>
//           </div>
//
//           <div>
//               <p id="sensor-${sensorID}-error">error time</p>
//           </div>
//
//       </div>
//   </div>`;
//
//   $("#boxScreen").append(templateHTML);
//   // $('#boxScreen').append(`<i class="pekneIkony">cecko &#xf0c0;</i>`);
//   // $('#boxScreen').append(`<i class="far fa-lightbulb"></i>`);
//
//
//   //co se stane při kliknutí
//   $(document).on("click", "#sensor-" + sensorID + "-boxContent", function() {
//     odeslatPUT($(this).attr("id"), "1");
//     Arduino.containerUpdate();  //refresh obrazovky
//   });
//
// }

LivingStone.CameraAlarm = function (sensorID) {

  //HTML boxík pro Obrazek z kamery po alarmu
  //bylo GRID_FUL
    var templateHTML =
    `<div onclick="" id="sensor-${sensorID}-boxWrap" class="boxWrap ${GRID_CAMAL}">
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
            <div>
                <p id="sensor-${sensorID}-error">error time</p>
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

//toto je původní - nahrazeno Class ... class Temperature extends Stone
//
// LivingStoneUpdate.Temperature = function (deviceItem)  {
//
//   var sensorID = deviceItem.unid;
//   //var tempVal = device[i].value;
//   //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
//   var tempVal = Number(deviceItem.value);
//
//   $('#sensor-' + sensorID + '-name').html(deviceItem.webname);
//   $('#sensor-' + sensorID + '-time').html(deviceItem.lrespiot);
//   $('#sensor-' + sensorID + '-teplota').html(formatNumber(tempVal));
//
//   var temperatureScheme = deviceItem.subtype; //barevné schéma pro teplotu
//   switch (temperatureScheme) {
//     case SchemeAir: //air - vzduch
//       switch (true) {
//         case tempVal < 4:
//           $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//           $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
//           break;
//         case tempVal < 16:
//           $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//           $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//           break;
//         case tempVal < 21:
//           $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
//           $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//           break;
//         case tempVal < 31:
//           $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
//           $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//           break;
//         case tempVal > 30:
//           $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
//           $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//           break;
//         default:
//       } //switch boiler
//       break;
//     case SchemeBoiler: //boiler
//       switch (true) {
//       case tempVal < 4:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
//         break;
//       case tempVal < 35:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal < 70:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal < 81:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal > 80:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       default:
//     } //switch boiler
//       break;
//     case SchemeWater: //water - swimming pool
//       switch (true) {
//       case tempVal < 4:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "AliceBlue");
//         break;
//       case tempVal < 20:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "CornflowerBlue");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal < 25:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "MediumOrchid");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal < 30:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "Orange");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       case tempVal > 29:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       default:
//     } //switch swimming pool
//       break;
//   } //switch (temperatureScheme)
// }

LivingStoneUpdate.Water = function (deviceItem) {
  var sensorID = deviceItem.unid;
  var tempVal = Number(deviceItem.value);
  $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
  $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);
  $("#sensor-" + sensorID + "-voda-numb").html(tempVal + " %");
  // $("#sensor-" + sensorID + "-voda").height(tempVal + "%");

  //změna barvy po dosažení hodnoty v Subtype
  var temperatureScheme = Number(deviceItem.subtype); //barevné schéma pro teplotu

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

// LivingStoneUpdate.Light = function (deviceItem) {
//
//   //jestlize nastala chyba - tak orámečkovat a napsat chybu
//   //vložit i do livingStones.všechny
//   var sensorID = deviceItem.unid;
//
//
//     $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
//
//     var tempVal = Number(deviceItem.value);
//     // console.log("hodnota tempVal je ", tempVal);
//     switch (true) {
//       case tempVal == 1:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "GoldenRod");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//         break;
//       default:
//         $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
//         $('#sensor-' + sensorID + '-boxContent').css("color", "Black");
//     }
//
// }

LivingStoneUpdate.Pir = function (deviceItem) {
  var sensorID = deviceItem.unid;
  $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
  $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);
  $('#sensor-' + sensorID + '-boxContent').css("color", "Black ");
}

LivingStoneUpdate.Gate = function (deviceItem) {
  var sensorID = deviceItem.unid;
  var tempVal = Number(deviceItem.value);

  $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
  $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);
  $('#sensor-' + sensorID + '-boxContent').css("color", "Black ");
  if (tempVal == 0) {
    $("#sensor-" + sensorID + "-brana-numb").html("ZAVŘENO");
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
  } else {
    $("#sensor-" + sensorID + "-brana-numb").html(tempVal + " % OTEVŘENO");
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "GoldenRod");
  }

}

LivingStoneUpdate.Camera = function (deviceItem) {
  var sensorID = deviceItem.unid;
  $('#sensor-' + sensorID + '-boxContent').css("color", "Black ");
  $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
  $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);
  // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku
  d = new Date();
  newUrl = deviceItem.subtype + "?" + d.getTime();
  $("#sensor-" + sensorID + "-kamera-url").attr("src",newUrl);
}

LivingStoneUpdate.Weather = function (deviceItem) {
  var sensorID = deviceItem.unid;
  $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
  $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);
  d = new Date();
  newUrl = deviceItem.subtype + "?" + d.getHours();
  $("#sensor-" + sensorID + "-pocasi-url").attr("src",newUrl);
}

LivingStoneUpdate.CameraAlarm = function (deviceItem) {
  var sensorID = deviceItem.unid;
  var newUrl = "";
  $('#sensor-' + sensorID + '-boxContent').css("color", "Black ");

  // $("#sensor-" + sensorID + "-time").addClass("top-left"); //zobrazení času v rohu obrázku

  //je li nějaká hodnota, tedy např. počet obrázku
  if (deviceItem.value != "") {
    $("#sensor-" + sensorID + "-name").html(deviceItem.webname);
    $("#sensor-" + sensorID + "-time").html(deviceItem.lrespiot);

    newUrl = deviceItem.subtype;  //adresa ze serveru
    // console.log(newUrl);


    //obervení boxku
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "Red");
  } else {
    $("#sensor-" + sensorID + "-name").html("No Camera Alarm");
    $("#sensor-" + sensorID + "-time").html("");
    newUrl = "images/image-no-alarm.jpg";

    //smazne boxík z DOM
    $("#sensor-" + sensorID + "-boxWrap").remove();

    //obarvení boxíku
    $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3");
  }


  $("#sensor-" + sensorID + "-cameraalarm-url").attr("src",newUrl);
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



// *****  pomocné




timeCountDown = function (lastDate, serverDate, longText) {
  //vrátí string, ve kterém je rozdíl času oproti jinému času (serverový / frontendový / ..)
  //lastDate je formatu Date
  //serverDate je formátu Date (počítá se rozdíl do "distance")
  //longText je true => Výstup: dlouhý formát => 12 dní 4 hodiny 22 minut 2 sekundy
  //longText je false => Výstup: krátký formát => 292:22:02
  //užití: jak_dlouho_je_to = timeCountDown("2018-03-1 18:06:05", deviceObjectLast["0"].lrespiot, false);

  var t = lastDate.split(/[- :]/);
  // Apply each element to the Date function
  var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  var historyTime = new Date(d);

  var t2 = serverDate.split(/[- :]/);
  // Apply each element to the Date function
  var d2 = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
  var currentTime = new Date(d2);

  // var currentTime = new Date(serverDate);
  var distance =  currentTime - historyTime;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

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

    var hours = Math.floor((distance / ( 1000 * 60 * 60 )));
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





// *************** pomocné fce ********


// spusteni funkcí kazdou senkundu

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





//odešle PUT na server s jménem a hodnotou
function odeslatPUT(jmenoSenzoru, hodota) {
  const url = `${jmenoSenzoru}`;

  //odešle PUT s hodnotou "value" + cookies
  Arduino.axios.put('/' + jmenoSenzoru  + `?`+checkCookie(), {
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

//zahraje zvuk
function zvukoveZnameni (){

  var x = document.getElementById("audioAlarm");
  x.play();

    //k dispozico jsou
    // alarm.mp3 - ale dlouhé
    // beep.mp3 - fajn
    // voice.mp3 -  fajn
    //v index.HTML k nastaveni

    // if x.onplaying = function() {
    //     alert("The video is now playing");
    // };

  // if (coZahrat == "alarm") {
  //   $("#audioAlarm").attr("src","audio/voice.mp3");
    // x.loop = true;
    // x.play();
  //
  // } else {
  //
  // }

}

//když nastavene chyba sensoru, tak se obarví
function sensorErrorColorsOn (deviceItem){


  var sensorID = deviceItem.unid;
  var serverDate = ServerDevices.sensors["0"].value;  //čas z poslední aktualizace serveru
  var deviceDate = deviceItem.lrespiot; //cas z device, LivingStone
  var textLostConTime = deviceItem.error + " | " +timeCountDown(deviceDate, serverDate, false);
  // console.log(textLostConTime);


  //pomocí Class - jak na to?
  //
  //_________________________________________



  $("#sensor-" + sensorID + "-error").html(textLostConTime);
  $('#sensor-' + sensorID + '-error').css("color", "Red ");
  $('#sensor-' + sensorID + '-boxContent').css("color", "DimGray ");
  $('#sensor-' + sensorID + '-boxContent').css("background-color", "#F3F3F3 ");
  $('#sensor-' + sensorID + '-boxWrap').css("background-color", "Red ");

//zapnutí audioAlarm
  zvukoveZnameni();

}

//když není chyba sensoru, tak se obarví
function sensorErrorColorsOff (deviceItem){
  var sensorID = deviceItem.unid;

  $("#sensor-" + sensorID + "-error").html("");
  // $('#sensor-' + sensorID + '-boxWrap').css("background-color", "White");
  $('#sensor-' + sensorID + '-boxWrap').css('background-color','inherit'); //průhledá barva - lepší než transparent. Zdědí barvu z předchudce - tedy prvnku nad tím - tedy boxScreen (si myslím)

}


// ****************** hlavní fce *********************




//vygeneruje HTML pro všechny livingStones (BOXíky), které jsou požadovány v JSON
Arduino.containerShow = function() {

  var sensorType = "";
  var sensorID = "0"; //cislo senzoru UNID

  // ** LivingStones

  //pro Class - udělá novou ....něco. Jak se to jmenuje??? (P_?__?)
  Arduino.devices = {};


  //pošle GET s kukinou za otazníkem
  Arduino.axios.get("/"  + `?`+checkCookie())
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

          // console.log(deviceItem.unid + " - " + deviceItem.error);
          switch (sensorWebType) {
            case DMteplota: //teplota

              //pomocí Class
              var temp = new Temperature($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;


              // LivingStone.Temperature(deviceItem);  //vytvoří HTML
              // LivingStoneUpdate.Temperature (deviceItem); //naplní obsahem
              break;
            case DMvoda: //voda
              LivingStone.Water(sensorID);
              LivingStoneUpdate.Water (deviceItem);
              break;
            case DMsvetlo: //svetlo



              // LivingStone.Light(sensorID);
              // LivingStoneUpdate.Light (deviceItem);

              var temp = new Light ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;



              break;
            case DMalarm: //alarm - PIR

            // LivingStone.Pir(sensorID);
            // LivingStoneUpdate.Pir(deviceItem);

              var temp = new Pir ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;

              break;
            case DMbrana: //brána
              LivingStone.Gate(sensorID);
              LivingStoneUpdate.Gate(deviceItem);
              break;
            case DMkamera: //kamera
              LivingStone.Camera(sensorID);
              LivingStoneUpdate.Camera (deviceItem);
              break;
            case DMpocasi: //počasí
              LivingStone.Weather(sensorID);
              LivingStoneUpdate.Weather (deviceItem);
              break;
            case DMCameraAlarm: //Obrazek z kamery po alarmu
              LivingStone.CameraAlarm(sensorID);
              LivingStoneUpdate.CameraAlarm (deviceItem);
              break;
            default:
              // LivingStone.EmptyBox(sensorID);   //pokud náhodou bude něco úplně nestandardního - bez LivingStonu

              var temp = new EmptyBox ($("#boxScreen"), deviceItem);
              temp.render();
              Arduino.devices[deviceItem.unid] = temp;


          } //switch
        }   //if sensorID
        else {

            // ** Menu
            MenuStone.Home(DMmenuID1);

            MenuStone.Zvonecek(DMmenuID2);
            MenuStone.Email(DMmenuID4);
            MenuStone.ServerTime(DMmenuID3);

            MenuStoneUpdate.Home(DMmenuID1, deviceItem);
            MenuStoneUpdate.Zvonecek(DMmenuID2, deviceItem);
            MenuStoneUpdate.Email(DMmenuID4,deviceItem);
            MenuStoneUpdate.ServerTime(DMmenuID3, deviceItem);

        }
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

      //nastavení barvy pozadí - když jsou data-tak bílé
      $("body").css("background-color", "White");

      var device = response.data;



      //uz zbytečně - nějak nepoužívám :-()

      //pravidelné načítání stavu obsahu všech LivingStones
      //jako objekt s klíčem unid a obsahem LivingStonu
      //následně např. porovnávám, co má smysl měnit
      var deviceObject = device.reduce(function(map, obj) {
          map[obj.unid] = obj;
          return map;
      }, {});

      //průchod objekty
      $.each( deviceObject, function( sensorID, deviceItem ) {
      // device.forEach(function(deviceItem) {

        // sensorID = deviceItem.unid;
        // console.log(sensorID);

        sensorWebType = deviceItem.webtype;

        //pokud je chyba a zároveň se nejedná o systémovou informaci

        //obarvit senzor když NENÍ chyba
         // console.log("A1");
        if (deviceItem.error!=null && deviceItem.error != "" && deviceItem.unid != "0" ) {
            //obarvit senzor když je chyba
            sensorErrorColorsOn (deviceItem);
            console.log("je chyba ", deviceItem);

        } else {
            //obarvit senzor když NENÍ chyba

            sensorErrorColorsOff (deviceItem);

          // konec Device ERROR      //OM_______________Omen přidal misto - níže. zbytečné - pokračuji i když BYLA chyba

              if (deviceItem.unid == "0") {
                //Uděla update menu podle systemovych parametru

                // ** Menu
                MenuStoneUpdate.Home(DMmenuID1, deviceItem);
                MenuStoneUpdate.Zvonecek(DMmenuID2, deviceItem);
                MenuStoneUpdate.Email(DMmenuID4,deviceItem);
                MenuStoneUpdate.ServerTime(DMmenuID3, deviceItem);
              }

              //podle typu se naplní hodnoty
              switch (sensorWebType) {
                case "-1": //Pokud se jedná o systémove UNID = systemovy cas - nedělej nic
                break;


                //V bucoucnu - zrušit v case ....pomocí Class

                case DMteplota: //teplota
                  // LivingStoneUpdate.Temperature (deviceItem);

                  //pomocí Class
                  Arduino.devices[deviceItem.unid].update(deviceItem);
                  // console.log("ID je: ",Arduino.devices[deviceItem.unid].getId());

                  break;

                case DMvoda: //voda
                  LivingStoneUpdate.Water(deviceItem);
                  break;

                case DMsvetlo: //světlo
                  // LivingStoneUpdate.Light (deviceItem);
                  // console.log("deviceItem.unid je: ", deviceItem.unid);
                  Arduino.devices[deviceItem.unid].update(deviceItem);

                  break;

                case DMalarm: //alarm - PIR
                  // LivingStoneUpdate.Pir (deviceItem);
                  Arduino.devices[deviceItem.unid].update(deviceItem);
                  break;

                case DMbrana: //brána
                  LivingStoneUpdate.Gate (deviceItem);
                  break;

                case DMkamera: //kamera (ne počasí)
                  LivingStoneUpdate.Camera (deviceItem);
                  break;

                case DMpocasi: //počasí
                  LivingStoneUpdate.Weather (deviceItem);
                  break;
                case DMCameraAlarm: //kamera s alarmovým obrazkem

                //testování - jestli ještě prvek na webu (DOM) existuje.


                  //pomocí JS ... POZOR - ID bez #, je to JS ne jQuery

                  jmenoPrvku = "sensor-" + sensorID + "-boxWrap";
                  // console.log(jmenoPrvku);
                  if(document.getElementById(jmenoPrvku)) {
                    // console.log("EXISTUJE");
                  } else {
                    // console.log("NEEXISTUJE");
                  }


                  // if($("#sensor-" + sensorID + "-boxWrap").length == 0) {
                  //     //it doesn't exist
                  //     }
                  LivingStoneUpdate.CameraAlarm (deviceItem);
                  break;

              } //konec :switch:


        }  // konec Device ERROR - Omen zakomentoval MM__________

      }); //konec forEach cyklus


      //zapamatování si posledního stavu
      //následně např. porovnávám, co má smysl měni

      ServerDevices.sensors = deviceObject;
      LastDevices = ServerDevices;
      // console.log(LastDevices);


      //aktualizace času, kdy byl server naposledny aktivní
      LastServer.time = new Date().getTime();

    })
    // .else {
    //   console.log("ELSE");
    // }
    .catch(function(error) {
      console.log("TATO CHYBA");

        // Při výpadků serveru zobrazovat červené pozadí po 5 sekundách
        if ((new Date().getTime() - LastServer.time) > TimeOutRed) {
          //nastavení barvy pozadí - když NEjsou data-tak ČERVENÉ
          $("body").css("background-color", "Red");

          //zahraje audioAlarm
          zvukoveZnameni();


        }




        if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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


    });

}



// Zjištění cookies z prohlížeče

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    //počet dnů - v našem případě 30 dní
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    var user = getCookie("username");
    // console.log("user " + user);
    if (user != "") {
        // alert("Welcome again " +s user);
    } else {
       user = prompt("Tvuj otisks:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30); //expirace za 30 dnís
       }
    }
    return user;
}





//hodí se
//smaže boxík
//$("#sensor-" + sensorID + "-boxWrap").empty();
//odstraní boxík
//  $("#sensor-" + sensorID + "-boxWrap").remove();
