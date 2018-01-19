window.Arduino = {};
window.onload = function() {
  Arduino.axios = axios.create({
    //baseURL: 'http://192.168.0.25:1818/select/devices/',
    baseURL: 'http://localhost:1818/select/devices/',
    timeout: 100000
  });


  Arduino.initNewDeviceDetail();
  Arduino.showDeviceDetail();

for (var i = 0; i < 2; i++) {
  Arduino.changeDeviceDetail(i);
}
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
  Arduino.axios.get('/all/')
  .then(function (response) {
    var device = response.data;
    console.log(device);

    //getElementById je prej rychlejši
    //1.prvni TEPLOTA
    document.getElementById("devId0").innerHTML = device[0].devId;
    document.getElementById("devTemp0").innerHTML = device[0].devTemp;
    document.getElementById("devName0").innerHTML = device[0].devName;
    document.getElementById("devTime0").innerHTML = device[0].devTime;

    //2.prvni TEPLOTA 2
      document.getElementById("devId1").innerHTML = device[1].devId;
    document.getElementById("devTemp1").innerHTML = device[1].devTemp;
    document.getElementById("devName1").innerHTML = device[1].devName;
    document.getElementById("devTime1").innerHTML = device[1].devTime;

    //3.prvni VODA
    document.getElementById("devId2").innerHTML = device[2].devId;
    document.getElementById("devWaterLevel").innerHTML = device[2].devWater;
    document.getElementById("devName2").innerHTML = device[2].devName;
    document.getElementById("devTime2").innerHTML = device[2].devTime;
    if (device[2].devWater > 40){
      document.getElementById("vodaLevelBar").className = "progress-bar progress-bar-striped active progress-bar-success";
    } else {
      document.getElementById("vodaLevelBar").className = "progress-bar progress-bar-striped active progress-bar-danger"
    }
    document.getElementById("vodaLevelBar").style.height = device[2].devWater+"%";
    document.getElementById("vodaLevelNumb").innerHTML = device[2].devWater+" %";

    //4.prvni VODA 2
    document.getElementById("devId3").innerHTML = device[3].devId;
    document.getElementById("vodaLevel2").innerHTML = device[3].devWater;
    document.getElementById("devName3").innerHTML = device[3].devName;
    document.getElementById("devTime3").innerHTML = device[3].devTime;
    if (device[3].devWater > 60){
      document.getElementById("vodaLevelBar2").className = "progress-bar progress-bar-striped active progress-bar-danger";
    } else {
      document.getElementById("vodaLevelBar2").className = "progress-bar progress-bar-striped active progress-bar-success"
    }
    document.getElementById("vodaLevelBar2").style.height = device[3].devWater+"%";
    document.getElementById("vodaLevelNumb2").innerHTML = device[3].devWater+" %";

    //5.prvni SVETLO
    document.getElementById("devId4").innerHTML = device[4].devId;
    document.getElementById("devName4").innerHTML = device[4].devName;
    document.getElementById("devTime4").innerHTML = device[4].devTime;
    switch (device[4].devLight) {
      case 0:
          document.getElementById("svetloLevelIcon").className = "fa fa-lightbulb-o fa-5x";
          break;
      case 1:
          document.getElementById("svetloLevelIcon").className = "fa fa-lightbulb-o fa-5x text-warning";
          break;
      case 2:
            document.getElementById("svetloLevelIcon").className = "fa fa-lightbulb-o fa-5x text-primary";
            break;
      case 3:
          document.getElementById("svetloLevelIcon").className = "fa fa-lightbulb-o fa-5x text-success";
          break;
      default:
          document.getElementById("svetloLevelIcon").className = "fa fa-lightbulb-o fa-5x text-danger";
    }


    //6.prvni Svetlo
    document.getElementById("devId5").innerHTML = device[5].devId;
    document.getElementById("devName5").innerHTML = device[5].devName;
    document.getElementById("devTime5").innerHTML = device[5].devTime;
    if (device[5].devLight < 3){
      document.getElementById("svetloLevelIcon2").className = "fa fa-lightbulb-o fa-5x";
    } else {
      document.getElementById("svetloLevelIcon2").className = "fa fa-lightbulb-o fa-5x text-warning"
    }


    //1.druhy Alarma
    document.getElementById("devId6").innerHTML = device[6].devId;
    document.getElementById("devName6").innerHTML = device[6].devName;
    document.getElementById("devTime6").innerHTML = device[6].devTime;

    if (device[6].devAlarm){
      document.getElementById("alarmLevelIcon").className = "fa fa-exclamation-triangle fa-5x text-danger";
    } else {
      document.getElementById("alarmLevelIcon").className = "fa fa-exclamation-triangle fa-5x";
    }

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
