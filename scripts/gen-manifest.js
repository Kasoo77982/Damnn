const fs = require('fs');
const path = require('path');

const dir = '/workspace/app/src/audio';
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.mp3'))
  .sort();

const lines = [];
const map = [];
for (const f of files) {
  const id = f.replace('.mp3', '');
  const varName = 'audio_' + id;
  lines.push('import ' + varName + " from './" + f + "';");
  map.push('  ' + JSON.stringify(id) + ': ' + varName + ',');
}

const out = [
  '// Gerado automaticamente: cada MP3 é tratado como asset estático pelo Vite/Remotion.',
  ...lines,
  '',
  'export const AUDIO: Record<string, string> = {',
  ...map,
  '};',
  '',
].join('\n');

fs.writeFileSync(path.join(dir, 'manifest.ts'), out);
console.log('manifest.ts escrito com ' + files.length + ' áudios.');
