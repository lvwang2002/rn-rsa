# rn-rsa
## How to install
  >`npm intall rn-rsa@https://github.com/lvwang2002/rn-rsa.git --save`
  
## How to create key pair

```js
  var key = createKey({bits:1024}) //default value:2048;
  var publicKey = key.public;
  var privateKey = key.private;
```  


## How to use

```js
var key = new RSAKeyPair(publicKey,privateKey,"10001",1024);
console.log("key:",key);
//
var string = encryptedString(key,"{123:hehe}");
console.log("string:",string);
//
var decodeString = decryptedString(key,string);
console.log("result:",decodeString);
```
  

