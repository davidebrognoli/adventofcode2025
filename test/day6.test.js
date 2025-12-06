import { parseLines } from '../src/utils.js';
import { solvePart1, solvePart2 } from '../src/day6/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day6/input.txt'),
  'utf-8'
);

const testInput = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `;

// Test for Part 1
test('Example case for Part 1', () => {
  const input = parseLines(testInput);
  expect(solvePart1(input)).toBe(4277556);
});

test('Real case for Part 1', () => {
  const input = parseLines(realInput);
  expect(solvePart1(input)).toBe(6417439773370);
});

// Test for Part 2
test('Example case for Part 2', () => {
  const input = parseLines(testInput);
  expect(solvePart2(input)).toBe(3263827);
});

/*test('Real case for Part 2', () => {
  const input = parseLines(realInput);
  expect(solvePart2(input)).toBe(0);
});*/
