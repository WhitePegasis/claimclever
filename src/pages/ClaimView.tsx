
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { claims } from '@/lib/data';
import { useParams, useNavigate } from 'react-router-dom';
import ClaimDetails from '@/components/claims/ClaimDetails';
import Navbar from '@/components/layout/Navbar';

const ClaimView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const claim = claims.find(c => c.id === id);
  
  if (!claim) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Claim Not Found</h1>
          <p className="text-muted-foreground mb-4">The claim you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/claims')}>
            Go Back to Claims
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <div className="container max-w-7xl pt-20 px-4 mx-auto">
        <div className="py-6">
          <Button 
            variant="ghost" 
            className="mb-4 pl-2 pr-4" 
            onClick={() => navigate('/claims')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Claims
          </Button>
          
          <ClaimDetails claim={claim} />
        </div>
      </div>
    </div>
  );
};

export default ClaimView;
