

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
//stoneSize: v Class Stone.render

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



//28.3. - převedení LivingStones na Třídy Stones a práce s nimi






// *************** Generuje HTML boxíky na stránku ********



//základní prvek, ze kterého se všechny ostatní Stones dědí.
class Stone {
  constructor($parent, deviceItem) {    //parent - #boxScreen HTML kam umísti se, deviceItem: který Stone se má založit
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

  render(stoneSize) {     //stoneSize: velikost boxíku na obrazovce
    // HTML vzor "boxíku" společný pro všechny STONE

    this.$element =
    $(`<div onclick="" id="sensor-boxWrap" class="boxWrap ${stoneSize}">
         <div id="sensor-boxContent" class="boxContent">

         <!-- místo pro unikatní obsah kazdeho STONE -->

         </div>
     </div>`);

     this.$parent.append(this.$element);
     //vloží boxík na HTML stránku za #boxScreen
  }

  update(deviceItem) {
    console.log('Not implemented - generování update pro všechny společné boxíky');
  }


  renderDetails(stoneSize) {     //detail boxíku - STONu
    // HTML vzor "boxíku" společný pro všechny STONE


    console.log("ID kliknutého Stonu: ",this.deviceItem.unid);
    console.log("Detail kliknutého Stonu22: ", this.deviceItem);
    console.log(this.deviceItem.value);


    this.$parent.empty(); //smazne všechen obsah - všechyn Stones

    // super.render(GRID_SM);
    this.$element =
    $(`
      <div onclick="" id="sensor-boxWrap" class="boxWrap ${stoneSize}">
          <nav id="renderDetails" class="navbar fixed-top navbar-light bg-light btn-center-text">
              <div onclick="" id="back" class="text-left" >
                <i style="font-size:1.5rem; color:"Black" class="pekneIkony">&#xf053;</i>
                <span>Back</span>
              </div>

              <div onclick="" id="name" class="text-center" >
                <b><span>${this.deviceItem.webname}</span></b>    <!-- name of the stone -->
              </div>

              <div onclick="" id="back" class="text-right" >
                <span>Done</span>
              </div>
          </nav>

          <div id="sensor-boxContent" class="boxContent">

             <!-- místo pro unikatní obsah kazdeho DETAILU STONE -->

          </div>

          <br>
          <h2>Neaktualizované detaily:</h2>
          <div class = "detailStoneTable">
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Položka</th>
                    <th>Hodnota</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>unid</td>
                    <td>${this.deviceItem.unid}</td>
                  </tr>
                  <tr>
                    <td>webname</td>
                    <td>${this.deviceItem.webname}</td>
                  </tr>
                  <tr>
                    <td>webtype</td>
                    <td>${this.deviceItem.webtype}</td>
                  </tr>
                  <tr>
                    <td>subtype</td>
                    <td>${this.deviceItem.subtype}</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>${this.deviceItem.value}</td>
                  </tr>
                  <tr>
                    <td>error</td>
                    <td>${this.deviceItem.error}</td>
                  </tr>
                  <tr>
                    <td>weborder</td>
                    <td>${this.deviceItem.weborder}</td>
                  </tr>
                  <tr>
                    <td>lrespiot</td>
                    <td>${this.deviceItem.lrespiot}</td>
                  </tr>
                  <tr>
                    <td>priority</td>
                    <td>${this.deviceItem.priority}</td>
                  </tr>
                  <tr>
                    <td>invisible</td>
                    <td>${this.deviceItem.invisible}</td>
                  </tr>
                </tbody>
              </table>
          </div>

    </div>
     `);

     this.$parent.append(this.$element);
     this.$element.find('#back').css("color", "orange");
     // vloží boxík na HTML

     //CLICK: ošetření klikání na tlačítko
     this.$element.find('#back').click(() => {
       console.log("kliknuto BACK");
       // odeslatPUT(this.getId(), DMbranaT1); //odeslatPUT
       // alert("Odeslán PUT 1 na sensor " + this.getId());
       this.$parent.empty(); //smazne všechen obsah - všechyn Stones
       Arduino.containerShow();     //vykreslení puvodní obrazovky
       Arduino.containerUpdate();   //refresh obrazovky
     });


  }

  sensorErrorColorsOff(deviceItem) {
    // když se ukončí chyba sensoru, tak vrátí původní stav

    this.$element.find("#sensor-error").html("");
    //barva okolí
    this.$element.css( "background-color", "inherit" );
  }

  sensorErrorColorsOn(deviceItem) {     //
    // když nastavene chyba sensoru, tak se obarví
    this.deviceItem = deviceItem;
    var sensorID = deviceItem.unid  ;
    var serverDate = ServerDevices.sensors["0"].value;  //čas z poslední aktualizace serveru
    var deviceDate = deviceItem.lrespiot; //cas z device, LivingStone
    var textLostConTime = deviceItem.error + " | " +timeCountDown(deviceDate, serverDate, false);

    //barva boxíku
    this.$element.find("#sensor-error").html(textLostConTime);
    this.$element.find('#sensor-error').css("color", "Red ");
    this.$element.find('#sensor-boxContent').css("color", "DimGray ");
    this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3 ");
    //barva okolí
    this.$element.css( "background-color", "red" );
    //zapnutí audioAlarm
    zvukoveZnameni();
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

  renderDetails() {                          // METODA pro vykreslení HTML boxíku
    var uniqueContent = `
    <div id="sensor-module-teplota" class="text-center">
        <h1>
          <span id="sensor-teplota">-99</span>&deg;
          <br>
          <span id="sensor-name">Severní pól</span>

        </h1>
      </div>
    `;

    super.renderDetails("col-12 col-sm-12 col-md-12 col.xl-12");
    // zavola parent render metodu a vygeneruje container
    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah


  }

  render() {                          // METODA pro vykreslení HTML boxíku
    //HTML boxík pro teplotu

    //TODO:
    // změnint nadpis


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


    super.render(GRID_SM);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah



    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na žárovku
    this.$element.click(() => {
      console.log("KLIKNUTí na DETAIL Temperature + kliku je: ",this.getId());
      odeslatPUT(this.getId(), "1"); //odeslatPUT
      this.renderDetails();
    });

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


    super.render(GRID_SM);
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

class Pir extends Stone {     //subTřída pro PIR  - zobrazení i update

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


    super.render(GRID_SM);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

  }
}

class Camera extends Stone {     //subTřída pro Kameru  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    var newUrl = "";
    this.deviceItem = deviceItem;

    this.$element.find('#sensor-boxContent').css("color", "Black ");
    this.$element.find("#sensor-name").html(deviceItem.webname);
    this.$element.find("#sensor-time").html(deviceItem.lrespiot);
    var d = new Date();
    newUrl = deviceItem.subtype + "?" + d.getTime();
    this.$element.find("#sensor-kamera-url").attr("src",newUrl);

  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div class = "boxContent">
        <span id="sensor-name">Severní pól</span>
        <span> | </span>
        <i id="sensor-time">25:61</i>
    </div>
    <div id="sensor-module-kamera" class="kameraBox kamera-value">
        <div class="cam-value ">
          <img id="sensor-kamera-url" style="width:100%" src="images/image.jpg" alt="haha" class="img-fluid">
        </div>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render(GRID_CAM);

    this.$element.find('.boxContent').html(uniqueContent);

    this.$element.find('.boxContent').addClass("boxContent-camera");
    this.$element.find('.boxContent').removeClass("boxContent");

  }
}

class Water extends Stone {     //subTřída pro Hladinu Vody  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    this.deviceItem = deviceItem;
    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší

    this.$element.find("#sensor-name").html(deviceItem.webname);
    this.$element.find("#sensor-time").html(deviceItem.lrespiot);
    this.$element.find("#sensor-voda-numb").html(tempVal + " %");

    var temperatureScheme = Number(deviceItem.subtype); //barevné schéma pro teplotu

    switch (true) {
      case tempVal < temperatureScheme:
        this.$element.find('#sensor-boxContent').css("background-color", "Red");
        this.$element.find('#sensor-boxContent').css("color", "Black");
        break;
      default:
        this.$element.find('#sensor-boxContent').css("background-color", "LightGreen");
        this.$element.find('#sensor-boxContent').css("color", "Black");
    }


  }

  render() {                          // METODA pro vykreslení HTML boxíku
    //HTML boxík pro Water

    //unikátní obsah pro Stone - Water
    var uniqueContent = `
      <div id="sensor-module-voda" class="text-left">
          <h1>
              <span id="sensor-voda-numb">-99</span>
          </h1>
      </div>
      <div>
          <p id="sensor-name">Severní pól</p>
      </div>
      <div>
          <p id="sensor-error">error time</p>
      </div>
      `;


    super.render(GRID_SM);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

  }
}

class Gate extends Stone {     //subTřída pro Bránu  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu

