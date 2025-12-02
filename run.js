import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const day = process.argv[2];

async function runDay(day) {
  const dayPath = path.resolve(__dirname, `src/day${day}/index.js`);

  if (fs.existsSync(dayPath)) {
    const module = await import(dayPath); // Esegui il codice del giorno specifico
    if (typeof module.main === 'function') {
      module.main();
    } else {
      console.log(`Day ${day} loaded successfully (no main function found)`);
    }
  } else {
    console.error(`Day ${day} script not found.`);
  }
}

if (day) {
  runDay(day);
} else {
  console.log('Please provide a day number (e.g. npm start day1)');
}
