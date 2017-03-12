_Es war einmal ein kleines Mädchen namens Goldlöckchen. Sie erlebte viele Abenteuer mit ihrem treuen Gefährten - dir! Eines Tages kam sie an ein Haus, in welchem viele viele Bären wohnten. In dem Haus war ein großer Tisch, gedeckt mit leckerem Brei und davor standen verschiedene Stühle. Aus ihren früheren Abenteuern hatte sie gelernt, dass durch Ausprobieren, sie nicht weit kommen würde. Daher wendete sie sich an dich, damit du ihr sagst, welcher Stuhl ihrem Gewicht standhält und sie sich bei dem dazugehörigen Brei nicht die Zunge verbrennt._

### Eingabe

Eingaben für die Aufgabe sind in der Datei "inputs.txt" festgelegt.
Dabei beschreiben die ersten beiden Zahlen Goldlöckchens Gewicht und die maximale Temperatur, welche sie toleriert.
Dann folgen Paar-Kombinationen aus maximalem Gewicht in kg, welches der Stuhl aushält und Temperatur des Breis in Grad Celsius, jeweils in einer eigenen Zeile.

### Ausgabe

Eine Liste mit den Nummern der Stühle, auf die sich Goldlöckchen setzen und den Brei sofort essen kann. Dabei hat der erste Stuhl die Nummer 1, der zweite 2, usw.

### Beispiel Eingabe:

```
100 80
30kg 50°C
130kg 75°C
90kg 60°C
150kg 85°C
120kg 70°C
200kg 200°C
```

D.h. Goldlöckchen hat ein Gewicht von 100 kg und toleriert eine maximale Temperatur von 80°C.
Der erste Stuhl am Tisch hält 30 kg aus und der dazugehörige Brei hat eine Temperatur von 50°C.
Der zweite Stuhl hält bis zu 130 kg aus und der Brei hat eine Temperatur von 75, usw...

### Beispiel Ausgabe:

```
2 5
```

Goldilocks kann sich also auf Stuhl 2 (130kg 75°C) und Stuhl 5 (120kg 70°C) setzen.
