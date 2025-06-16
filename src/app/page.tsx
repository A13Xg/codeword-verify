// pages/index.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem('access_granted');
    const timestamp = localStorage.getItem('access_time');

    if (access && timestamp) {
      const now = Date.now();
      if (now - parseInt(timestamp) < 5 * 60 * 1000) {
        router.push('/home');
      } else {
        localStorage.removeItem('access_granted');
        localStorage.removeItem('access_time');
      }
    }
  }, [router]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code === 'drew') {
      // Unlock AudioContext on first user interaction
      if (!window.AudioContext) {
        const AudioContext = window.AudioContext;
        window.AudioContext = new AudioContext();

        // Play a very short silent sound to unlock audio on some browsers
        const oscillator = window.AudioContext.createOscillator();
        oscillator.connect(window.AudioContext.destination);
        oscillator.start();
        oscillator.stop(window.AudioContext.currentTime + 0.01);
      }

      localStorage.setItem('access_granted', 'true');
      localStorage.setItem('access_time', Date.now().toString());
      router.push('/home');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div className="container" style={{ fontFamily: "'Share Tech Mono', monospace", backgroundColor: '#121212', color: '#eee', minHeight: '100vh', padding: '2rem' }}>
      <h1>Enter Access Code</h1>
      <input type='file' accept="image/png, image/gif, image/jpeg"/>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ fontSize: '1.5rem', padding: '0.5rem', marginRight: '1rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#eee' }}
          autoFocus
        />
        <button type="submit" style={{ fontSize: '1.5rem', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Enter
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
