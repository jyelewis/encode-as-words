import test from "ava";
import {reverseValueWrap} from "../../src/utils/reverseValueWrap";

test("reverseValueWrap", t => {
  t.is(reverseValueWrap(5, 10), 5);
  t.is(reverseValueWrap(10, 10), 10);
  t.is(reverseValueWrap(0, 10), 0);

  t.is(reverseValueWrap(-1, 10), 9);
  t.is(reverseValueWrap(-10, 10), 0);
  t.is(reverseValueWrap(-15, 10), 5);

  t.is(reverseValueWrap(-50005, 10), 5);
});

test("reverseValueWrap - each value", t => {
  const val = 6;
  const modifier = 38;
  const wrap = 10;

  const encoded = (val + modifier) % 10
  const original = reverseValueWrap(encoded - 8, wrap);
  t.is(original, val);
});
