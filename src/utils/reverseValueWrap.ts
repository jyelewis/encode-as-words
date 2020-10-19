
export function reverseValueWrap(x: number, wrapTo: number): number {
  while (x < 0) {
    x = wrapTo + x;
  }

  return x;
}
