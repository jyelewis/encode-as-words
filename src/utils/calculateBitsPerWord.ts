
// returns the maximum number of bits that can be represented using a single word in dictionary of size 'numberOfWords'
export function calculateBitsPerWord(numberOfWords: number): number {
  // calculate how many bits per word for this given dictionary
  // add more bits until we reach a value greater than the total words in our dictionary
  let bitsPerWord = 1;
  while (Math.pow(2, bitsPerWord) <= numberOfWords) {
    bitsPerWord++;
  }

  // subtract one, we would have stepped one too far before we stopped looping
  return bitsPerWord - 1;
}
