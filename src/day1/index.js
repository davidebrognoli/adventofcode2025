import { readInput, parseLines } from '../utils.js';

const MODULO = 100;
const INITIAL_POSITION = 50;

const rawInput = readInput('./day1/input.txt');
const input = parseLines(rawInput);

/**
 * Parses a line to extract direction and number
 * @param {string} line - Input line (e.g., "L68", "R30")
 * @returns {{direction: string, number: number}} Parsed direction and number
 */
function parseLine(line) {
  const [direction, ...numberChars] = line;
  const number = parseInt(numberChars.join(''), 10);
  return { direction, number };
}

/**
 * Applies modular arithmetic ensuring positive results
 * @param {number} value - Value to normalize
 * @param {number} mod - Modulo value
 * @returns {number} Normalized value
 */
function normalizeModulo(value, mod = MODULO) {
  const result = value % mod;
  return result < 0 ? result + mod : result;
}

/**
 * Solves the first part of the problem.
 * @param {string[]} lines - Array of instruction lines
 * @returns {number} Number of times position reaches zero
 */
function solvePart1(lines) {
  let position = INITIAL_POSITION;
  let zeroCount = 0;

  for (const line of lines) {
    const { direction, number } = parseLine(line);

    if (direction === 'L') {
      position = normalizeModulo(position - number);
    } else if (direction === 'R') {
      position = normalizeModulo(position + number);
    }

    if (position === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

/**
 * Solves the second part of the problem.
 * @param {string[]} lines - Array of instruction lines
 * @returns {number} Total count including boundary crossings
 */
function solvePart2(lines) {
  let position = INITIAL_POSITION;
  let count = 0;

  for (const line of lines) {
    const { direction, number } = parseLine(line);
    const startPosition = position;

    const additionalCount = Math.floor(number / MODULO);
    count += additionalCount;

    if (direction === 'L') {
      position = normalizeModulo(position - number);
      if (startPosition !== 0 && startPosition < number % MODULO) {
        count++;
      }
    } else if (direction === 'R') {
      position = normalizeModulo(position + number);
      if (startPosition !== 0 && startPosition + (number % MODULO) > MODULO) {
        count++;
      }
    }

    if (position === 0) {
      count++;
    }
  }

  return count;
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
