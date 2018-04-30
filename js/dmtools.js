// ********
// Doomaster pomocné nástroje
// ********


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

  // var x = document.getElementById("audioAlarm");
  // x.play();

    //k dispozico jsou
    // alarm.mp3 - ale dlouhé
    // beep.mp3 - fajn
    // voice.mp3 -  fajn
    //v index.HTML k nastaveni

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

function deleteCookie(cname) {
  //implementace smazání Cookie při kliknutí na ServerTime, v dolním menu
    document.cookie = cname + "=;" + " expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // document.cookie = cname + "=;" + " expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function checkCookie() {
    var user = getCookie("username");
    // console.log("user " + user);
    if (user != "") {
        // alert("Welcome again " +s user);
    } else {
       user = prompt("Tvuj otisks:","");
       if (user == "") {
         //pokud uživatel nic nezadá, nastavi se user na uvedenou hodnotu
         user = `pruzina`;
       }
       if (user != "" && user != null) {
       // if ( user != null) {
           setCookie("username", user, 60); //expirace za 30 dní
       }

    }
    return user;
}





//hodí se
//smaže boxík
//$("#sensor-" + sensorID + "-boxWrap").empty();
//odstraní boxík
//  $("#sensor-" + sensorID + "-boxWrap").remove();
