const readline = require('readline');
const MirrorEncryption = require('./MirrorEncryption.js');

const stringToEncrypt = "Mirror mirror on the wall, who is the finest of 'em all?!";

const mirror = new MirrorEncryption('encryption');
let e = mirror.encrypt(stringToEncrypt);
let d = mirror.decrypt(e);

console.log('Original:  ', stringToEncrypt);
console.log('Encrypted: ', e);
console.log('Decrypted: ', d);
console.log('\n');

let encrypted = stringToEncrypt.split('');
for(let i = 0; i < encrypted.length; i++) {
  (function() {
    let times = Math.random() * 50;
    let count = 0;
    let intervalID = setInterval(() => {
      if(count > times) {
        clearInterval(intervalID);
        encrypted[i] = mirror.encrypt(stringToEncrypt.charAt(i));
      } else {
        encrypted[i] = String.fromCharCode(42 + Math.random() * 64);
      }
      count++;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(encrypted.join(''));
      if(encrypted.join('') == e) {
        process.stdout.write('\n');
      }
    }, 50);
  })();
}
//
//console.log('Encrypted: ', e);
//console.log('Decrypted: ', d);