    this.deviceItem = deviceItem;
    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
    this.$element.find('#sensor-name').html(deviceItem.webname);    //
    this.$element.find('#sensor-time').html(deviceItem.lrespiot);

    this.$element.find('#sensor-boxContent').css("color", "Black ");
    if (tempVal == 0) {
      this.$element.find("#sensor-brana-numb").html("ZAVŘENO");
      this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3");
    } else {
      this.$element.find("#sensor-brana-numb").html(tempVal + " % OTEVŘENO");
      this.$element.find('#sensor-boxContent').css("background-color", "GoldenRod");
    }
  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-brana" class="text-left">
        <h1>
            <span id="sensor-brana-numb">-99</span>
        </h1>
    </div>
    <div>
        <p id="sensor-name">Severní pól</p>
    </div>

    <div class="btn-group btn-group-justified">
      <a id="sensor-brana-but1" class="btn ">Otevřít</a>
      <a id="sensor-brana-but2" class="btn ">Branka</a>
      <a id="sensor-brana-but3" class="btn ">PULS</a>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render(GRID_GATE);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

    this.$element.find('.boxContent').addClass("boxContent-gate");
    this.$element.find('.boxContent').removeClass("boxContent");


    //CLICK: ošetření klikání na tlačítko
    this.$element.find('#sensor-brana-but1').click(() => {
      console.log("ID kliku je: ",this.getId());
      odeslatPUT(this.getId(), DMbranaT1); //odeslatPUT
      alert("Odeslán PUT 1 na sensor " + this.getId());
      Arduino.containerUpdate();  //refresh obrazovky
    });

