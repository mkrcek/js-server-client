# Doomaster: CLASS Easter 2018


----------

## Co nového ve verzi

## 3.4.

News

- Kompletní přepsání LivingStones -–> do Class Stone
- CSS: Zalamování textu na obrazovce v boxíkách, .... když by přetéká přes prvek

- Detail ANO u některých Stones (Temperature, PIR, Camera, Gate, Water, Weather)
- Detail NE u (Light, CameraAlarm, EmptyBox)
- GATE: změnšení ikony + Ovládání je v detailu

Oprava

- PIR čidlo: když je value !=0 ....> tak se boxík obarví na barvu "Tomato"



## 30/3/

Přepsání na class

- Vzniká oddělená větev class_refaktring.
- V ní se pokouším přepsat livingstone na třídy. Původní funkční kod je ve větvi "master"

## 25.3.

Audio testování
- při výpadku čidla nebo odpojední od serveru se spustí audio-hláška.
- funguje pak na všech zařízeních, i v záložkách a na vypnutém iPadu.
- cílem je otestovat příjemnost nebo nepříjemnost audio komentáře.

## 23.3.

- promazání a aktualizace adresáře VZORY

## 22.3. : demoday

NEW
- cookie
- při prvním pozužití se zepná na jméno (cookies)
- toto jméno se pak posílá při každém GET nebo PUT v URL, třeba takto: za otazníkem GET 192.168.0.11/?pepazdepa
- session: prohlížeč drží jméno 30 dní, pak se optá znovu

OPRAVA
- odstranění chyby při výpadku čidla: sensorErrorColorsOn
- úpravy pro AwesomeFonts

TODO:
- AwesomeFonts rozhodnout se, jak používat a stáhnout knihovnu lokálně)


## 20.3. 22:30

- hrádky s velikostí boxíků pro různá rozlišení
- odstranění slovo Alarm z menu
- větší písmo u alarmové hlášky

iPAD iOS 9.x
- funguje na malém iPadu s iOS 9.3.5

UPDATE souborů
- soubory pro offline: axiom, jquery, bootstrap
- ikony jako SVG soubory (offline)  
- uklizeno index.html

OPRAVA
- Průhledné pozadí Error rámečku LivingSones - při aktivaci NetworkError je vidět červená barva  


## 19.3. 22:22

- Oprava zobrazení Neděle - místo "Fakt netuším"
- zobrazení stavu ErrorSensor v LivingStonu
- rychlejší start: Okamžitě po vykreslení jednoho HTML LivingStone se aktuslizuje jeho obsah. Teptve poté se kreslí další
- unid se nepřevádí na number(int) - nechává se jako string

Menu
- nové menu boxíky (MenuStone.Home, .Zvonecek, .ServerTime  + bonusový .Email)
- vykreslují se současně s LivingStones
- nová menu aktualizace (MenuStoneUpdate.xxxx)
- aktualizují se současně s LivingStones
- kliknutím na menu se odešle POST s Value="1" a ID=10101/10102/10103/10104
- kliknutím na HOME se provede refresh obrazovky // location.reload


## 16.3. 2:15

- Test a demo použití Class na měření času místo globální proměné

- Při výpadků serveru zobrazovat červené pozadí po 5 sekundách
- odstranění poskakování času v menu na menších rozlišeních iPhonu


##14.3.2018 23:50

CameraAlarm
- testování mizení kodu a testovani existence LivingStone na obrazovce (DOM)
- klik a zmizne

##14.3.2018 12:50
-
verze 14.3.
LivingStone: CameraAlarm
- sensorWebType: "4"
- subtype je URL k obrázku: např. "activitylog/image-0.jpg"
- Pokud je Value != "" zobrazi se obrazek a orameckuje. Kdyz Value="", tak jen sedy ramecek
- kliknutím na obrázek se odešle PUT
- parametr je unid: např. 789011014
- v hodnotě PUTu je: value = "DELETE"
- (obdobně jako žárovka)

## 13.3.2018 - 19:29

BETA: zobrazení erroru čidla
- funguje POUZE u livingStonu "Light"
- LivingStoneUpdate.Light: zobrazení chyby + odpočet času + rámeček
- LivingStone.Light:   HTML kod pro zobrazení chyby
- Grafika: k diskuzi: teď černý rámeček

Nová fce: timeCountDown
- vrátí string, ve kterém je rozdíl času oproti jinému času
- Výstup: dlouhý formát => 12 dní 4 hodiny 22 minut 2 sekundy
- Výstup: krátký formát => 292:22:02


## 13.3.2018 - 12:21

- drobná oprava: LivingStone Branka se rozšířil a už nepřetíká

## 13.3.2018 - 12:12

