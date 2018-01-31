package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"math/rand"
	"strings"
	"regexp"
	"strconv"
	"time"
)

type DeviceSetup struct {//for JSON
	DevSerTime	string 	`json:"devSerTime"`
	DevId		int 	`json:"devId"`
	DevOrder	int		`json:"devOrder"`			//** pořadí 1-31//
	DevPriority	int		`json:"devPriority"`		//** priorita 1-31//
	DevType		string 	`json:"devType"`
	DevTime   	string 	`json:"devTime"`
	DevTemp  	int 	`json:"devTemp"`
	DevLight 	int 	`json:"devLight"`
	DevAlarm 	bool 	`json:"devAlarm"`
	DevWater	int 	`json:"devWater"`
	DevPosition int 	`json:"devPosition"`	//dveře//
	DevCamIP	string 	`json:"devCamIP"`
	DevName 	string 	`json:"devName"`
	DevWeather	string 	`json:"devWeatherIP"`

}

var hodnotaPut = DeviceSetup{				//testovaci
	DevId:      1000001,
	DevTime:  	time.Now().Format("2006-01-02 15:04:05"),
	DevName:  	"testovacka",
	DevAlarm:  false,
	}

var numberOfRows = 13                                     //pocet zarizeni
var myHomeDeviceSetup = make([]DeviceSetup, numberOfRows) //alokuje tabulku s hodnotama


func main() {

	fmt.Println("starujem")
	setupHomeDeviceData ()		//naplní vzorova data

	http.HandleFunc("select/devices/temperatures/", HandleTest) //testovaci



	//http.HandleFunc("/select/hodnota/", HandleItem) //uprava dat z webu

	http.HandleFunc("/select/devices/", HandleAllData)      //vrati vsechna data - nebo jen položku za lomítkem

	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("."))))		//webserver pro localhost

	http.ListenAndServe(":1818", nil)
}



func setupHomeDeviceData() { //vytvori prvni obsah - prvni vzorova data

	for i := 0; i < numberOfRows; i++ {
		t := time.Now()
		myHomeDeviceSetup[i] = DeviceSetup{
			DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       12345678900 + i,
			DevOrder:    rand.Intn(numberOfRows+100), //****1-31
			DevPriority: 0,                       //****1-31
			DevType:     "teplota",
			DevTime:     t.Format("2006-01-02 15:04:05"),
			DevTemp:     t.Second() + i - 30,
			DevLight:    t.Second() / 10,
			DevAlarm:    t.Second()%2 == 0,
			DevWater:    time.Now().Second() * 100 / 60,
			DevPosition: time.Now().Second() * 100 / 60,
			DevCamIP:    "http://192.168.0.26/jpg/image.jpg",
			DevName:     "bouda " + strconv.Itoa(i),
			DevWeather:  "http://http://meteosluzby.e-pocasi.cz/pocasi/5a65b64cd7fc8.png",
		}
	}
	myHomeDeviceSetup[0].DevType = "teplota"
	myHomeDeviceSetup[1].DevType = "svetlo"
	myHomeDeviceSetup[2].DevType = "brana"
	myHomeDeviceSetup[3].DevType = "voda"
	myHomeDeviceSetup[4].DevType = "alarm"
	myHomeDeviceSetup[5].DevType = "pocasi"
	myHomeDeviceSetup[6].DevType = "kamera"
	myHomeDeviceSetup[7].DevType = "kamera"
	myHomeDeviceSetup[8].DevType = "voda"
	myHomeDeviceSetup[9].DevType = "teplota"
	myHomeDeviceSetup[10].DevType = "svetlo"
	myHomeDeviceSetup[11].DevType = "voda"

	myHomeDeviceSetup[6].DevCamIP = "http://192.168.0.19/jpg/image.jpg"
	//myHomeDeviceSetup[6].DevCamIP = "http://10.66.1.85/jpg/image.jpg"
	myHomeDeviceSetup[9].DevCamIP = "http://192.168.0.40/jpg/image.jpg"
	myHomeDeviceSetup[7].DevCamIP = "http://192.168.0.26/jpg/image.jpg"


	fmt.Println(myHomeDeviceSetup)
}

