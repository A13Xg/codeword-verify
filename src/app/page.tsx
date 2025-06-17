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
      // Unlock AudioContext on first user interaction
      const AudioContextClass = window.AudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();

        // Play a very short silent sound to unlock audio on some browsers
        const oscillator = audioCtx.createOscillator();
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.01);
      }

      localStorage.setItem('access_granted', 'true');
      localStorage.setItem('access_time', Date.now().toString());
      router.push('/home');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div
      className="container"
      style={{
      fontFamily: "'Share Tech Mono', monospace",
      backgroundColor: '#121212',
      color: '#eee',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      }}
    >
      <h1>Enter Access Code</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <input
          type="password"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
        fontSize: '1.5rem',
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: '1px solid #444',
        backgroundColor: '#222',
        color: '#eee',
        textAlign: 'center',
        width: '250px',
        maxWidth: '100%',
          }}
          autoFocus
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            type="submit"
            style={{
              fontSize: '1.5rem',
              padding: '0.5rem 5rem',
              borderRadius: '4px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Enter
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
