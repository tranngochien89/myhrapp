
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle, rgba(38,38,38,1) 0%, rgba(26,26,26,1) 100%)',
    }}>
      {children}
    </div>
  );
}
