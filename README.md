# Doomaster:avokado 24.2.2018 1:16


----------


## Co nového ve verzi

## 24.2.2018

Úpravy:
(XQGXdlBa): teplota na 1 des. číslo + des. čáska místo tečky
https://trello.com/c/XQGXdlBa

(jPhRf1ok): Zrušení horního menu + server čas na dolní lištu

(3qsWWwTh): zobrazování času jen u Kamer, Alarm

(C8EKpVJb): uprava barev teplot



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
