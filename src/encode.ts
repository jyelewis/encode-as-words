import {TBit} from "./types";
import {calculateBitsPerWord} from "./utils/calculateBitsPerWord";
import {valueToBits} from "./utils/valueToBits";
import * as anyBuiltInWords from "./words.json";

// tsc doesn't like auto-typing the mega json file
const builtInWords = anyBuiltInWords as string[];

export function encodeBytesAsWords(bytes: Uint8Array, size?: number, words: string[] = builtInWords): string[] {
  // size is only provided so the interface matches the decode function
  if (size && bytes.length !== size) {
    throw new Error(`Encoding error: input byte array length did not match specified size`);
  }

  // convert all bytes into a flat array of bits
  let bits: TBit[] = [];
  for (let i = 0; i < bytes.length; i++) {
    bits = bits.concat(valueToBits(bytes[i], 8));
  }

  return encodeBitsAsWords(bits, words);
}

export function encodeBitsAsWords(bits: TBit[], words: string[] = builtInWords): string[] {
  if (words.length < 2) {
    throw new Error(`Encoding error: words dictionary must contain at least 2 values`);
  }

  const bitsPerWord = calculateBitsPerWord(words.length);

  // chunk up bits into maximum size of bitsPerWord
  const numWords = Math.ceil(bits.length / bitsPerWord);
  const bitChunks = [];

  for (let i = 0; i < numWords; i++) {
    const chunkStart = i * bitsPerWord;
    const chunkEnd = Math.min(chunkStart + bitsPerWord, bits.length); // cap at end of bits array
    bitChunks.push(bits.slice(chunkStart, chunkEnd));
  }

  // calculate numerical value for each chunk
  const wordValues = [];
  for (const bitChunk of bitChunks) {
    let chunkValue = 0;
    for (let i = 0; i < bitChunk.length; i++) {
      chunkValue = chunkValue<<1;
      chunkValue += bitChunk[i];
    }
    wordValues.push(chunkValue);
  }

  // offset each chunk value by 10% of the words dictionary size, to avoid the same value using the same word twice
  const offset = Math.round(words.length / 10);
  for (let i = 0; i < wordValues.length; i++) {
    wordValues[i] = (wordValues[i] + (offset * (i+1))) % words.length;
  }

  // map each word value to a word in the provided dictionary
  const encodedWords = wordValues.map(x => words[x]);
  return encodedWords;
}
