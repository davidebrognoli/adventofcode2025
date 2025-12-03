import { parseLines } from '../src/utils.js';
import { solvePart1, solvePart2 } from '../src/day3/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day3/input.txt'),
  'utf-8'
);

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

// Test for Part 1
test('Example case for Part 1', () => {
  const input = parseLines(testInput);
  expect(solvePart1(input)).toBe(357);
});

test('Real case for Part 1', () => {
  const input = parseLines(realInput);
  expect(solvePart1(input)).toBe(17430);
});

// Test for Part 2
test('Example case for Part 2', () => {
  const input = parseLines(testInput);
  expect(solvePart2(input)).toBe(3121910778619);
});

test('Real case for Part 2', () => {
  const input = parseLines(realInput);
  expect(solvePart2(input)).toBe(171975854269367);
});
