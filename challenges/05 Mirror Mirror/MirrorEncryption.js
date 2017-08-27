const fs = require('fs');
const Ray = require('./Ray.js');

/**
 * Klassen zum Ver-/Entschlüsseln von Nachrichten
 * mittels "Spiegel-Verschlüsselung".
 */
class MirrorEncryption {
  /**
   * Erstellt eine neue Instanz der Klasse.
   *
   * @param  {String} file Der Name/Pfad zur Verschlüsselungs-Datei.
   */
  constructor(file) {
    let lines = fs.readFileSync(file).toString().split("\n");
    this.grid = lines.map(line => line.split(''));
    this.table = this.createLookupTable(this.grid);
  }

  /**
   * Verschlüsselt eine Nachrichten nach der vorgegeben Verschlüsselung der Klasse.
   *
   * @param  {String} string Die Nachricht, welche verschlüsselt werden soll.
   * @return {String}        Die verschlüsselte Nachricht.
   */
  encrypt(string) {
    let chars = string.split('');
    let encryption = '';
    for(let c of chars) {
      encryption += this.table.encrypt[c] || c;
    }
    return encryption;
  }

  /**
   * Entschlüsselt eine Nachricht nach der vorgegeben Verschlüsselung der Klasse.
   *
   * @param  {String} string Die Nachricht, welche entschlüsselt werden soll.
   * @return {String}        Die entschlüsselte Nachricht.
   */
  decrypt(string) {
    let chars = string.split('');
    let decryption = '';
    for(let c of chars) {
      decryption += this.table.decrypt[c] || c;
    }
    return decryption;
  }

  createLookupTable(grid) {
    let table = {
      encrypt: {},
      decrypt: {}
    };
    for(let i = 0; i < 13; i++) {
      let charFrom = String.fromCharCode(65 + i);
      let charTo = this.calculateRay(0, i, {x: 1, y: 0});
      table.encrypt[charFrom] = charTo;
      table.decrypt[charTo] = charFrom;

      charFrom = String.fromCharCode(97 + i);
      charTo = this.calculateRay(i, 0, {x: 0, y: 1});
      table.encrypt[charFrom] = charTo;
      table.decrypt[charTo] = charFrom;

      charFrom = String.fromCharCode(65 + 13 + i);
      charTo = this.calculateRay(i, 12, {x: 0, y: -1});
      table.encrypt[charFrom] = charTo;
      table.decrypt[charTo] = charFrom;

      charFrom = String.fromCharCode(97 + 13 + i);
      charTo = this.calculateRay(12, i, {x: -1, y: 0});
      table.encrypt[charFrom] = charTo;
      table.decrypt[charTo] = charFrom;
    }
    return table;
  }

  calculateRay(x, y, dir) {
    let ray = new Ray(x, y);
    ray.dir = dir;
    this.trace(ray);
    if(ray.y == -1) {
      return String.fromCharCode(97 + ray.x);
    } else if(ray.y == 13) {
      return String.fromCharCode(65 + 13 + ray.x);
    } else if(ray.x == -1) {
      return String.fromCharCode(65 + ray.y);
    } else if(ray.x == 13) {
      return String.fromCharCode(97 + 13 + ray.y);
    }
    return null;
  }

  trace(ray) {
    do {
      if(this.grid[ray.x][ray.y] == '/') {
        let tempX = ray.dir.x;
        ray.dir.x = -ray.dir.y;
        ray.dir.y = -tempX;
      } else if(this.grid[ray.x][ray.y] == '\\') {
        let tempX = ray.dir.x;
        ray.dir.x = ray.dir.y;
        ray.dir.y = tempX;
      }
      ray.next();
    } while(ray.x >= 0 && ray.y >= 0 && ray.x <= 12 && ray.y <= 12);

    return ray;
  }
}

module.exports = MirrorEncryption;
