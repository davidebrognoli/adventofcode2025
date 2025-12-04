import { parseGrid } from '../src/utils.js';
import { solvePart1, solvePart2 } from '../src/day4/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day4/input.txt'),
  'utf-8'
);

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

// Test for Part 1
test('Example case for Part 1', () => {
  const input = parseGrid(testInput);
  expect(solvePart1(input)).toBe(13);
});

test('Real case for Part 1', () => {
  const input = parseGrid(realInput);
  expect(solvePart1(input)).toBe(1549);
});

// Test for Part 2
test('Example case for Part 2', () => {
  const input = parseGrid(testInput);
  expect(solvePart2(input)).toBe(43);
});

test('Real case for Part 2', () => {
  const input = parseGrid(realInput);
  expect(solvePart2(input)).toBe(8887);
});
