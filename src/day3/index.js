import { readInput, parseLines } from '../utils.js';

const rawInput = readInput('./day3/input.txt');
const input = parseLines(rawInput);

/**
 * Searches for the maximum value with the specified length that can be formed by any digits in the line without reordering.
 * @param {string} line - Sequence of numbers
 * @param {number} length - Length of the pattern to find
 * @returns {number} Max value found
 */
function extractMaxValue(line, length) {
  const numbers = line.split('').map(char => parseInt(char));
  let start = 0;
  let end = numbers.length - length + 1;
  const maxValues = [];
  for (let i = 0; i < length; i++) {
    const arr = numbers.slice(start, end);
    const max = Math.max(...arr);
    const index = arr.indexOf(max);
    maxValues.push(max);
    start = start + index + 1;
    end = end + 1;
  }
  return parseInt(maxValues.join(''));
}

/**
 * Solves the first part of the problem.
 * @param {string} line - Comma-separated ranges
 * @returns {number} Sum of numbers with duplicate halves
 */
function solvePart1(lines) {
  const maxValues = lines.map(line => {
    return extractMaxValue(line, 2);
  });
  return maxValues.reduce((a, b) => a + b, 0);
}

/**
 * Solves the second part of the problem.
 * @param {string} line - Comma-separated ranges
 * @returns {number} Sum of numbers with repeating patterns
 */
function solvePart2(lines) {
  const maxValues = lines.map(line => {
    return extractMaxValue(line, 12);
  });
  return maxValues.reduce((a, b) => a + b, 0);
}

function main() {
  const start1 = performance.now();
  const part1Result = solvePart1(input);
  const end1 = performance.now();
  console.log(`Part 1: ${part1Result} (${(end1 - start1).toFixed(3)}ms)`);

  const start2 = performance.now();
  const part2Result = solvePart2(input);
  const end2 = performance.now();
  console.log(`Part 2: ${part2Result} (${(end2 - start2).toFixed(3)}ms)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { solvePart1, solvePart2, main };