func ApiGetAll(w http.ResponseWriter, r *http.Request) {

	//upraví  "tabulku" a odpoví na Get

	for i:=0;i<numberOfRows ;i++  {
		t := time.Now()
		myHomeDeviceSetup[i].DevSerTime = t.Format("2006-01-02 15:04:05")
		myHomeDeviceSetup[i].DevTime = t.Format("15:04:05")

		myHomeDeviceSetup[i].DevTemp = t.Second()+i-30
		myHomeDeviceSetup[i].DevLight =	t.Second()/10
		myHomeDeviceSetup[i].DevAlarm =	t.Second()%2 == 0
		myHomeDeviceSetup[i].DevWater =	time.Now().Second()*100/60
		myHomeDeviceSetup[i].DevPosition = time.Now().Second()*100/60
		myHomeDeviceSetup[i].DevWeather = "http://meteosluzby.e-pocasi.cz/pocasi/5a65b64cd7fc8.png"
	}



	//připraví data na JSON
	b, err := json.Marshal(myHomeDeviceSetup)
	if err != nil {
		fmt.Println("error:", err)
	}

	//úprava hlavičky
	//w.Header().Set("Content-Length", "0") - POZOR DELKA NEMUZE BYT NULA
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")

	//uprava těla - vrátí do HTTP GET
	w.Write(b)

}

func ShowApiTest(w http.ResponseWriter, r *http.Request, rowNumber int) {

	myDeviceSetup := DeviceSetup{}

	var t = time.Now()
	myDeviceSetup = DeviceSetup{
		DevSerTime: (t.Format(time.Kitchen)),
		DevId:      12345678901,
		DevTime:    "19:00",
		DevTemp:  	time.Now().Second(),
		DevName:  	"bouda",
	}

	b, err := json.Marshal(myDeviceSetup)
	if err != nil {
		fmt.Println("error:", err)
	}

	//úprava hlavičky
	//w.Header().Set("Content-Length", "0") - POZOR DELKA NEMUZE BYT NULA
	w.Header().Set("Connection", "keep-alive")
	//nově:
	w.Header().Set("Content-Type", "application/json") //

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")

	//uprava těla - vrátí do HTTP GET
	w.Write(b)

	fmt.Println("***************")


}


func HandleAllData(w http.ResponseWriter, r *http.Request) { //vrati vsechna data - celou tabulku

	//nalezení, jeslti je zvolený nějaký konkrétní řádek /zázmam = ID (číslo)
	//...číslo za lomítkem, např./devices/21293 = 21293
	myURL := r.RequestURI                           // req.URL vs req.RequestURI		"/devices/21293"



	re := regexp.MustCompile("[0-9]+")              //vyfiltruje všechna čísla = 21293

	ulrDeviceIDs := re.FindAllString(myURL, 1)      //vybere jen první sekvenci číslic = 21293
	if (ulrDeviceIDs == nil) {			//GET ALL pokud číslo neni - je tedy jen lomitko bez parametru

		fmt.Println("GET ALL")


		switch r.Method {
		case "GET":
			ApiGetAll(w,r)
		case "OPTIONS":
			HandleOptionsCORS(w,r)
		case "POST":
			fmt.Println("POST ")
		case "PUT":
			fmt.Println("PUT ")
		case "DELETE":
			fmt.Println("DELETE ")
		}

	} else {							//GET ITEM obsahuje cislo za parametrem

		fmt.Print("parametr  ")
		fmt.Println(ulrDeviceIDs)

		ulrDeviceIDstr := strings.Join(ulrDeviceIDs,"") //převede type []string” to string
		itemID, _ := strconv.Atoi(ulrDeviceIDstr)       //převede na číslo

		fmt.Print("parametr za lomítkem ")
		fmt.Println(itemID)


		switch r.Method {
		case "GET":
			ApiGetItem(w ,r ,itemID)
		case "OPTIONS":
			HandleOptionsCORS(w,r)
		case "POST":
			fmt.Println("POST ")
		case "PUT":
			ApiPutIdem(w, r, itemID)
		case "DELETE":
			fmt.Println("DELETE ")
		}


	}






}


func HandleTest(w http.ResponseWriter, r *http.Request) {

	//dodělat

	//pro demo JS - každou chvilku aktualizujej proměné

	//nalezení, jeslti je zvolený nějaký konkrétní řádek /zázmam = ID (číslo)
	//...číslo za lomítkem, např./devices/21293 = 21293
	myURL := r.RequestURI        // req.URL vs req.RequestURI		"/devices/21293"
	re := regexp.MustCompile("[0-9]+")		//vyfiltruje všechna čísla = 21293
	ulrDeviceIDs := re.FindAllString(myURL, 1)	//vybere jen první sekvenci číslic = 21293
	ulrDeviceIDstr := strings.Join(ulrDeviceIDs,"")			//převede type []string” to string
	ulrDeviceID, _ := strconv.Atoi(ulrDeviceIDstr)			//převede na číslo

switch r.Method {
	case "GET":
			ShowApiTest(w,r,ulrDeviceID )
	case "OPTIONS":
		fmt.Println("OPTIONS ")
	case "POST":
		fmt.Println("POST ")
	case "PUT":
		fmt.Println("PUT ")
	case "DELETE":
		fmt.Println("DELETE ")
	}
}


