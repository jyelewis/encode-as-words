import { TBit } from "./types";
import * as anyBuiltInWords from "./words.json";
import {reverseValueWrap} from "./utils/reverseValueWrap";
import {calculateBitsPerWord} from "./utils/calculateBitsPerWord";
import {valueToBits} from "./utils/valueToBits";
import {bitsToValue} from "./utils/bitsToValue";

// tsc doesn't like auto-typing the mega json file
const builtInWords = anyBuiltInWords as string[];

export function decodeBytesFromWords(encodedWords: string[], size: number, words: string[] = builtInWords): Uint8Array {
  const bits = decodeBitsFromWords(encodedWords, size * 8, words);

  // group bits into bytes of 8 & convert to an integer value
  const bytes = [];
  for (let i = 0; i < size; i++) {
    const startBit = i * 8;
    const endBit = startBit + 8;
    bytes.push(bitsToValue(bits.slice(startBit, endBit)));
  }

  return new Uint8Array(bytes);
}

export function decodeBitsFromWords(encodedWords: string[], sizeBits: number, wordsDict: string[] = builtInWords): TBit[] {
  if (wordsDict.length < 2) {
    throw new Error(`Encoding error: words dictionary must contain at least 2 values`);
  }

  // convert each word into the index of its position in the dictionary
  const wordValues = encodedWords.map(word => wordsDict.indexOf(word));

  // ensure we weren't given any words that aren't in our dictionary
  if (wordValues.some(x => x === -1)) {
    throw new Error(`Unknown word detected`);
  }

  // reverse chunk value offset
  const offset = Math.round(wordsDict.length / 10);
  for (let i = 0; i < wordValues.length; i++) {
    wordValues[i] = reverseValueWrap(wordValues[i] - (offset * (i+1)), wordsDict.length);
  }

  // convert each chunk value into a collection of bits
  const bitsPerWord = calculateBitsPerWord(wordsDict.length);
  let bits: TBit[] = [];
  for (const wordValue of wordValues) {
    const bitsInWord = Math.min(bitsPerWord, sizeBits - bits.length); // cap at the number of bits we have left
    bits = bits.concat(valueToBits(wordValue, bitsInWord));
  }

  return bits;
}
