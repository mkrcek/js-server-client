## Doomaster


#co nového ve verzi

2018-1-28
==========
veze obsahuje velke zmeny v kodu JS. Používám vlastní kontejnery pro HTML senzoery sestavene v JS.

Druhou fci je klikatelný BOX/senzor


Podrobnosti:


** JSON **

- nezáleží na pořadí, jen na UNID
      device[i].devId

Kompletně nová práce s obsahemtvo
- HTML kontejnery pro všechny senzory
- boxScreen: celá obrazovka
- BoxWrap: zabalení senzoru
- BoxContent: detail senzoru - jako třeba teplota

- V INDEX.html je jen template a JS z nich sestavuje stránku

- Podle typu se mění i rozměry, např. kamera a počasí má rozmer 6, jinak ostatni jsou 2
      device[i].devType

SENZOR-ID
- do teď bylo cislo senzoru=[i]
- nově sensor-ID podle UUID v JSON detailu
- lze tak efektivně vyhledávat na stránce, který (BOX) senzor měnit
- tim pak mohu přesne vyhledat BOX a s nim pracovat. Smazat, posunout...nahradit.


** BUTTON **

- každý BoxWrap je tlačítkem
    po kliknutí zobrazí "alert + BOX zmizí"
- na deskopu funguje pěkně, anpř. mění efekt (pulse a symbol zárovky)
      $(this).animateCss('pulse');
      $(this).addClass("fa fa-lightbulb-o");
- na mobilu POZOR: Aby to fungovalo správně, v HTML kodu, který má být klikatelný, musí být připsáno:
    onclick=""
    konkretne v JS/HTML   
    tmpBoxWrap = '<div onclick="" id="sensor-ID-boxWrap" class="boxWrap col-xs-4 col-sm-2">\n   OBSAH\n</div>';

řeší se to třeba zde
    https://stackoverflow.com/questions/9881509/jquery-on-doesnt-work-with-mobile-safari?rq=1
    uvádí ještě možnost
      onclick="void(0)"
