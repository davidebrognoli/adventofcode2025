import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads an input file from the specified path.
 * @param {string} relativePath - Relative path to the input file.
 * @returns {string} - The file content as a string.
 */
function readInput(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Converts a string into an array of numbers.
 * @param {string} input - The content of the input file.
 * @param {string} split - The character to split the input by.
 * @returns {number[]} - An array of numbers.
 */
function parseNumbers(input, split = '\n') {
  return input
    .split(split)
    .map(line => parseInt(line, 10))
    .filter(n => !isNaN(n));
}

/**
 * Sort an array of numbers.
 * @param {number[]} input - The content of the input file.
 * @returns {number[]} - An array of numbers.
 */
function sortNumbers(input) {
  return input.sort((a, b) => a - b);
}

/**
 * Converts a string into an array of strings (lines).
 * @param {string} input - The content of the input file.
 * @param {string} split - The character to split the input by.
 * @returns {string[]} - An array of strings.
 */
function parseLines(input, split = '\n') {
  return input.split(split).filter(line => line.trim() !== '');
}

/**
 * Converts a string into an array of array of chars.
 * @param {string} input - The content of the input file.
 * @returns {string[][]} - An array of array of strings.
 */
function parseGrid(input) {
  return parseLines(input).map(line => parseLines(line, ''));
}

export { readInput, parseNumbers, parseLines, parseGrid, sortNumbers };
