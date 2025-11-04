// Leer del file System
const { writeFileSync, mkdirSync, write } = require('fs');

// Leer las variables de entorno
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxKey = process.env['MAPBOX_KEY'];

if (!mapboxKey) {
  throw new Error('Falta la variable de entorno MAPBOX_KEY');
}

const envFileContent = `export const environment = {
  mapboxToken: '${mapboxKey}',
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
