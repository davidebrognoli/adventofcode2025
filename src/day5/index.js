import { parseLines, readInput } from '../utils.js';

const rawInput = readInput('./day5/input.txt');
const input = parseLines(rawInput);

/**
 * Solves the first part of the problem.
 * @param {string[]} lines - Array of input lines containing ranges (format: "start-end") and ingredients (numbers).
 * @returns {number} Count of ingredients that fall within at least one range.
 */
function solvePart1(lines) {
  const ranges = [];
  const ingredients = [];
  lines.forEach(line => {
    if (line.includes('-')) {
      const [start, end] = line.split('-').map(Number);
      ranges.push([start, end]);
    } else if (line.trim() !== '') {
      ingredients.push(Number(line));
    }
  });
  return ingredients.filter(ing => {
    return ranges.some(([start, end]) => ing >= start && ing <= end);
  }).length;
}

/**
 * Solves the second part of the problem.
 * @param {string[]} lines - Array of input lines containing ranges (format: "start-end").
 * @returns {number} Total number of integers covered by all merged ranges.
 */
function solvePart2(lines) {
  const ranges = [];

  lines.forEach(line => {
    if (line.includes('-')) {
      const [start, end] = line.split('-').map(Number);

      const overlapping = [];
      const nonOverlapping = [];

      ranges.forEach(([s, e]) => {
        if (start <= e && end >= s) {
          overlapping.push([s, e]);
        } else {
          nonOverlapping.push([s, e]);
        }
      });

      if (overlapping.length > 0) {
        const allRanges = [...overlapping, [start, end]];
        const minStart = Math.min(...allRanges.map(([s]) => s));
        const maxEnd = Math.max(...allRanges.map(([, e]) => e));

        ranges.length = 0;
        ranges.push(...nonOverlapping, [minStart, maxEnd]);
      } else {
        ranges.push([start, end]);
      }
    }
  });

  return ranges.reduce((acc, [start, end]) => {
    return acc + (end - start + 1);
  }, 0);
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
