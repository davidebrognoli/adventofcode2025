import { parseLines, readInput } from '../utils.js';

const rawInput = readInput('./day8/input.txt');
const input = parseLines(rawInput);
const WIDTH = 1000;

/**
 * Calculates the Euclidean distance between two 3D points.
 * @param {Object} a - First point with x, y, z coordinates.
 * @param {Object} b - Second point with x, y, z coordinates.
 * @returns {number} The distance between the two points.
 */
const distance = (a, b) => {
  const { x: x1, y: y1, z: z1 } = a;
  const { x: x2, y: y2, z: z2 } = b;

  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
};

/**
 * Parses input lines to extract 3D coordinate points.
 * @param {string[]} lines - Array of input lines containing comma-separated coordinates.
 * @returns {Object[]} Array of objects with key and position properties.
 */
function getPoints(lines) {
  return lines.map(line => {
    const [x, y, z] = line.split(',').map(Number);
    return { key: line, position: { x, y, z } };
  });
}

/**
 * Calculates distances between all pairs of points.
 * @param {Object[]} points - Array of point objects with position coordinates.
 * @returns {Map} Map of point pair keys to their distances.
 */
function getDistances(points) {
  const distances = new Map();
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const pointA = points[i];
      const pointB = points[j];
      const leftKey = `${pointA.key}|${pointB.key}`;
      const rightkey = `${pointB.key}|${pointA.key}`;
      if (!distances.has(leftKey) && !distances.has(rightkey)) {
        const dist = distance(pointA.position, pointB.position);
        distances.set(leftKey, dist);
      }
    }
  }
  return distances;
}
/**
 * Solves the first part of the problem.
 * @param {string[]} lines - Array of input lines containing 3D coordinates.
 * @param {number} width - Maximum number of connections to consider.
 * @returns {number} Product of the sizes of the three largest connected components.
 */
function solvePart1(lines, width) {
  const points = getPoints(lines);
  const distances = getDistances(points);
  const smallestDistance = [...distances.entries()]
    .sort((a, b) => a[1] - b[1])
    .slice(0, width);
  const groups = smallestDistance.reduce((acc, [key, _]) => {
    const [a, b] = key.split('|');

    const touched = acc.filter(g => g.has(a) || g.has(b));

    if (touched.length === 0) {
      acc.push(new Set([a, b]));
    } else {
      const merged = new Set([a, b]);

      touched.forEach(g => {
        g.forEach(v => merged.add(v));
        acc.splice(acc.indexOf(g), 1);
      });

      acc.push(merged);
    }

    return acc;
  }, []);
  const smallestGroupSize = [...groups]
    .sort((a, b) => b.size - a.size)
    .slice(0, 3);
  return smallestGroupSize.reduce((sum, group) => sum * group.size, 1);
}

/**
 * Solves the second part of the problem.
 * @param {string[]} lines - Array of input lines containing 3D coordinates.
 * @returns {number} Product of x-coordinates from the last connection that creates a single component.
 */
function solvePart2(lines) {
  const points = getPoints(lines);
  const distances = getDistances(points);
  const totalPoints = points.length;
  const sortedDistances = [...distances.entries()].sort((a, b) => a[1] - b[1]);

  const groups = [];
  let lastConnection = null;
  for (const [key] of sortedDistances) {
    const [a, b] = key.split('|');
    lastConnection = { a, b };

    const touched = groups.filter(g => g.has(a) || g.has(b));

    if (touched.length === 0) {
      groups.push(new Set([a, b]));
    } else {
      const merged = new Set([a, b]);

      touched.forEach(g => {
        g.forEach(v => merged.add(v));
        groups.splice(groups.indexOf(g), 1);
      });

      groups.push(merged);
    }

    if (groups.length === 1 && groups[0].size === totalPoints) {
      break;
    }
  }
  const [x1] = lastConnection.a.split(',').map(Number);
  const [x2] = lastConnection.b.split(',').map(Number);

  return x1 * x2;
}

function main() {
  const start1 = performance.now();
  const part1Result = solvePart1(input, WIDTH);
  const end1 = performance.now();
  console.log(`Part 1: ${part1Result} (${(end1 - start1).toFixed(3)}ms)`);

  const start2 = performance.now();
  const part2Result = solvePart2(input, WIDTH);
  const end2 = performance.now();
  console.log(`Part 2: ${part2Result} (${(end2 - start2).toFixed(3)}ms)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { solvePart1, solvePart2, main };
