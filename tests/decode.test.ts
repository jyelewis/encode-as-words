import test from "ava";
import {decodeBitsFromWords, decodeBytesFromWords} from "../src/decode";
import {encodeBitsAsWords, encodeBytesAsWords} from "../src/encode";
import { TBit } from "../src/types";

test("Basic decodeBitsFromWords", t => {
  t.deepEqual(decodeBitsFromWords(["tam", "dicke"], 24), [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1]);
});

test("Encode - decode", t => {
  const bits: TBit[] = [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1];
  const words = encodeBitsAsWords(bits);
  const reconstructedBits = decodeBitsFromWords(words, bits.length);

  t.deepEqual(bits, reconstructedBits);
});

test("decodeBytesFromWords", t => {
  const words = ["username", "hours", "mmm", "string", "gram", "enlarged", "classmates"];
  const expectedBytes = new Uint8Array([0, 255, 255, 124, 255, 52, 255, 10, 152, 67, 210, 80]);

  t.deepEqual(decodeBytesFromWords(words, expectedBytes.length), expectedBytes);
});

test("decodeBytesFromWords (encode-decode)", t => {
  const bytes = new Uint8Array([0, 255, 255, 124, 255, 52, 255, 10, 152, 67, 210, 80]);
  const words = encodeBytesAsWords(bytes);
  const reconstructedBytes = decodeBytesFromWords(words, bytes.length);

  t.deepEqual(bytes, reconstructedBytes);
});

test("decodeBytesFromWords (encode-decode, simplier)", t => {
  const bytes = new Uint8Array([255, 255, 255, 255]);
  const words = encodeBytesAsWords(bytes);
  const reconstructedBytes = decodeBytesFromWords(words, bytes.length);

  t.deepEqual(bytes, reconstructedBytes);
});
