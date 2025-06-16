// pages/home.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccessGuard from '@/components/AccessGuard';

export default function Home() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerSmall, setTimerSmall] = useState(false);
  const [blinkColor, setBlinkColor] = useState('red');
  const [fadeOverlay, setFadeOverlay] = useState(true);
  const [codeWord] = useState(() => {
    const words = ['Falcon', 'Bridge', 'Crate', 'Torch', 'Spire', 'Drum', 'Fang', 'Box', 'Quill', 'Dust', 'Bell', 'Shell', 'Key', 'Brick', 'Crown', 'Stone', 'Frost', 'Flame', 'Root', 'Vault'];
    return words[Math.floor(Math.random() * words.length)];
  });

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const beep = (duration = 100) => {
    const ctx = new (window.AudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1500, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration / 1000);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const timestamp = localStorage.getItem('access_time');
    if (!timestamp) return;
    setTimeLeft(300);
    speak('5 Minute Access Window Starting ... Now.');

    let lastBeepSecond = -1;
    let expiredSpoken = false;
    let blinkToggle = false;

    const animateDelay = 187;
    const animateTimeout = setTimeout(() => {
      setTimerSmall(true);
      setFadeOverlay(false);
    }, animateDelay);

    const blinkInterval = setInterval(() => {
      blinkToggle = !blinkToggle;
      setBlinkColor(blinkToggle ? 'yellow' : 'red');
    }, 500);

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - parseInt(timestamp);
      const remaining = 5 * 60 * 1000 - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        clearTimeout(animateTimeout);
        clearInterval(blinkInterval);
        localStorage.removeItem('access_granted');
        localStorage.removeItem('access_time');
        router.replace('/');
      } else {
        const secondsLeft = Math.floor(remaining / 1000);
        setTimeLeft(secondsLeft);

        if (secondsLeft === 3 && !expiredSpoken) {
          speak('Access Time expired, resetting.');
          expiredSpoken = true;
        }

        if (secondsLeft <= 60) {
          let beepCount = 1;
          let beepInterval = 3;
          if (secondsLeft <= 10) {
            beepCount = 3;
            beepInterval = 1;
          } else if (secondsLeft <= 20) {
            beepCount = 2;
            beepInterval = 1;
          } else if (secondsLeft <= 30) {
            beepCount = 1;
            beepInterval = 1;
          }

          if (lastBeepSecond === -1 || (lastBeepSecond - secondsLeft) >= beepInterval) {
            for (let i = 0; i < beepCount; i++) {
              setTimeout(() => beep(80), i * 150);
            }
            lastBeepSecond = secondsLeft;
          }
        }
      }
    }, 250);

    return () => {
      clearInterval(interval);
      clearTimeout(animateTimeout);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <AccessGuard>
      <div style={{
        minHeight: '100vh', backgroundColor: '#111', color: '#eee', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", overflow: 'hidden',
        userSelect: 'none', position: 'relative'
      }}>

        {fadeOverlay && (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: '#111', zIndex: 1, transition: 'opacity 1.5s ease-in-out', opacity: fadeOverlay ? 1 : 0
          }}></div>
        )}

        <div style={{
          position: 'absolute',
          top: timerSmall ? '20px' : '50%',
          right: timerSmall ? '20px' : '50%',
          transform: timerSmall ? 'translate(0, 0)' : 'translate(50%, -50%)',
          backgroundColor: '#220000',
          padding: timerSmall ? '8px 16px' : '30px 40px',
          border: '2px solid red',
          borderRadius: '16px',
          fontWeight: 'bold',
          color: timeLeft <= 30 ? blinkColor : 'red',
          textAlign: 'center',
          transition: 'all 1.5s ease-in-out',
          animation: timeLeft <= 60 ? (timeLeft <= 30 ? 'flashColor 1s infinite' : 'flash 1.5s infinite') : 'none',
          zIndex: 2,
        }}>
          <div style={{ fontSize: timerSmall ? '1rem' : '1.8rem', whiteSpace: 'nowrap' }}>Time Remaining:</div>
          <div style={{ fontSize: timerSmall ? '1.5rem' : '4.2rem' }}>{formatTime(timeLeft)}</div>
        </div>

        <div style={{ zIndex: 0, textAlign: 'center', paddingTop: '160px' }}>
          <div style={{ marginBottom: '8px' }}>
            <h2 style={{ borderBottom: '2px solid #444', display: 'inline-block', paddingBottom: '6px' }}>Code Word:</h2>
          </div>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: 'blue',
            border: '2px solid blue',
            borderRadius: '12px',
            padding: '10px 20px',
            display: 'inline-block',
            marginBottom: '30px'
          }}>
            {codeWord}
          </div>

          <button style={{
            padding: '6px 10px',
            fontSize: '1rem',
            fontFamily: "'Orbitron', sans-serif",
            borderRadius: '8px',
            background: '#2266bb',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            minWidth: '100px'
          }}
            onClick={() => alert('Take Picture Clicked (placeholder)')}
          >
            📷 Submit
          </button>
        </div>

        <style jsx>{`
          @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes flashColor {
            0%, 100% { color: red; }
            50% { color: yellow; }
          }
        `}</style>
      </div>
    </AccessGuard>
  );
}
