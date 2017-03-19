_Der kleine Kash liebt Pokemon und möchte der beste Pokemon-Trainer aller Zeiten werden! Jedoch verliert er immer alle Kämpfe und ist danach traurig. Du als hilfsbereiter Mensch, möchtest dem kleinen Kash helfen seinen Traum zu verwirklichen. Und was hilft da am besten, wenn nicht eine magische Kristallkugel (Programm), welche dem kleinen Kash verrät, welche Angriffe besonders effektiv gegen andere sind._

### Eingabe

Das Programm soll den Benutzer nach einer Eingabe fragen, diese einlesen und danach auswerten. Dabei sollen die Eingaben folgende Form haben:
```
typA -> typB typC
```
D.h. auf der rechten Seite können (müssen nicht!) mehrere Typen stehen. Dies ist gleichbedeutend damit, dass ein Pokemon mehrere Typen besitzt, dann werden Ergebnisse der Einzelnen Auswertungen multipliziert.
Typen werden dabei in der englischen Sprache angegeben.
Welche Typen es gibt wird weiter unten unter "Hinweise" angegeben.

### Ausgabe

Das Programm soll ausgeben, ob ein Angriff eines Typs effektiv gegen einen anderen ist, in Form:
```
No effect (0%)
Not very effective (50%)
Normal (100%)
Super-effective (200%)
```

Dabei sind die Definitionen der Grenzen:
```
0%          No effect
0% - 75%    Not very effective
75% - 150%  Normal
150+%       Super-effective

```

### Bonus 1

In Pokemon haben alle Attacken einen bestimmten Typ. Zusätzlich zum angeben von nur Typen soll das Programm auch Angriffe als Eingabe akzeptieren. Da alle Angriffe zu speichern zu viel Aufwand wäre, soll dafür die Poke-API benutzt werden, d.h. wird ein Angriff eingegeben, soll ein API Aufruf stattfinden, um den Typ des Angriffs zu bestimmen.
Dabei macht es keinen Sinn Angriff gegen Angriff zu vergleichen, da Pokemon rundenbasiert ist, d.h. Namen von Angriffen können nur auf der linken Seite als typA stehen.

Die Doku zu der API findet ihr hier: https://pokeapi.co/docsv2/#moves

### Bonus 2

Wir wollen noch einen Schritt weiter gehen! In einem Kamp wäre es zu aufwendig immer den Typ eines Pokemons nachzuschauen. Daher soll das Programm zusätzlich zu den oberen Eingaben auch Namen von Pokemon als typB akzeptieren.

Die Doku dazu findet ihr hier: https://pokeapi.co/docsv2/#pokemon

### Hinweise

- Eine Tabelle mit den Typen und ihrer Effektivität findet ihr hier: https://pokemondb.net/type
- Bei API-Aufrufen müssen die Namen kleingeschrieben und Leerzeichen durch "-" ersetzt werden.
- Normalerweise wird geraten bei API-Aufrufe Daten zu cachen, da das Programm nur zu Lernzwecken entwickelt wird, muss _kein_ Caching-Verfahren implementiert werden.
- Für API-Aufrufe dürft ihr die Bibliothek [axios](https://github.com/mzabriskie/axios) benutzen, diese ist schon für euch in der _package.json_ angegeben.

### Beispiele:
```
> fire -> water
Not very effective (50%)
```
Simpelste Eingabe, selbsterklärend.

```
> fire punch -> water dragon
Not very effective (25%)
```
"fire punch" ist der Name eines Angriffs, welcher sich gegen die Typen "water" und "dragon" richtet.
Feuer gegen Wasser ist nicht sehr effektiv: 50%, weiterhin ist Feuer gegen Drache auch nicht sehr effektiv: 50%, daher folgt: Feuer gegen Wasser und Drache ergibt 0.5 * 0.5 = 0.25.

```
> fire punch -> paras
Super-effective (400%)
```
"fire punch" gegen das Pokemon "Paras" richtet 400% Schaden an, da Paras von Typ "bug" und "grass" ist.