- zobrazování serverového času
- očekávám ve formátu 2006-01-02 15:04:05
- vytiskne: Úterý 13.2. 11:57:15
- ošetření 5s se zobrazí jako 05 (11:12:05)
- kde čas je větším fontem
- ošetřeno i pro iPhone (chybka Safari)

## 13.3.2018 - 10:12

- uprava barevného schematu kotel
- globální konstanty na začátku JS souboru
- oprava (vrácení smazaneho kodu pro kotel po refaktoringu :-())

## 13.3.2018

- refaktoring a prehlednejsi kod
- LivingStone: vizualni stranka boxíku
- LivingStoneUpdate: co a jak se mění po cteni API
- MenuUpdate: co a jak se mění po cteni API (v MENU)

zatim nereseno ani neupravovano. Jedna se o docasny kod
- alercamShow & showAlarmCam

Upravy

- nově pracuji s objekty deviceObjectLast a deviceObject, s klíčem UNID
- připraveno na sledování předešlého stavu
- namísto for cyklu je použit forEach
- místo JS sjednoceno na jQuery (kromě alercamShow & showAlarmCam)

a poprvé použitto "rozvětvení" v  githubu
https://confluence.atlassian.com/bitbucket/use-sourcetree-branches-to-merge-an-update-732268925.html


## 12.3. refaktoringovaá verze

- smazane zbytecne a stare komentace
- nove fce pro HTML boxiky
 LivingStone.Weather
 LivingStone.Water
 ...a tak dale
 - prehlednejsi osetreni kliknuti - primo v definici kontejnerShow


## 9.3.

SVĚTLO:
-  kliknutím na Světlo (webtyp = 6) se odešle PUT na server.
- hodota Value = "1"
- obarvuje se pozadí tlačítka "1"=žluté, "0" = šedé
- ikona žárovky


NetworkError:
- Pokud se nehlásí server, zmení se barva pozadí na rudou


5.3.
DOČASNÁ aktivace Video z alarmu.

Vše je natvrdo - bez ohledu na JSON a jiné aktivity

- v adresari /activitylog jsou obrázky
- jmena souboru:  image-0.jpg .... image-32.jpg
- zobrazí se jako první Livingstone

funkčnost v JS:
- počet obrazku je na řádku:
518: var poziceObrazkuAlertCam = 0;
519: var pocetObratkuAlertCam = 33;

(pokud nechceš funkčnost používat, zakomentovat
  řádek 28:   Arduino.alercamShow();)
  řádek 40:   Arduino.showAlarmCam();


## 2.3. 17:00
- větší písmo v serverovém času
- test ALARM badge (sleduje objekt unid==0, a pokud je hodnota error != "0" ukáže její  hodnotu)

## 2.3.2018
uprava
- počet ikon na řádku je 4.
(testovat lze tak, že v custom.js se změní obsah konstanty GRID_SM = "col-3"; nebo GRID_SM = "col-4";....pro 3 ikony  )
(současně jsem změnil i v style.css velikost H1)

- brána: změna barvy a text stavu podle stavu.

VALUE = O (ZAVŘENO)
VALUE > 0 ( 33% OTEVŘENO)


## 24.2.2018
OPRAVA
po klinuní na bránu se už správně posílá PUT s URL /{unid}
(oprava je to takové dočasné řešení, ale funguje: Ze stringu vyseparuju číslo UNID přávě mezi pomlčkami)

## 24.2.2018
OPRAVA:

(vRVK0lUG): Oprava překrývání obsahu spodním menu.

## 24.2.2018 (00:25)
(dr7A85Gd): Otevírání brány

vrací PUT s hodnotou tlačítka ve value

       .../doomaster/sensors/unid PUT {"value":"3"}

hodnoty value:
1: Otevřít Bránu
2: Otevřít Branku
3: PULS

DESIGN:
- musíme upravit
- po kliknutí tlačítka se zobrazí POPup, po kliknutí na OK je poslán POST.
- pokud je tento senzor jako poslední, bohužel spodní lišta jej přemázne


## 24.2.2018 (00:25)

Úpravy:
(XQGXdlBa): teplota na 1 des. číslo + des. čáska místo tečky
https://trello.com/c/XQGXdlBa

(jPhRf1ok): Zrušení horního menu + server čas na dolní lištu

(3qsWWwTh): zobrazování času jen u Kamer, Alarm

(C8EKpVJb): uprava barev teplot

(DnN2NeIb): Petrohrad změněn na obrázek o velikosti 1x1px

(dJYYk99J): Voda je Procentech. Změny barvy podle hodnoty Subtype. Mění barvu červená / zelená

(dr7A85Gd): Otevírání brány - zatím jen design, bez odeslání PUT

## 23.2.2018

OPRAVY:

1. JSON VALUE:
Hodnota parametru VALUE je převedene ze stringu na číslo, tím je možné ji porovnat i v des.cisle
Implementovano pro webtype:
- Teplota
- Voda
- Svetlo
- Brana

