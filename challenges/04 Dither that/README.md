_Es ist furchtbar! Der neuen Zeitung 'Daily Debug' ist der Farbdrucker kaputt gegangen. Dabei sollte es doch die populärste Zeitung in der Coding Community werden! Der Drucker druckt nur noch Schwarz oder Weiß, nicht einmal Graustufen gehen, einen neuen Drucker zu besorgen würde viel zu lange dauern und "[das] Erscheinen zu verschieben ist keine Option!", sagt der Verlagschef. Du errinerst dich, dass dir jemand einmal von [Dithering](https://de.wikipedia.org/wiki/Dithering_(Bildbearbeitung)) erzählt hat, ein Verfahren, welches den Tag retten könnte._

### Eingabe

Das Programm sollte ein Bild entgegen nehmen (am besten per Drag'n'Drop).

### Ausgabe

Ausgegeben werden soll dann ein Zwei-Farben-Bild (Schwarz/Weiß), welches mit dem [Floyd-Steinberg Dithering-Verfahren](https://de.wikipedia.org/wiki/Floyd-Steinberg-Algorithmus) bearbeitet wurde.

### Bonus 1

Schreibt euer Programm so, dass das bearbeitete Bild nicht plötzlich auftaucht, sondern, dass man dem Dithering-Verfahren zuschauen kann. Z.B. soll das Programm das ursprüngliche Bild anzeigen und dann Zeile für Zeile das bearbeitete Bild drüber legen.

### Bonus 2

Im Artikel unter 'Hinweise' werden noch weitere Verfahren vorgestellt, implementiert 3 andere aus den 11 vorhandenen. Dabei sollte der Benutzer wählen können, welches Verfahren benutzt werden soll.

### Bonus 3

Je nachdem, wie man das Ziel-Farbspektrum bestimmt, können Bilder in Schwarz-Weiß oder in 256 Farben (dies wird z.B. für das GIF-Format verwendet) usw. erzeugt werden. Implementiert eine Möglichkeit für den Benutzer zwischen Schwarz-Weiß, 256 Farben und ggf. noch anderen Farbsprektren zu wählen.

### Hinweise

- Im Artikel [hier](http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/) wird sehr schön das Konzept von Dithering erklärt. Dies ist der Artikel für Bonus 2.
- Damit ihr nicht lange nach Bildern sucht, hier ein [Beispielbild](http://www.lifeofpix.com/wp-content/uploads/2017/03/screenshot-2-copy.jpg) entnommen aus www.lifeofpix.com.
