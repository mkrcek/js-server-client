package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"bytes"
	"strings"

	"regexp"
	"strconv"
	"time"
)

type DeviceSetup struct {				//for JSON
	DevId		int 	`json:"devId"`
	DevType		string 	`json:"devType"`
	DevTime   	string 	`json:"devTime"`
	DevTemp  	int 	`json:"devTemp"`
	DevLight 	int 	`json:"devLight"`
	DevAlarm 	bool 	`json:"devAlarm"`
	DevWater	int 	`json:"devWater"`
	DevPosition int 	`json:"devPosition"`	//dveře//
	DevCamIP	string 	`json:"devCamIP"`
	DevName 	string 	`json:"devName"`

}


func main() {

	fmt.Println("starujem")

	http.HandleFunc("/temperatures/", HandleTimer)
	http.HandleFunc("/select/", HandleAll)

	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("."))))

	http.ListenAndServe(":1818", nil)
}


func IndexApi(w http.ResponseWriter, r *http.Request) {

	numberOfRows := 12

	myHomeDeviceSetup := make([]DeviceSetup, numberOfRows)

	//kopírování obsahu z SQL do pole
	for i:=0;i<numberOfRows ;i++  {
		t := time.Now()
		myHomeDeviceSetup[i]=DeviceSetup{
			DevId:      12345678900+i,
			DevType:	"Typ_AK4"+strconv.Itoa(i),
			DevTime:    t.Format("2006-01-02 15:04:05"),
			DevTemp:  	t.Second()+i-30,
			DevLight:	t.Second()/10,
			DevAlarm:	t.Second()%2 == 0,
			DevWater:	time.Now().Second()*100/60,
			DevPosition: time.Now().Second()*100/60,
			DevCamIP:	"http://192.168.0.40/jpg/image.jpg",
			DevName:  	"bouda " + strconv.Itoa(i),
		}
	}
	fmt.Println(myHomeDeviceSetup)
	b, err := json.Marshal(myHomeDeviceSetup)
	if err != nil {
		fmt.Println("error:", err)
	}
	fmt.Println(bytes.NewBuffer(b)) //vypis co se nakopírovalo

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

func ShowApi(w http.ResponseWriter, r *http.Request, rowNumber int) {

	myDeviceSetup := DeviceSetup{}

	myDeviceSetup = DeviceSetup{
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


func HandleAll(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		IndexApi(w,r)
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


func HandleTimer(w http.ResponseWriter, r *http.Request) {
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
			ShowApi(w,r,ulrDeviceID )
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