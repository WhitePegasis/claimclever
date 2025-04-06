
import React from 'react';
import Navbar from '@/components/layout/Navbar';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-16 pb-8">
        <div className="mt-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;
