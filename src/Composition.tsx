import { useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import timingData from './audio/timing.json';
import { AUDIO } from './audio/manifest';

interface TimingSegment {
  id: string;
  speaker: string;
  text: string;
  section: string;
  start: number;
  end: number;
  audio: string;
  highlight?: string[];
  broll?: string;
  lowerThird?: string;
}

const segments = timingData as {
  totalDuration: number;
  segments: TimingSegment[];
};

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_SECONDS = 480; // 8 minutos

const SPEAKER_COLOR: Record<string, string> = {
  ANA: '#2563eb',
  RAFAEL: '#0f766e',
  HELENA: '#7c3aed',
  NIKOS: '#b45309',
  CAROL: '#dc2626',
};

const SPEAKER_ROLE: Record<string, string> = {
  ANA: 'Apresentadora e mediadora',
  RAFAEL: 'Economista',
  HELENA: 'Cientista política',
  NIKOS: 'Produtor rural',
  CAROL: 'Correspondente na Europa',
};

const BG = '#0b1120';
const CARD = 'rgba(255, 255, 255, 0.08)';
const CARD_BORDER = 'rgba(255, 255, 255, 0.18)';

function secToFrame(s: number) {
  return Math.round(s * FPS);
}

const SECTION_LABEL: Record<string, string> = {
  abertura: 'Abertura',
  'linha-do-tempo': 'O que aconteceu',
  economia: 'Economia',
  campo: 'O campo',
  politica: 'Política',
  consequencias: 'Consequências',
  fechamento: 'Fechamento',
};

// Primeiro instante de cada seção (para o banner de seção)
const sectionFirstTime: Record<string, number> = {};
for (const s of segments.segments) {
  if (!(s.section in sectionFirstTime)) sectionFirstTime[s.section] = s.start;
}

const AudioTrack = ({ seg }: { seg: TimingSegment }) => (
  <Audio
    src={AUDIO[seg.id]}
    trimBefore={secToFrame(seg.start)}
    volume={1}
  />
);

const SpeakerChip = ({
  speaker,
  color,
  role,
  small,
}: {
  speaker: string;
  color: string;
  role?: string;
  small?: boolean;
}) => {
  const top = small ? 60 : 120;
  const width = small ? 300 : 520;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 60,
        width,
        display: 'flex',
        flexDirection: 'column',
        gap: small ? 4 : 8,
      }}
    >
      <div
        style={{
          background: color,
          color: '#ffffff',
          padding: small ? '6px 12px' : '10px 18px',
          borderRadius: 999,
          fontSize: small ? 24 : 34,
          fontWeight: 'bold',
          letterSpacing: 1,
          textTransform: 'uppercase',
          display: 'inline-block',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        {speaker}
      </div>
      {role && (
        <div
          style={{
            color: '#cbd5e1',
            fontSize: small ? 22 : 30,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            opacity: 0.9,
          }}
        >
          {role}
        </div>
      )}
    </div>
  );
};

const HighlightPills = ({ seg }: { seg: TimingSegment }) => {
  if (!seg.highlight || seg.highlight.length === 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 220,
        left: 0,
        width: WIDTH,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        padding: '0 80px',
      }}
    >
      {seg.highlight.map((h, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: `1px solid ${CARD_BORDER}`,
            color: '#ffffff',
            padding: '14px 24px',
            borderRadius: 14,
            fontSize: 30,
            fontWeight: '700',
            textAlign: 'center',
            minWidth: 260,
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          }}
        >
          {h}
        </div>
      ))}
    </div>
  );
};

const Card = ({
  top,
  right,
  width,
  height,
  title,
  body,
  big,
}: {
  top: number;
  right: number;
  width: number;
  height?: number;
  title: string;
  body: string;
  big?: boolean;
}) => {
  const fontSize = big ? 30 : 26;
  const titleSize = big ? 28 : 24;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        width,
        height,
        background: CARD,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: big ? 30 : 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.55)',
          padding: '14px 20px',
          fontSize: titleSize,
          fontWeight: '700',
          color: '#ffffff',
          borderBottom: `1px solid ${CARD_BORDER}`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div
          style={{
            color: '#94a3b8',
            fontSize,
            fontWeight: '600',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          [{body}]
        </div>
      </div>
    </div>
  );
};

