import {TBit} from "../types";

export function valueToBits(value: number, numBits: number): TBit[] {
  if (value < 0) {
    throw new Error("value cannot be negative");
  }

  const bits: TBit[] = [];
  for (let i = 0; i < numBits; i++) {
    bits.unshift((value & 1) === 1 ? 1 : 0);
    value = value >> 1;
  }

  return bits;
}
