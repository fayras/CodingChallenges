const MirrorEncryption = require('./MirrorEncryption.js');

const stringToEncrypt = "Mirror mirror on the wall, who is the finest of 'em all?!";

const mirror = new MirrorEncryption('encryption');
let e = mirror.encrypt(stringToEncrypt);
let d = mirror.decrypt(e);

console.log('Original:  ', stringToEncrypt);
console.log('Encrypted: ', e);
console.log('Decrypted: ', d);
