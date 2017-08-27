# CodingChallenges

Eine Ansammlung verschiedener Programmieraufgaben.
Alle zwei Wochen gibt es eine neue Aufgabe, welche innerhalb der nächsten zwei Wochen bearbeitet werden soll.
Alle Aufgaben werden in der Node.js Umgebung gebaut, Informationen zu einzelnen Aufgaben gibt es immer in dem Ordner der Aufgabe.

## Erste Schritte

Alle Aufgaben sollten verutlich mit jeder Node-Version kompatibel sein, um Fehler auf Grund von verschiedenen Versionen zu vermeiden, wird Node 7.5+ und npm 4.1+ empfohlen. Welche Version installiert ist, kann mit `node -v` oder `npm -v` überprüft werden.


Sobald ihr das Repository geklont habt, könnt ihr einmal `npm run init` ausführen. Danach stehen euch folgende Befehle zur Verfügung:

```
challenge run|start [challenge/NAME_DER_AUFGABE]
```
<i>Führt ihr diesen Befehl aus dem obersten Verzeichnis aus, so müsst ihr den Pfad zur Aufgabe angeben. Befindet ihr euch in dem Ordner der Aufgabe, reicht nur 'challenge run' oder 'challenge start'. (run und start sind beide Aliasse und tun genau das selbe.)</i>

```
challenge docs --generate
challenge docs --serve
```
<i>Generiert anhand der Kommentare im Code eine Doku für die einzelnen Aufgaben, welche mit der Option `--serve` als lokaler Webserver unter `http://localhost:8000/` zur Verfügung steht.</i>

```
challenge help
```
<i>Gibt Hilfen zu den verschiedenen Befehlen aus.</i>

## Abgaben

#### Schritt 1
Gibt es eine neue Aufgabe, so sollte ein neuer Branch aus `master` ausgecheckt werden mit dem Namen
```
[Nummer der Aufgabe]-[Euer Name] // Der Name kann euer Name oder auch der Benutzername bei Github sein.
Z.B.: 01-fayras
```

#### Schritt 2
Tobt euch beim Programmieren aus! :D

#### Schritt 3
Sobald ihr fertig mit der Aufgabe seid, sollte ein Pull Request in den master Branch erstellt werden.
Habt ihr Anmerkungen zu eurer Lösung, worauf ich beim Testen achten soll: Als Kommentar an den PR anhängen.

#### Schritt 4 (Optional)
Damit beim PR nur die nötigen Dateien verglichen werden, wird für jede neue Aufgabe ein neuer Branch erzeugt. Ich würde euch raten, aber noch einen Branch für euch selbst zu erzeugen, in welchen ihr eure Lösung aus Schritt 2  selbst auch merget, damit euer Code nicht verloren geht.
