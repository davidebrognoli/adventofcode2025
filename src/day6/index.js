import { parseLines, readInput } from '../utils.js';

const rawInput = readInput('./day6/input.txt');
const input = parseLines(rawInput);

/**
 * Solves the first part of the problem.
 * @param {string[]} lines - Array of input lines containing a grid of numbers with operators in the last row.
 * @returns {number} Sum of all column calculations.
 */
function solvePart1(lines) {
  const rows = lines.map(row => row.trim().split(/\s+/));
  const length = rows.length - 1;
  let total = 0;
  for (let i = 0; i < rows[0].length; i++) {
    const operation = rows[length][i];
    let columnTotal = operation === '+' ? 0 : 1;
    for (let j = 0; j < length; j++) {
      if (operation === '+') {
        columnTotal += Number(rows[j][i]);
      } else {
        columnTotal *= Number(rows[j][i]);
      }
    }
    total += columnTotal;
  }
  return total;
}

/**
 * Solves the second part of the problem.
 * @param {string[]} lines - Array of input lines containing a grid of digits with operators in the last row.
 * @returns {number} Sum of all group calculations after applying their respective operators.
 */
function solvePart2(lines) {
  const columnsLength = Math.max(...lines.map(str => str.length));
  const rowsLength = lines.length;
  const rows = [];
  let index = -1;
  for (let i = 0; i < columnsLength; i++) {
    const operator = lines[rowsLength - 1][i];
    if (operator === '+' || operator === '*') {
      index++;
      rows[index] = { operator, numbers: [] };
    }
    let number = '';
    for (let j = 0; j < rowsLength - 1; j++) {
      const char = lines[j][i];
      if (char && char !== ' ') {
        number += char;
      }
    }
    rows[index].numbers.push(Number(number));
  }
  return rows.reduce((acc, { operator, numbers }) => {
    if (operator === '+') {
      return acc + numbers.reduce((a, b) => a + b, 0);
    }
    const filteredNumbers = numbers.filter(number => number !== 0);
    return acc + filteredNumbers.reduce((a, b) => a * b, 1);
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