const SectionBanner = ({ section }: { section: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: WIDTH,
      height: 110,
      background: 'rgba(0,0,0,0.6)',
      borderBottom: `1px solid ${CARD_BORDER}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    }}
  >
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        background: '#22d3ee',
      }}
    />
    <div
      style={{
        color: '#ffffff',
        fontSize: 40,
        fontWeight: '800',
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}
    >
      {SECTION_LABEL[section] || section}
    </div>
  </div>
);

const VideoContent = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const segs = segments.segments;
  const active = segs.find((s) => time >= s.start && time < s.end);
  const color = active ? SPEAKER_COLOR[active.speaker] : '#64748b';

  // Cortes de câmera a cada ~10 segundos
  const cam = Math.floor(time / 10) % 2 === 0 ? 'speaker' : 'broll';

  const showBanner =
    active &&
    time >= sectionFirstTime[active.section] &&
    time < sectionFirstTime[active.section] + 3;

  return (
    <div style={{ background: BG, width: WIDTH, height: HEIGHT, position: 'relative' }}>
      {segs.map((s) => (
        <AudioTrack key={s.id} seg={s} />
      ))}

      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          color: '#ffffff',
          fontSize: 44,
          fontWeight: '900',
          letterSpacing: 3,
          textTransform: 'uppercase',
          opacity: 0.95,
        }}
      >
        Grécia em Ebulição
      </div>

      {showBanner && active && <SectionBanner section={active.section} />}

      {active ? (
        <>
          <SpeakerChip
            speaker={active.speaker}
            color={color}
            role={SPEAKER_ROLE[active.speaker]}
            small={cam === 'broll'}
          />

          {cam === 'speaker' ? (
            <>
              {active.broll && (
                <Card
                  top={170}
                  right={80}
                  width={700}
                  title="Imagem de apoio"
                  body={active.broll}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  top: 330,
                  left: 0,
                  width: WIDTH,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 56,
                    fontWeight: '800',
                    lineHeight: 1.25,
                    textAlign: 'center',
                    maxWidth: 1560,
                    textShadow: '0 4px 12px rgba(0,0,0,0.45)',
                    whiteSpace: 'normal',
                  }}
                >
                  {active.text}
                </div>
              </div>
              <HighlightPills seg={active} />
            </>
          ) : (
            <>
              {active.broll && (
                <Card
                  top={140}
                  right={60}
                  width={860}
                  height={520}
                  big
                  title="B-ROLL DE APOIO (material licenciado)"
                  body={active.broll}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  top: 700,
                  left: 0,
                  width: WIDTH,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    color: '#e2e8f0',
                    fontSize: 40,
                    fontWeight: '700',
                    lineHeight: 1.3,
                    textAlign: 'center',
                    maxWidth: 1300,
                    textShadow: '0 4px 12px rgba(0,0,0,0.45)',
                    whiteSpace: 'normal',
                  }}
                >
                  {active.text}
                </div>
              </div>
            </>
          )}
        </>
      ) : null}

      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 60,
          right: 60,
          height: 8,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: color,
            width: `${Math.min(100, (time / DURATION_SECONDS) * 100)}%`,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 60,
          color: '#94a3b8',
          fontSize: 28,
          fontFamily: 'monospace',
          fontWeight: '700',
        }}
      >
        {Math.floor(time / 60)}:{String(Math.floor(time % 60)).padStart(2, '0')} / 08:00
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          width: WIDTH,
          color: '#64748b',
          fontSize: 20,
          textAlign: 'center',
          paddingBottom: 12,
        }}
      >
        Personagens fictícios · Conteúdo informativo · Confirme os números na fonte na data da gravação
      </div>
    </div>
  );
};

export const GreciaEmEbulicao = VideoContent;
