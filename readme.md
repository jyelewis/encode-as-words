Encode as words
===

Encode raw binary data as a collection of human readable words, for easy communication.

e.g.
`100101111111100111000100001001111110011100010` => `peach den vanity chelsea`

Example use case, displaying a users public IP for them to read out over the phone during support calls
`142.150.42.3` -> `liberals tesco cv`


Usage
----
``` javascript 1.8
import {encodeBytesAsWords, decodeBytesFromWords} from "encode-as-words";

const ipBytes = new Uint8Array([142, 150, 42, 3]);
const words = encodeBytesAsWords(ipBytes);

console.log(words.join(" ")); // liberals tesco cv

const decodedBytes = decodeBytesFromWords(words, 4);
console.log(decodedBytes); // 142, 150, 42, 3
```
