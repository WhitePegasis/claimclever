
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { claims } from '@/lib/data';
import ClaimsList from '@/components/claims/ClaimsList';
import Navbar from '@/components/layout/Navbar';
import { toast } from '@/components/ui/sonner';

const Claims = () => {
  const handleNewClaim = () => {
    toast.info('Feature coming soon', {
      description: 'The ability to create new claims will be available in a future update.',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <div className="container max-w-7xl pt-20 px-4 mx-auto">
        <header className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Claims Management</h1>
            <p className="text-muted-foreground">View and manage all insurance claims.</p>
          </div>
          <Button className="mt-4 sm:mt-0" onClick={handleNewClaim}>
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </header>
        
        <ClaimsList claims={claims} />
      </div>
    </div>
  );
};

export default Claims;
