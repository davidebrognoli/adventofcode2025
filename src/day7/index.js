import { parseGrid, readInput } from '../utils.js';

const rawInput = readInput('./day7/input.txt');
const input = parseGrid(rawInput);

/**
 * Solves the first part of the problem.
 * @param {string[]} grid - Array of input lines containing a grid with splitters ('^') and starting position ('S').
 * @returns {number} Total number of splits encountered.
 */
function solvePart1(grid) {
  const startPosition = grid[0].findIndex(char => char.includes('S'));
  let rowPositions = new Set();
  rowPositions.add(startPosition);
  let split = 0;
  for (let i = 1; i < grid.length; i++) {
    const newRowPositions = new Set();
    rowPositions.forEach(pos => {
      if (grid[i][pos] && grid[i][pos] === '^') {
        split++;
        const prevPos = pos - 1;
        if (prevPos >= 0) {
          newRowPositions.add(prevPos);
        }
        const nextPos = pos + 1;
        if (nextPos < grid[i].length) {
          newRowPositions.add(nextPos);
        }
      } else {
        newRowPositions.add(pos);
      }
    });
    rowPositions = newRowPositions;
  }
  return split;
}

/**
 * Solves the second part of the problem.
 * @param {string[]} grid - Array of input lines containing a grid with splitters ('^') and starting position ('S').
 * @returns {number} Total number of timelines (paths).
 */
function solvePart2(grid) {
  const startPosition = grid[0].findIndex(char => char.includes('S'));

  let pathCounts = new Map();
  pathCounts.set(startPosition, 1);

  for (let i = 1; i < grid.length; i++) {
    const newPathCounts = new Map();

    pathCounts.forEach((count, pos) => {
      if (grid[i][pos] && grid[i][pos] === '^') {
        const prevPos = pos - 1;
        if (prevPos >= 0) {
          newPathCounts.set(prevPos, (newPathCounts.get(prevPos) || 0) + count);
        }
        const nextPos = pos + 1;
        if (nextPos < grid[i].length) {
          newPathCounts.set(nextPos, (newPathCounts.get(nextPos) || 0) + count);
        }
      } else {
        newPathCounts.set(pos, (newPathCounts.get(pos) || 0) + count);
      }
    });

    pathCounts = newPathCounts;
  }

  let totalPaths = 0;
  pathCounts.forEach(count => {
    totalPaths += count;
  });

  return totalPaths;
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