func HandleItem(w http.ResponseWriter, r *http.Request) {

	//nalezení, jeslti je zvolený nějaký konkrétní řádek /zázmam = ID (číslo)
	//...číslo za lomítkem, např./devices/21293 = 21293
	myURL := r.RequestURI                           // req.URL vs req.RequestURI		"/devices/21293"
	re := regexp.MustCompile("[0-9]+")              //vyfiltruje všechna čísla = 21293
	ulrDeviceIDs := re.FindAllString(myURL, 1)      //vybere jen první sekvenci číslic = 21293
	ulrDeviceIDstr := strings.Join(ulrDeviceIDs,"") //převede type []string” to string
	itemID, _ := strconv.Atoi(ulrDeviceIDstr)       //převede na číslo

	fmt.Print("parametr za lomítkem ")
	fmt.Println(itemID)

	switch r.Method {
	case "GET":
		ApiGetItem(w ,r ,itemID)
	case "OPTIONS":
		HandleOptionsCORS(w,r)
	case "POST":
		fmt.Println("POST ")
	case "PUT":
		ApiPutIdem(w, r, itemID)
	case "DELETE":
		fmt.Println("DELETE ")
	}

	// není vyřešeno, když itemID je mimo zozsah nebo není vubec

}

func ApiPutIdem(w http.ResponseWriter, r *http.Request, itemID int) {


	lenBody := r.ContentLength
	body := make([]byte, lenBody)
	r.Body.Read(body)
	var post DeviceSetup
	json.Unmarshal(body,&post)

	fmt.Print("novy nazev: ")
	fmt.Println(post.DevName)
	//aktualizace položky v "tabulce"

	myHomeDeviceSetup[itemID].DevTime = time.Now().Format("2006-01-02 15:04:05")
	if (post.DevName != "") {
		myHomeDeviceSetup[itemID].DevName = post.DevName
	}  //jinak se zachová se puvodní název
	myHomeDeviceSetup[itemID].DevLight = post.DevLight


	//úprava hlavičky
	//w.Header().Set("Content-Length", "0") - POZOR DELKA NEMUZE BYT NULA
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")

	//zpráva do těla
	w.Write([]byte("OK UPDATED"))

	fmt.Println("***************")
	fmt.Println("Update   : ", myHomeDeviceSetup[itemID])
	fmt.Println("***************")

}

func UpdateHodnota_old(w http.ResponseWriter, r *http.Request) {


	lenBody := r.ContentLength
	body := make([]byte, lenBody)
	r.Body.Read(body)
	var post DeviceSetup
	json.Unmarshal(body,&post)

	hodnotaPut.DevTime = time.Now().Format("2006-01-02 15:04:05")
	hodnotaPut.DevName = post.DevName
	hodnotaPut.DevLight = post.DevLight


	//úprava hlavičky
	//w.Header().Set("Content-Length", "0") - POZOR DELKA NEMUZE BYT NULA
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")

	//zpráva do těla
	w.Write([]byte("OK UPDATED"))

	fmt.Println("***************")
	fmt.Println("Update   : ", hodnotaPut)
	fmt.Println("***************")

}


func ApiGetItem(w http.ResponseWriter, r *http.Request, itemID int) {

	var DataToAPi = myHomeDeviceSetup[itemID]


	b, err := json.Marshal(DataToAPi)
	if err != nil {
		fmt.Println("error:", err)
	}
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Content-Type", "application/json") //
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")

	//uprava těla - vrátí do HTTP GET
	w.Write(b)

	fmt.Println("*******GET HODNOTA********")
	fmt.Println(DataToAPi)


}


func HandleOptionsCORS(w http.ResponseWriter, req *http.Request) {
	//odpověď na volání, pokud by se místo POST klient ptal na OPTIONS
	//tato varianta je pro CORS - https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

	fmt.Println("OPTIONS ")

	w.Header().Set("Content-Length", "0")
	w.Header().Set("Connection", "keep-alive")
	//rw.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080/device")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	w.Header().Set("Access-Control-Max-Age", "86400")
	w.WriteHeader(200)
	return
}