
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const cardStyle = {
  backgroundColor: 'var(--card-background-color)',
  borderRadius: '8px',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  border: '1px solid var(--border-color)',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--background-color)',
  color: 'var(--text-color)',
  fontSize: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: 'var(--primary-color)',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/login');
    } else {
      setError(data.message || 'An error occurred');
    }
  };

  return (
    <div style={cardStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link href="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
      </p>
    </div>
  );
}
