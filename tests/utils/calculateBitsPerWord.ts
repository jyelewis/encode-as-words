import test from "ava";
import {calculateBitsPerWord} from "../../src/utils/calculateBitsPerWord";

test("calculateBitsPerWord", t => {
  // small values
  t.is(calculateBitsPerWord(2), 1);
  t.is(calculateBitsPerWord(4), 2);
  t.is(calculateBitsPerWord(5), 2);
  t.is(calculateBitsPerWord(6), 2);
  t.is(calculateBitsPerWord(7), 2);
  t.is(calculateBitsPerWord(8), 3);

  // large values
  t.is(calculateBitsPerWord(255), 7);
  t.is(calculateBitsPerWord(256), 8);
  t.is(calculateBitsPerWord(300), 8);

  t.is(calculateBitsPerWord(65536), 16);
  t.is(calculateBitsPerWord(466000), 18); // our built in dictionary size
  t.is(calculateBitsPerWord(1048575), 19);
  t.is(calculateBitsPerWord(1048576), 20);
  t.is(calculateBitsPerWord(1048577), 20);
  t.is(calculateBitsPerWord(4294967296), 32);
});
