_qogg Ck Cmolog LoZY solog ucgglY, HclY Ck Cmo RkPncQo ymaHYmn nosölY. hoyMsmaHog UsüauVkglaH! jcCkyaH QmlY Ck QoyomY csso Comgo LoZYo Mk IoylaHsüllosg kgC Cmo FXR ucgg Cmy gmaHYl ioHy!

qmo ucgg icg kgYoylaHomCog, eQ ol lmaH ki hLzT eCoy hLzT5 HcgCosY?

ÖPPgo ol mi vgYoygoY BZKseyoy. NkguYmegmoyY'l? Fomg? Bl mlY hLzT5._

### Eingabe

Keine Eingabe.

### Ausgabe

Ausgegeben werden soll der verschlüsselte String und der entsprechende entschlüsselte String ausgegeben werden.

### Bonus 1

Überlegt, warum diese Verschlüsselung auch keine wirklich sichere Verschlüsselung ist. Schreibt das mit in den Pull Request, sobald ihr die Aufgabe bearbeitet habt.

### Bonus 2

Animiert euer Verschlüsselungs-Verfahren, sodass man dem Programm beim Verschlüsseln zuschauen kann.
Z.B.
![](crypto.gif)

### Hinweise

Ein sehr einfaches Verfahren zum Verschlüsseln ist die [Caesar-Chiffre](https://de.wikipedia.org/wiki/Caesar-Verschl%C3%BCsselung). Dabei werden Buchstaben um einen bestimmten Wert in der ASCII-Tabelle verschoben und so "unkenntlich" gemacht. Wie ihr euch vorstellen könnt ist dieser Code sehr einfach zu knacken, denn sobald man auch nur ein Wort erfolgreich entschlüsselt hat, hat man den Offset fürs Verschieben und somit die gesamte Chiffre entschlüsselt.

Wir wollen uns mit einem ähnlichen Verfahren beschäftigen. Dabei werden auch Buchstaben durch andere Buchstaben ersetzt, jedoch werden diese nach einem völlig anderem Prinzip herausgesucht.

Gegeben ist ein Gitter welches Groß- und Kleinbuchstaben an den Seiten besitzt:
 a b c d e f g h i j k l m
A                         n
B                         o
C                         p
D                         q
E                         r
F                         s
G                         t
H                         u
I                         v
J                         w
K                         x
L                         y
M                         z
 N O P Q R S T U V W X Y Z

Dieses Gitter wird dann mit "Spiegeln" befüllt, diese sind gegeben durch "/" und "\". Man fängt bei einem Buchstaben an und "schauet" in eine Richtung, den Buchstaben, den man am Ende "sieht", ist der verschlüsselte Buchstabe. Beispiel:

Mit der Verschlüsselung
```
  /

  /  
```
sieht das Verfahren folgendermaßen aus:

```
 a b c        Hier wird der Buchstabe C
A  /->d       durch zwei Spiegel verschlüsselt
B  |  e       und durch den Buchstaben d ersetzt.
C--/  f       
 D E F
```

```
 a b c        So wird der Buchstabe e z.B. durch B
A  /  d       ersetzt, da in dem Weg keine Spiegel
B<----e       stehen.
C  /  f       f wird durch E ersetzt, d durch C, b durch A, usw.
 D E F
```

In der Datei 'encryption' stehen die Positionen der Spiegel, dabei werden die Buchstaben nicht explizit nochmal aufgeschrieben, es wird immer davon ausgegangen, dass das Gitter wie oben beschrieben aussieht.

Der Strahl zum Verfolgen wird immer "ins Innere des Gitters" begonnen.
