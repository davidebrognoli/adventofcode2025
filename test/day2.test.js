import { solvePart1, solvePart2 } from '../src/day2/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realInput = fs.readFileSync(
  path.resolve(__dirname, '../src/day2/input.txt'),
  'utf-8'
);

const testInput =
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

// Test for Part 1
test('Example case for Part 1', () => {
  expect(solvePart1(testInput)).toBe(1227775554);
});

test('Real case for Part 1', () => {
  expect(solvePart1(realInput)).toBe(23701357374);
});

// Test for Part 2
test('Example case for Part 2', () => {
  expect(solvePart2(testInput)).toBe(4174379265);
});

/*test('Real case for Part 2', () => {
  const input = parseLines(realInput);
  expect(solvePart2(input)).toBe(6175);
});*/
