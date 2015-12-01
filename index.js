/**
 * Created by lvwang2002 on 15/11/24.
 */

/*****************************************************************************/
var bigInt = require("big-integer");
var createKeys = require('./keypair');
var Buffer = require('buffer/').Buffer;

/*****************************************************************************/

function RSAKeyPair(encryptionExponent, decryptionExponent, modulus, keylen){
    this.e = bigInt(encryptionExponent,16);
    this.d = bigInt(decryptionExponent,16);
    this.m = bigInt(modulus,16);
    console.log(typeof(keylen));
    this.chunkSize = keylen / 8;
    this.radix = 16;
}


/**
* key:pair of publickey and private key
* s:string for encrypt,don't be longer than key length.
*/
function encryptedString(key, s){
    var a = new Array();                    // The usual Alice and Bob stuff
    //var a = [];
    var sl = s.length;                      // Plaintext string length
    var i, j, k;                            // The usual Fortran index stuff
    var al;                                 // Array length
    var result = "";                        // Cypthertext result
    var block;                              // Big integer block to encrypt
    var crypt;                              // Big integer result

    i = 0;
    j = key.chunkSize - 1; 
    for(var n = 0; n < key.chunkSize; n++) a[n] = 0
    while (i < sl) {
        a[j-sl+i+1] = s.charCodeAt(i).toString(16);
        i++;
    }
    al = a.length;
    var plainTextValue = a.join("");

    block = bigInt(plainTextValue, 16);
    crypt = block.modPow(key.m, key.e);
    result = crypt.toString(16);

    return result;
}

/*****************************************************************************/

function decryptedString(key, c){
    var blocks = c.split(" ");              // Multiple blocks of cyphertext
    var b;                                  // The usual Alice and Bob stuff
    var i, j;                               // The usual Fortran index stuff
    var bi;                                 // Cyphertext as a big integer
    var result = "";                        // Plaintext result

    bi = bigInt(blocks[0],16);
    b = bi.modPow(key.d, key.e);
    result = b.toString(16);

    var buffer = new Buffer(result,"hex");
    result = buffer.toString("utf8");

    return (result);
}

function createKey(opt){
    return createKeys(opt);
}

export.RSAKeyPair = RSAKeyPair;
exports.encryptedString = encryptedString;
exports.decryptedString = decryptedString;
exports.createKey = createKey;

//var myKey = createKey();
//console.log("keys:",myKey);
//var publicKey = "c093768de67dce5f7541ad3b4df735b768eefc6ba403e621ea7a8705c2e33a51ecc1f513655b0a8a5e54ce046ee81fa75000e1377b576ca515d1d0a27a8a5de2b6d1f588116344094ff541b950331cf4a67a1f6361284486957dfefa8e1adb47bdbc6025644186d25fbb60a6789e362a9a084aef04b4e75c1bda4d6e86a23aad";
//var privateKey = "59b396b28c5da7868178e137519ec82fb1ba386bef4f3da028b7803367cf2e3840ff2ba8283b1b12ced3d3ceeed643004d5ccb8b6b719292e731ff6bdf869a2a1448e31998cd8e9779f72a97b606159c298ca52bfe7cb3d23aa2f2be10623dd9ebeb395a5081260bbfa3cc051205687321488a5f3da3b0667f438d9c980451c1";
//
//var key = new RSAKeyPair(publicKey,privateKey,"10001",1024);
////console.log("key:",key);
//
//var string = encryptedString(key,"{123:hehe}");
//console.log("string:",string);
//
//var decodeString = decryptedString(key,string);
//console.log("result:",decodeString);


