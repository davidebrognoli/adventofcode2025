import { readInput, parseGrid } from '../utils.js';

const rawInput = readInput('./day4/input.txt');
const grid = parseGrid(rawInput);
const MIN_NEIGHBORS = 4;
const NEIGHBOR_DELTAS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

/**
 * Converts coordinates to string key
 * @param {number} r - Row index
 * @param {number} c - Column index
 * @returns {string} Coordinate string "r,c"
 */
const coordToString = (r, c) => `${r},${c}`;

/**
 * Converts string key to coordinates
 * @param {string} str - Coordinate string "r,c"
 * @returns {number[]} Array [row, column]
 */
const stringToCoord = str => str.split(',').map(Number);

/**
 * Gets all valid neighboring positions (8-directional) for a given cell in the grid.
 * @param {number} r - Row index of the cell.
 * @param {number} c - Column index of the cell.
 * @param {string[][]} grid - The 2D grid to check boundaries against.
 * @returns {number[][]} Array of [row, column] coordinate pairs for valid neighbors.
 */
function getNeighbors(r, c, grid) {
  const neighbors = [];
  for (const [dr, dc] of NEIGHBOR_DELTAS) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}

/**
 * Solves the first part of the problem.
 * @param {string[][]} grid - The 2D grid to analyze.
 * @returns {number} Count of '@' cells with fewer than 4 '@' neighbors.
 */
function solvePart1(grid) {
  let counter = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== '@') continue;
      const atNeighbors = getNeighbors(r, c, grid).filter(
        ([nr, nc]) => grid[nr][nc] === '@'
      );
      if (atNeighbors.length < MIN_NEIGHBORS) {
        counter++;
      }
    }
  }
  return counter;
}

/**
 * Solves the second part of the problem.
 * @param {string[][]} input - The 2D grid to process.
 * @returns {number} Total count of '@' cells removed during the process.
 */
function solvePart2(input) {
  const grid = new Set();
  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[0].length; c++) {
      if (input[r][c] === '@') {
        grid.add(coordToString(r, c));
      }
    }
  }
  let counter = 0;
  let remainingCells = grid.size;
  let previousCount = remainingCells + 1;

  while (remainingCells < previousCount) {
    previousCount = remainingCells;
    for (const key of grid) {
      const [r, c] = stringToCoord(key);
      const atNeighbors = getNeighbors(r, c, input).filter(([nr, nc]) =>
        grid.has(coordToString(nr, nc))
      );
      if (atNeighbors.length < MIN_NEIGHBORS) {
        grid.delete(key);
        counter++;
      }
    }
    remainingCells = grid.size;
  }
  return counter;
}

function main() {
  const start1 = performance.now();
  const part1Result = solvePart1(grid);
  const end1 = performance.now();
  console.log(`Part 1: ${part1Result} (${(end1 - start1).toFixed(3)}ms)`);

  const start2 = performance.now();
  const part2Result = solvePart2(grid);
  const end2 = performance.now();
  console.log(`Part 2: ${part2Result} (${(end2 - start2).toFixed(3)}ms)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { solvePart1, solvePart2, main };
