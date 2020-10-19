import test from "ava";
import {encodeBitsAsWords, encodeBytesAsWords} from "../src/encode";
// @ts-ignore
import * as emojis from "emojis-list";

test("Basic encodeBitsAsWords", t => {
  t.deepEqual(encodeBitsAsWords([1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1]), ["specialized"]);
  t.deepEqual(encodeBitsAsWords([1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1]), ["tam", "dicke"]);
})

test("Performs size check", t => {
  const bytes = new Uint8Array([1, 2, 3, 4]);
  t.notThrows(() => encodeBytesAsWords(bytes, 4));
  t.notThrows(() => encodeBytesAsWords(bytes));
  t.throws(() => encodeBytesAsWords(bytes, 3));
  t.throws(() => encodeBytesAsWords(bytes, 5));
});

test("Basic encodeBytesAsWords", t => {
  const bytes = new Uint8Array([1, 2, 3, 4]);
  t.deepEqual(encodeBytesAsWords(bytes), ["walk", "ornaments", "cb"]);
});

test("Low encodeBytesAsWords", t => {
  const bytes = new Uint8Array([0, 0, 0, 0]);
  t.deepEqual(encodeBytesAsWords(bytes), ["professor", "adoption", "pixels"]);
});

test("High encodeBytesAsWords", t => {
  const bytes = new Uint8Array([255, 255, 255, 255]);
  t.deepEqual(encodeBytesAsWords(bytes), ["upto", "insurance", "totals"]);
});

test("Larger encodeBytesAsWords", t => {
  const bytes = new Uint8Array([0, 255, 255, 124, 255, 52, 255, 10, 152, 67, 210, 80]);
  t.deepEqual(encodeBytesAsWords(bytes), ["username", "hours", "mmm", "string", "gram", "enlarged", "classmates"]);
});

test("IP Address", t => {
  const bytes = new Uint8Array([192, 168, 123, 3]);
  t.deepEqual(encodeBytesAsWords(bytes), ["intercourse", "processors", "cv"]);
});

test("Public IP Address", t => {
  const bytes = new Uint8Array([142, 150, 42, 3]);
  t.deepEqual(encodeBytesAsWords(bytes), ["liberals", "tesco", "cv"]);
});

test("IP Address + port + secret (example 1)", t => {
  const port = 52;
  const secret1 = 123;
  const secret2 = 212;
  const bytes = new Uint8Array([192, 168, 123, 3, port, secret1, secret2]);
  t.deepEqual(encodeBytesAsWords(bytes), ["intercourse", "processors", "guru", "weblog"]);
});

test("IP Address + port + secret (example 2)", t => {
  const port = 91;
  const secret1 = 125;
  const secret2 = 92;
  const bytes = new Uint8Array([180, 150, 42, 125, port, secret1, secret2]);
  t.deepEqual(encodeBytesAsWords(bytes), ["contingent", "tempo", "catchment", "diabetes"]);
});

test("IP Address + port + secret (example 3, emojis)", t => {
  const port = 91;
  const secret1 = 125;
  const secret2 = 92;
  const bytes = new Uint8Array([180, 150, 42, 125, port, secret1, secret2]);
  t.deepEqual(encodeBytesAsWords(bytes, 7, emojis), ['😃', '🚵🏽‍♀️', '🤦🏼', '🧘🏾', '🇲🇫', '🙆🏿‍♀️']);
});

test("Custom dictionary", t => {
  const bytes = new Uint8Array([13]);
  t.deepEqual(encodeBytesAsWords(bytes, 1, ["one", "two", "three", "four"]), ["one", "one", "four", "two"]);
});

test("Emoji dictionary", t => {
  const bytes = new Uint8Array([123, 432, 789, 132]);
  t.deepEqual(encodeBytesAsWords(bytes, 4, emojis), ['👴🏽', '🕢', '👶']);
});

test("Readme examples", t => {
  // const randomBytes = [151, 124, 56, 132, 252, 1, 98]
  // console.log(randomBytes.map(x => x.toString(2)).join(""));
  // console.log(encodeBytesAsWords(new Uint8Array(randomBytes)));

  t.pass();
})
