import {TBit} from "../types";

export function bitsToValue(bits: TBit[]): number {
  let val = 0;

  for (let bit of bits) {
    val = val << 1;
    val += bit;
  }

  return val;
}
