// components/AccessGuard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const granted = localStorage.getItem('access_granted');
    const timestamp = localStorage.getItem('access_time');

    const isExpired = !timestamp || Date.now() - parseInt(timestamp) > 5 * 60 * 1000;

    if (!granted || isExpired) {
      localStorage.removeItem('access_granted');
      localStorage.removeItem('access_time');
      router.replace('/');
    } else {
      setAuthorized(true);
    }
  }, []);

  return authorized ? children : null;
}
