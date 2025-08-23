// Returns string of all neighouring blank fields for fill in the blank exercises
export function concatBlanks(
  words: Array<string>,
  index: number,
  blankIndexes?: Array<number>,
) {
  let result = words[index];
  if (0 < index && blankIndexes?.includes(index - 1)) return result;

  if (blankIndexes?.includes(index)) {
    for (let i = index + 1; i < words.length; i++) {
      if (!blankIndexes?.includes(i)) break;
      else {
        result = result + " " + words[i];
      }
    }
  }

  return result;
}
