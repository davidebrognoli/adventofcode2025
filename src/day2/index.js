import { readInput } from '../utils.js';

const rawInput = readInput('./day2/input.txt');

/**
 * Parses a line to extract numeric ranges
 * @param {string} line - Comma-separated ranges in format "start-end"
 * @returns {{start: number, end: number}[]} Parsed numeric ranges
 */
function parseLine(line) {
  return line.split(',').map(range => {
    const [startStr, endStr] = range.split('-');
    return { start: parseInt(startStr), end: parseInt(endStr) };
  });
}

/**
 * Checks if a number has two identical halves when converted to string
 * @param {number} id - Number to check
 * @returns {boolean} True if the number has two identical halves
 */
function hasDuplicateHalves(id) {
  const idStr = id.toString();
  const length = idStr.length;
  if (length % 2 === 0) {
    const mid = length / 2;
    const firstHalf = idStr.slice(0, mid);
    const secondHalf = idStr.slice(mid);
    if (firstHalf === secondHalf) {
      return true;
    }
  }
  return false;
}

/**
 * Split a string into chunks of given size
 * @param {string} str A string to chunk
 * @param {number} size Chunck size
 * @returns {string[]} Array of string chunks
 */
function chunkString(str, size) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

/**
 * Checks if a number can be divided into identical repeating chunks
 * @param {number} id - Number to check
 * @returns {boolean} True if the number has repeating identical chunks
 */
function hasMultipleDuplicate(id) {
  const idStr = id.toString();
  const length = idStr.length;

  // Check all possible chunk sizes that divide the length evenly
  for (let size = 1; size <= length / 2; size++) {
    if (length % size === 0) {
      const chunks = chunkString(idStr, size);
      if (chunks.every(chunk => chunk === chunks[0]) && chunks.length > 1) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Helper function to solve both parts with different validation functions
 * @param {string} line - Comma-separated ranges
 * @param {function} validationFn - Function to check if a number is invalid
 * @returns {number} Sum of invalid numbers in the ranges
 */
function solveWithValidation(line, validationFn) {
  const ranges = parseLine(line);
  return ranges.reduce((sum, range) => {
    for (let id = range.start; id <= range.end; id++) {
      if (validationFn(id)) {
        sum += id;
      }
    }
    return sum;
  }, 0);
}

/**
 * Solves the first part of the problem.
 * @param {string} line - Comma-separated ranges
 * @returns {number} Sum of numbers with duplicate halves
 */
function solvePart1(line) {
  return solveWithValidation(line, hasDuplicateHalves);
}

/**
 * Solves the second part of the problem.
 * @param {string} line - Comma-separated ranges
 * @returns {number} Sum of numbers with repeating patterns
 */
function solvePart2(line) {
  return solveWithValidation(line, hasMultipleDuplicate);
}

function main() {
  const start1 = performance.now();
  const part1Result = solvePart1(rawInput);
  const end1 = performance.now();
  console.log(`Part 1: ${part1Result} (${(end1 - start1).toFixed(3)}ms)`);

  const start2 = performance.now();
  const part2Result = solvePart2(rawInput);
  const end2 = performance.now();
  console.log(`Part 2: ${part2Result} (${(end2 - start2).toFixed(3)}ms)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { solvePart1, solvePart2, main };
