import { parseLines } from '../src/utils.js';
import { solvePart1, solvePart2 } from '../src/day5/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day5/input.txt'),
  'utf-8'
);

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

// Test for Part 1
test('Example case for Part 1', () => {
  const input = parseLines(testInput);
  expect(solvePart1(input)).toBe(3);
});

test('Real case for Part 1', () => {
  const input = parseLines(realInput);
  expect(solvePart1(input)).toBe(758);
});

// Test for Part 2
test('Example case for Part 2', () => {
  const input = parseLines(testInput);
  expect(solvePart2(input)).toBe(14);
});

test('Real case for Part 2', () => {
  const input = parseLines(realInput);
  expect(solvePart2(input)).toBe(343143696885053);
});