    this.$element.find('#sensor-brana-but2').click(() => {
      console.log("ID kliku je: ",this.getId());
      odeslatPUT(this.getId(), DMbranaT2); //odeslatPUT
      alert("Odeslán PUT 2 na sensor " + this.getId());
      Arduino.containerUpdate();  //refresh obrazovky
    });

    this.$element.find('#sensor-brana-but3').click(() => {
      console.log("ID kliku je: ",this.getId());
      odeslatPUT(this.getId(), DMbranaT3); //odeslatPUT
      alert("Odeslán PUT 3 na sensor " + this.getId());
      Arduino.containerUpdate();  //refresh obrazovky
    });

  }
}

class Weather extends Stone {     //subTřída pro Počasí  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu

    this.deviceItem = deviceItem;
    var newUrl = "";
    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší
    this.$element.find('#sensor-name').html(deviceItem.webname);    //
    this.$element.find('#sensor-time').html(deviceItem.lrespiot);

    var d = new Date();
    newUrl = deviceItem.subtype + "?" + d.getHours();
    this.$element.find("#sensor-pocasi-url").attr("src",newUrl);
  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-pocasi" class="pocasi-value">
      <div class="cam-value ">
        <img id="sensor-pocasi-url" style="width:90%" src="images/image.jpg" alt="pocasi" class="img-responsive">
      </div>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render(GRID_WEAD);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

    this.$element.find('.boxContent').addClass("boxContent-pocasi");
    this.$element.find('.boxContent').removeClass("boxContent");

  }
}

class CameraAlarm extends Stone {     //subTřída pro Kameru  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    var newUrl = "";
    this.deviceItem = deviceItem;
    this.$element.find('#sensor-boxContent').css("color", "Black ");

    //je li nějaká hodnota, tedy např. počet obrázku
    if (deviceItem.value != "") {

      this.$element.find("#sensor-name").html(deviceItem.webname);
      this.$element.find("#sensor-time").html(deviceItem.lrespiot);

      newUrl = deviceItem.subtype;  //adresa ze serveru
      // console.log(newUrl);

      //obervení boxku
      this.$element.find('#sensor-boxContent').css("background-color", "Red");
    } else {

      this.$element.find("#sensor-name").html("No Camera Alarm");
      this.$element.find("#sensor-time").html("");
      newUrl = "images/image-no-alarm.jpg";

      //smazne boxík z DOM
      this.$element.remove();

      //obarvení boxíku
      this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3");
    }
    this.$element.find("#sensor-cameraalarm-url").attr("src",newUrl);

  }


  render() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div>
        <span id="sensor-name">Severní pól</span>
        <span> | </span>
        <i id="sensor-time">25:61</i>
    </div>
    <div id="sensor-module-cameraalarm" class="kameraBox kamera-value">
        <div class="cameraalarm-value ">
          <img id="sensor-cameraalarm-url" style="width:100%" src="images/image-no-alarm.jpg" alt="alarm" class="img-fluid">
        </div>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    super.render(GRID_CAMAL);

    this.$element.find('.boxContent').html(uniqueContent);

    this.$element.find('.boxContent').addClass("boxContent-camera");
    this.$element.find('.boxContent').removeClass("boxContent");

    //CLICK: ošetření klikání na žárovku
    this.$element.click(() => {
      console.log("ID kliku je: ",this.getId());
      odeslatPUT(this.getId(), "DELETE"); //odeslatPUT
      Arduino.containerUpdate();  //refresh obrazovky
    });


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
  console.log("Používaná kukina: ", checkCookie());

  //vygeneruje HTML pro všechny BOXíky, které jsou požadovány v JSON
  Arduino.containerShow();

  MenuStone.Home(DMmenuID1);
  MenuStone.Zvonecek(DMmenuID2);
  MenuStone.Email(DMmenuID4);
  MenuStone.ServerTime(DMmenuID3);



  //vygeneruje OBSAH pro všechny HTML-BOXíky v JSON
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

}





// ****************** hlavní fce *********************

Arduino.devices = {};     //uložiště všech Stones na obrazovce... Class Stone


//vygeneruje HTML pro všechny livingStones (BOXíky), které jsou požadovány v JSON
Arduino.containerShow = function() {

  var sensorType = "";
  var sensorID = "0"; //cislo senzoru UNID

  //pošle GET s cookie za otazníkem
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

      //nastavení barvy pozadí - když jsou data z JSON opět k dispozic, tak pozadí na bílou
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
