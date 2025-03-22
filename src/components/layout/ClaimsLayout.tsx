
import React from 'react';
import Navbar from '@/components/layout/Navbar';

interface ClaimsLayoutProps {
  children: React.ReactNode;
}

const ClaimsLayout = ({ children }: ClaimsLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-16 pb-8">
        {children}
      </main>
    </div>
  );
};

export default ClaimsLayout;
