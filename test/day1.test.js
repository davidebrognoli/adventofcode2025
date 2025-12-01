import { parseLines } from '../src/utils.js';
import { solvePart1, solvePart2 } from '../src/day1/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day1/input.txt'),
  'utf-8'
);

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

// Test for Part 1
test('Example case for Part 1', () => {
  const input = parseLines(testInput);
  expect(solvePart1(input)).toBe(3);
});

test('Real case for Part 1', () => {
  const input = parseLines(realInput);
  expect(solvePart1(input)).toBe(1102);
});

// Test for Part 2
test('Example case for Part 2', () => {
  const input = parseLines(testInput);
  expect(solvePart2(input)).toBe(6);
});

test('Real case for Part 2', () => {
  const input = parseLines(realInput);
  expect(solvePart2(input)).toBe(6175);
});
