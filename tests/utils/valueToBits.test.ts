import test from "ava";
import {valueToBits} from "../../src/utils/valueToBits";

test("valueToBits - 8", t => {
  t.deepEqual(valueToBits(0, 8), [0, 0, 0, 0, 0, 0, 0, 0]);
  t.deepEqual(valueToBits(1, 8), [0, 0, 0, 0, 0, 0, 0, 1]);
  t.deepEqual(valueToBits(2, 8), [0, 0, 0, 0, 0, 0, 1, 0]);
  t.deepEqual(valueToBits(3, 8), [0, 0, 0, 0, 0, 0, 1, 1]);
  t.deepEqual(valueToBits(4, 8), [0, 0, 0, 0, 0, 1, 0, 0]);
  t.deepEqual(valueToBits(5, 8), [0, 0, 0, 0, 0, 1, 0, 1]);

  t.deepEqual(valueToBits(253, 8), [1, 1, 1, 1, 1, 1, 0, 1]);
  t.deepEqual(valueToBits(254, 8), [1, 1, 1, 1, 1, 1, 1, 0]);
  t.deepEqual(valueToBits(255, 8), [1, 1, 1, 1, 1, 1, 1, 1]);
});

test("valueToBits - 2", t => {
  t.deepEqual(valueToBits(0, 2), [0, 0]);
  t.deepEqual(valueToBits(1, 2), [0, 1]);
  t.deepEqual(valueToBits(2, 2), [1, 0]);
  t.deepEqual(valueToBits(3, 2), [1, 1]);
});
