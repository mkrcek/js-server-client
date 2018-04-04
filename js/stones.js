



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

    window.scrollTo(0, 0); //posune kurzor na začátek obrazovky - nahoru




    // console.log("ID kliknutého Stonu: ",this.deviceItem.unid);
    // console.log("Detail kliknutého Stonu22: ", this.deviceItem);
    // console.log(this.deviceItem.value);


    this.$parent.empty(); //smazne všechen obsah - všechyn Stones

    // super.render(GRID_SM);

    this.$element =
    $(`
      <div onclick="" id="sensor-boxWrap" class="detailStoneScreen boxWrap ${stoneSize}" >
          <nav id="renderDetails" class="navbar fixed-top navbar-light bg-light btn-center-text">
              <div onclick="" id="back" class="text-left" >
                <i style="font-size:1.5rem; color:"Black" class="pekneIkony">&#xf053;</i>
                <span>Zpět</span>
              </div>

              <div onclick="" id="name" class="text-center" >
                <b><span>${this.deviceItem.webname}</span></b>    <!-- name of the stone -->
              </div>

              <div onclick="" id="back" class="text-right" >
                <span>Done</span>
              </div>
          </nav>

          <br>
          <div id="sensor-boxContent" class="boxContent">

             <!-- místo pro unikatní obsah kazdeho DETAILU STONE -->

          </div>
          <br>

          <h1>Neaktualizováno: </h1>
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
                    <td>lchvalue</td>
                    <td>${this.deviceItem.lchvalue}</td>
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

     // // vloží boxík na HTML

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
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
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

    var tempVal = Number(deviceItem.value); //protože tempVal je typu STRING musím jej převést na číslo. Zejména pro porovnávíní větší menší

      if ( tempVal != 0) {
        this.$element.find('#sensor-boxContent').css("background-color", "Tomato");
        this.$element.find('#sensor-boxContent').css("color", "Black");
      } else {
        this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3");
        this.$element.find('#sensor-boxContent').css("color", "Black");
      }

  }

  renderDetails() {                          // METODA pro vykreslení HTML boxíku
    var uniqueContent = `
    <div id="sensor-module-alarm" class="text-center">
        <div id="sensor-alarm-stav">
        <h1>
          <i style="font-size:2rem; color:"Black" class="pekneIkony">&#xf071;</i>
          <br>
          <p id="sensor-name"></p>
          <span id="sensor-time"></span>
          </h1>
        </div>
        <div >

        </div>
   </div>
    `;

    super.renderDetails("col-12 col-sm-12 col-md-12 col.xl-12");
    // zavola parent render metodu a vygeneruje container
    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah


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

    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
      this.renderDetails();
    });

  }
}

class Camera extends Stone {     //subTřída pro Kameru  - zobrazení i update

  update(deviceItem) {                // METODA pro aktualizaci - update obsahu
    var newUrl = "";
    this.deviceItem = deviceItem;

    this.$element.find('#sensor-boxContent').css("color", "Black ");
    this.$element.find('#sensor-boxContent').css("background-color", "#F3F3F3");
    this.$element.find("#sensor-name").html(deviceItem.webname);
    this.$element.find("#sensor-time").html(deviceItem.lrespiot);
    var d = new Date();
    newUrl = deviceItem.subtype + "?" + d.getTime();
    this.$element.find("#sensor-kamera-url").attr("src",newUrl);

  }

  renderDetails() {                          // METODA pro vykreslení HTML boxíku
    var uniqueContent = `
    <div class = "boxContent">
        <span id="sensor-name" class="text-center">Severní pól</span>
        <span> | </span>
        <i id="sensor-time">25:61</i>
    </div>
    <div id="sensor-module-kamera" class="kameraBox kamera-value">
        <div class="cam-value ">
          <img id="sensor-kamera-url" style="width:100%" src="images/image.jpg" alt="haha" class="img-fluid">
        </div>
    </div>

    `;

    super.renderDetails("col-12 col-sm-12 col-md-12 col.xl-12");

    // zavola parent render metodu a vygeneruje container
    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

    //a roztáhne kameru na celou obrazovku
    this.$element.find('.boxContent').addClass("boxContent-camera");
    this.$element.find('.boxContent').removeClass("boxContent");


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


    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
      this.renderDetails();
    });

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

  renderDetails() {                          // METODA pro vykreslení HTML boxíku
    var uniqueContent = `
    <div id="sensor-module-voda" class="text-center">
        <h1>
            <span id="sensor-voda-numb">-99</span>
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

    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
      this.renderDetails();
    });

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
      this.$element.find("#sensor-brana-numb").html(tempVal + " %");
      this.$element.find('#sensor-boxContent').css("background-color", "GoldenRod");
    }
  }


  renderDetails() {                          // METODA pro vykreslení HTML boxíku
    var uniqueContent = `
    <div id="sensor-module-brana" class="text-center">
        <h1>
            <span id="sensor-brana-numb">-99</span>
            <br>
            <p id="sensor-name">Severní pól</p>
        </h1>
    </div>

    <div class="text-center">
      <button type="button" id="sensor-brana-but1" class="btn btn-danger">Otevřít</button>
      <button type="button" id="sensor-brana-but2" class="btn btn-success">Branka</button>
      <button type="button" id="sensor-brana-but3" class="btn btn-dark">PULS</button>
      <button type="button" id="sensor-brana-but4" class="btn btn-dark disabled">
      <i style=" color:"Black" class="pekneIkony">&#xf023;</i></button>
    </div>
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;

    super.renderDetails("col-12 col-sm-12 col-md-12 col.xl-12");
    // zavola parent render metodu a vygeneruje container
    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

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

    <!--
        <div class="btn-group btn-group-justified">
          <a id="sensor-brana-but1" class="btn ">Otevřít</a>
          <a id="sensor-brana-but2" class="btn ">Branka</a>
          <a id="sensor-brana-but3" class="btn ">PULS</a>
        </div>
    -->
    <div>
        <p id="sensor-error">error time</p>
    </div>
    `;


    // super.render(GRID_GATE); //bříve - když byla tlačítka
    super.render(GRID_SM);
    // zavola parent render metodu a vygeneruje container

    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

    this.$element.find('.boxContent').addClass("boxContent-gate");
    this.$element.find('.boxContent').removeClass("boxContent");

    // //CLICK: ošetření klikání na tlačítko
    // this.$element.find('#sensor-brana-but1').click(() => {
    //   console.log("ID kliku je: ",this.getId());
    //   odeslatPUT(this.getId(), DMbranaT1); //odeslatPUT
    //   alert("Odeslán PUT 1 na sensor " + this.getId());
    //   Arduino.containerUpdate();  //refresh obrazovky
    // });
    //
    // this.$element.find('#sensor-brana-but2').click(() => {
    //   console.log("ID kliku je: ",this.getId());
    //   odeslatPUT(this.getId(), DMbranaT2); //odeslatPUT
    //   alert("Odeslán PUT 2 na sensor " + this.getId());
    //   Arduino.containerUpdate();  //refresh obrazovky
    // });
    //
    // this.$element.find('#sensor-brana-but3').click(() => {
    //   console.log("ID kliku je: ",this.getId());
    //   odeslatPUT(this.getId(), DMbranaT3); //odeslatPUT
    //   alert("Odeslán PUT 3 na sensor " + this.getId());
    //   Arduino.containerUpdate();  //refresh obrazovky
    // });



    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
      this.renderDetails();
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


  renderDetails() {                          // METODA pro vykreslení HTML boxíku

    var uniqueContent = `
    <div id="sensor-module-pocasi" class="pocasi-value text-center">
      <div class="cam-value ">
        <img id="sensor-pocasi-url" style="width:90%" src="images/image.jpg" alt="pocasi" class="img-responsive">
      </div>
    </div>
    `;

    super.renderDetails("col-12 col-sm-12 col-md-12 col.xl-12");
    // zavola parent render metodu a vygeneruje container
    this.$element.find('.boxContent').html(uniqueContent);
    // najde ve wrap boxu  boxCOntent a zmeni mu obsah

    //a roztáhne kameru na celou obrazovku
    this.$element.find('.boxContent').addClass("boxContent-camera");
    this.$element.find('.boxContent').removeClass("boxContent");

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

    //testování zobrazení detailu STONE
    //CLICK: ošetření klikání na Stone se přenese do detailu
    this.$element.click(() => {
      this.renderDetails();
    });

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




//hodí se
//smaže boxík
//$("#sensor-" + sensorID + "-boxWrap").empty();
//odstraní boxík
//  $("#sensor-" + sensorID + "-boxWrap").remove();
