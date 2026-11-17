import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const { SEGMENTS } = await import('/tmp/build/segments.js');

const AUDIO_DIR = path.join('/workspace/app', 'src', 'audio');
fs.mkdirSync(AUDIO_DIR, { recursive: true });

// Voz espeak-ng por personagem: [voz, velocidade (wpm), tom (0-99)]
const VOICE = {
  ANA: ['pt-br+f1', 158, 52],
  RAFAEL: ['pt-br+m3', 148, 38],
  HELENA: ['pt-br+f2', 152, 58],
  NIKOS: ['pt-br+m5', 142, 32],
  CAROL: ['pt-br+f3', 160, 48],
};

const timing = [];
let cursor = 0;

for (const seg of SEGMENTS) {
  const [voice, rate, pitch] = VOICE[seg.speaker];
  const wav = path.join('/tmp/kilo2', `${seg.id}.wav`);
  const mp3 = path.join(AUDIO_DIR, `${seg.id}.mp3`);

  // Síntese de fala
  execFileSync('espeak-ng', [
    '-v', voice,
    '-s', String(rate),
    '-p', String(pitch),
    '-w', wav,
    seg.tts,
  ]);

  // Converte para MP3 (mais leve para o Remotion)
  execFileSync('ffmpeg', [
    '-y', '-i', wav,
    '-codec:a', 'libmp3lame', '-q:a', '4',
    '-ac', '1', '-ar', '44100',
    mp3,
  ], { stdio: 'pipe' });

  const dur = parseFloat(
    execFileSync('ffprobe', [
      '-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1', mp3,
    ], { encoding: 'utf-8' }).trim(),
  );

  const start = cursor;
  const end = cursor + dur;
  cursor = end;

  timing.push({
    id: seg.id,
    speaker: seg.speaker,
    text: seg.text,
    section: seg.section,
    start,
    end,
    duration: dur,
    audio: `./audio/${seg.id}.mp3`,
    broll: seg.broll,
    highlight: seg.highlight,
    lowerThird: seg.lowerThird,
  });

  process.stdout.write(
    `OK ${seg.id.padEnd(4)} ${seg.speaker.padEnd(8)} ${dur.toFixed(2)}s [${start.toFixed(1)}–${end.toFixed(1)}]\n`,
  );
}

fs.writeFileSync(
  path.join(AUDIO_DIR, 'timing.json'),
  JSON.stringify({ totalDuration: cursor, segments: timing }, null, 2),
);

process.stdout.write(`\nTOTAL: ${cursor.toFixed(2)}s (${(cursor / 60).toFixed(2)} min)\n`);
