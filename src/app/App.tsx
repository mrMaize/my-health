import React from 'react';
import LoginPage from '../pages/login/LoginPage';
import { Providers } from './providers';
import { GuestLayout } from '../layouts';

function AppInner() {
  return (
    <GuestLayout>
      <LoginPage />
    </GuestLayout>
  );
}

function App() {
  return (
    <Providers>
      <AppInner />
    </Providers>
  );
}

export { App };
