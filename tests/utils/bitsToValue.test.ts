import test from "ava";
import {bitsToValue} from "../../src/utils/bitsToValue";

test("bitsToValue", t => {
  t.is(bitsToValue([0, 0, 0]), 0);
  t.is(bitsToValue([0, 0, 1]), 1);
  t.is(bitsToValue([0, 1, 0]), 2);
  t.is(bitsToValue([0, 1, 1]), 3);
  t.is(bitsToValue([1, 1, 1]), 7);

  t.is(bitsToValue([1, 1, 1, 0, 0, 1]), 57);
});