2. Zrušení červeného pozadí u obrázku z kamer a počasí


ÚPRAVY:
Změnšení velikosti fontů v CSS
- H1, p, i

V JS nadefinované konstanty pro webtype


## 2018-2-14

Pěkná verze !!

* nový bootstrap 4
* podpora pro nové API JSON
* grafika & layout

podrobněji:

API
- unid
- webtype
- subtype
- lrespiot
- value
- webname
- weborder

webtype
- 0 = NILL BOX
- 1=Teplota,
- 2=HTTP outDOOM Obrázek, //jen kamera
- 3=PIR,
- 4=PIR obrázek
- 5 = voda
- 6 = svetlo
- 7 = brana
- 8 = počasí

subtype (1 = Teplota)
- "1" = vzduch
- "2" = kotel
- "3" = bazén

Implementace unid:0
- tedy zobrazení systémového času

Implementace nové adresy
- /doomaster/sensors

HTML moduly Templates
- z index.HTML přesunuté do custom.js
- nové pole tmpHtmlBox[] kde pozice je TYP podle API webtype
- vypnuté showAlarmCam, alercamShow (JS)
- v index.HTML vypnute (komentovane) templateAlertcam


bootstrap
- migrace na 4.0 + nové soubory v adresářích !!!
- css3
- jQuery
- fontawesome


Layout
- nový layout podle grafických "boxíků"
- menu horní
- menu spodní (patička)


* chyby:
- stránka má dole patičku - a tak se nezobrazí celá stránka. a počasí je přeplácnuté

### 2018-2-1

Změna API
- Nové API, které obsahuje nové položky, zejmena hodnotu "value", "subtype"
- Pořadí senzorů je dáno proměnou "devOrder"
- příklad noveho JSON v adresari /vzory/vzorova-server-data.json
- další detaily v http://dm105.docs.apiary.io
- v další verzi se sjednotí a učešou názvy

- main.go program generuje a aktualizuje tado data.


Frontend
- Všechny položky (senzory) jsou setříděné podle parametru "devOrder" (dříve podle pořadí v JSON)
- Kamera: v levém rohu fotky zobrazuje čas pořízení snímku

AlarmCam - DEMO
- přidal jsem natvrdo ukázku video alarmu
- nová html šablona: templateAlertcam
- OBR: nova složka pro alarm obrazky: /activitylog/, v ní jsou uloženy obrázky pojmenované image-0.jpg až ... image-32.jpg
- JS vykresluje a aktualizuje nový modul a v něm jsou zobrazené obrazky 0-32
- pohyb pomocí tlačítek "Před" a "Další".

==================================

### 2018-1-28
-------------


Verze obsahuje velké změny v kódu JS. Nově používám vlastní kontejnery pro HTML BOX/senzory, které jsou sestavené v JS.

Druhou funkcí je klikatelný BOX/senzor


## Podrobnosti:


### JSON
 ----------

- nezáleží na pořadí, jen na UNID
```
device[i].devId
```


### HTML
 ----------

Kompletně nová práce s obsahem

- HTML kontejnery pro všechny senzory
. boxScreen: celá obrazovka
. BoxWrap: zabalení senzoru
. BoxContent: detail senzoru , např. teplota

- V INDEX.html je jen template a JS z nich sestavuje stránku

- Podle typu senzoru (teplota / kamera) se mění i rozměry, např. kamera a počasí má rozmer 6, jinak ostatni jsou 2
```
 device[i].devType
```

- sensor-ID
. do teď to bylo číslo ve smyčce/počadové číslo: senzoru=[i]
. nově sensor-ID podle UUID v JSON detailu
. lze tak efektivně vyhledávat na stránce, který BOX/senzor měnit
. tím pak mohu přesně vyhledat BOX a s nim pracovat. Smazat, posunout... nahradit.


### BUTTON
 ---------------

- každý BoxWrap je tlačítkem
- po kliknutí zobrazí

>alert + BOX zmizí. Pro obnovení refresh obrazovky.

- na deskopu funguje pěkně, např. mění efekt (pulse a symbol zárovky)

```
$(this).animateCss('pulse')
$(this).addClass("fa fa-lightbulb-o")
```

- na mobilu (Safari iOS) POZOR: Aby to fungovalo správně, v HTML kodu, který má být klikatelný, musí být připsáno:

```
onclick=""
```
napří takto v JS/HTML:   
```
 tmpBoxWrap = "<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-4 col-sm-2">\n   OBSAH\n</div>';
```

- řeší se to třeba zde
    https://stackoverflow.com/questions/9881509/jquery-on-doesnt-work-with-mobile-safari?rq=1 Také uvádí ještě možnost

    >  onclick="void(0)"


----------
