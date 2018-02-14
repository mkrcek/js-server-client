package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	//"math/rand"
	"strings"
	"regexp"
	"strconv"
	"time"
)

type DeviceSetup struct {//for JSON
	//DevSerTime	string 	`json:"devSerTime"`

	DevId		int 	`json:"unid"`		//OK
	DevOrder	int		`json:"weborder"`	//OK
	DevPriority	int		`json:"priority"`	//OK
	DevType		string 	`json:"webtype"`	//OK
	Subtype		string 	`json:"subtype"`	//OK
	DevTime   	string 	`json:"lrespiot"`	//OK
	Value 		string		`json:"value"`		//OK
	DevName 	string 	`json:"webname"`	//OK
	InVisible		int		`json:"invisible"`

	//zrušeno:
		// devTemp = value
		// devWater = value
		// devLight = value
		// devAlarm = value
		// devPosition = value
		//devCamIP = subtype
		//devWeatherIP = subtype
	//
}

var hodnotaPut = DeviceSetup{				//testovaci
	DevId:      1000001,
	DevTime:  	time.Now().Format("2006-01-02 15:04:05"),
	DevName:  	"testovacka",
	}

var numberOfRows = 11                                     //pocet zarizeni
var myHomeDeviceSetup = make([]DeviceSetup, numberOfRows) //alokuje tabulku s hodnotama


func main() {

	fmt.Println("starujem")
	setupHomeDeviceData ()		//naplní vzorova data

	http.HandleFunc("select/devices/temperatures/", HandleTest) //testovaci



	//http.HandleFunc("/select/hodnota/", HandleItem) //uprava dat z webu

	http.HandleFunc("/doomaster/sensors/", HandleAllData)      //vrati vsechna data - nebo jen položku za lomítkem

	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("."))))		//webserver pro localhost

	http.ListenAndServe(":1818", nil)
}



func setupHomeDeviceData() { //vytvori prvni obsah - prvni vzorova data
	t := time.Now()

	//teplota zahrada
	 	myHomeDeviceSetup[0] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       5678900,
			DevOrder:    0, // generování néhodného čísla pořadí : rand.Intn(numberOfRows+100),
			DevPriority: 0,                       //****1/31
			DevType:     "1",	//teplota
			Subtype:	 "1",   // vzduch
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:     	 strconv.Itoa(t.Second() - 30),
			DevName:     "0 - Zahradní teploměr",
			InVisible:	0,
		}

	//voda
		myHomeDeviceSetup[1] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       678901,
			DevOrder:    4,
			DevPriority: 0,                       //****1/31
			DevType:     "5",	//voda
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       strconv.Itoa(time.Now().Second() * 100 / 60),
			DevName:     "1 - bazén",
			InVisible:	0,
		}

	//svetlo
		myHomeDeviceSetup[2] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       78902,
			DevOrder:    5,
			DevPriority: 0,                       //****1/31
			DevType:     "6", //světlo
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "0",
			DevName:     "2 - Vanocni stromek",
			InVisible:	0,
		}
	//alarm
		myHomeDeviceSetup[3] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       678903,
			DevOrder:    6,
			DevPriority: 0,                       //****1/31
			DevType:     "3",	//alarm - PIR
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "0",
			DevName:     "3 - Pohyb zahrada",
			InVisible:	0,
		}
	//brana
		myHomeDeviceSetup[4] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       678904,
			DevOrder:    11,
			DevPriority: 0,                       //****1/31
			DevType:     "7",	//brána
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "44",
			DevName:     "4 - Brána",
			InVisible:	0,
		}
	//kamera
		myHomeDeviceSetup[5] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       678905,
			DevOrder:    8,
			DevPriority: 0,                       //****1/31
			DevType:     "2",	//kamera - ne počasí
			Subtype:	 "http://192.168.0.26/jpg/image.jpg",
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "0",
			DevName:     "5 - Kamera Terasa",
			InVisible:	0,
		}

	//kamera 2
		myHomeDeviceSetup[6] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       78906,
			DevOrder:    9,
			DevPriority: 0,                       //****1/31
			DevType:     "2",	//kamera - ne počasí
			Subtype:	 "http://192.168.0.19/jpg/image.jpg",
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "0",
			DevName:     "6 - Kamera strom",
			InVisible:	0,
		}

	//pocasi
		myHomeDeviceSetup[7] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       78907,
			DevOrder:    10,
			DevPriority: 0,                       //****1/31
			DevType:     "8",		//počasí - ne kamera
			Subtype:	 "http://meteosluzby.e-pocasi.cz/pocasi/5a65b64cd7fc8.png",
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:       "0",
			DevName:     "7 - Počasí",
			InVisible:	0,
		}

	//teplota zahrada2
		myHomeDeviceSetup[8] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       67898,
			DevOrder:    1,
			DevPriority: 0,                       //****1/31
			DevType:     "1", //teplota
			Subtype:	 "3",   // bazen
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:     	 strconv.Itoa(t.Second() - 10),
			DevName:     "8 - Bazén 2",
			InVisible:	0,
		}

	//teplota zahrada3
		myHomeDeviceSetup[9] = DeviceSetup{
			//DevSerTime:  t.Format("2006-01-02 15:04:05"),
			DevId:       78909,
			DevOrder:    2,
			DevPriority: 0,                       //****1/31
			DevType:     "1",	//teplota
			Subtype:	 "2",   // kotel
			DevTime:     t.Format("2006-01-02 15:04:05"),
			Value:     	 strconv.Itoa(t.Second() + 40),
			DevName:     "9 - KOTEL 3",
			InVisible:	0,
		}

	//systémový čas
	myHomeDeviceSetup[10] = DeviceSetup{
		//DevSerTime:  t.Format("2006-01-02 15:04:05"),
		DevId:       0,
		DevOrder:    0,
		DevType:     "-1",	//systémovy čas
		Value:     	 t.Format("2006-01-02 15:04:05"),
	}


//	fmt.Println(myHomeDeviceSetup)


}

func ApiGetAll(w http.ResponseWriter, r *http.Request) {

	//upraví  "tabulku" a odpoví na Get
	t := time.Now()

	//systémový čas
	myHomeDeviceSetup[10].Value = t.Format("15:04:05")

	for i:=0;i<numberOfRows ;i++  {

		//myHomeDeviceSetup[i].DevSerTime = t.Format("2006-01-02 15:04:05")
		myHomeDeviceSetup[i].DevTime = t.Format("15:04:05")

		switch myHomeDeviceSetup[i].DevType {
		case "1":	//teplota
			myHomeDeviceSetup[i].Value = strconv.Itoa(t.Second() + i - 30)
		case "5":	//voda
			myHomeDeviceSetup[i].Value = strconv.Itoa(time.Now().Second() * 100 / 60)
		case "svetlo":
			myHomeDeviceSetup[i].Value = strconv.Itoa(t.Second() / 10)
		case "alarm":
			myHomeDeviceSetup[i].Value = strconv.Itoa(t.Second()%2)
		case "brana":
			myHomeDeviceSetup[i].Value = strconv.Itoa(time.Now().Second() * 100 / 60)
		}

	}


	//zobrazí json
	//**********************
	//fmt.Println(myHomeDeviceSetup)
	//**********************

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

	//var t = time.Now()
	myDeviceSetup = DeviceSetup{
		//DevSerTime: (t.Format(time.Kitchen)),
		DevId:      78901,
		DevTime:    "19:00",
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
	myHomeDeviceSetup[itemID].Value = post.Value


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