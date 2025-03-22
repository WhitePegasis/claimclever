
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Claim } from '@/lib/data';
import FraudBadge from './FraudBadge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ClaimsCardProps {
  claim: Claim;
  className?: string;
}

const ClaimsCard = ({ claim, className }: ClaimsCardProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'New':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'In Review':
        return <Badge className="bg-amber-500">In Review</Badge>;
      case 'Pending':
        return <Badge className="bg-purple-500">Pending</Badge>;
      case 'Approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: Claim['type']) => {
    switch (type) {
      case 'Auto':
        return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">Auto</Badge>;
      case 'Property':
        return <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800">Property</Badge>;
      case 'Health':
        return <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800">Health</Badge>;
      case 'Life':
        return <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">Life</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const timeSince = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const handleClick = () => {
    navigate(`/claims/${claim.id}`);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer card-hover", 
        className
      )}
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2 space-y-0 flex flex-row items-start justify-between">
        <div>
          <div className="flex gap-2 items-center mb-1">
            {getStatusBadge(claim.status)}
            {getTypeBadge(claim.type)}
          </div>
          <CardTitle className="text-lg font-medium">{claim.claimNumber}</CardTitle>
        </div>
        <FraudBadge level={claim.fraudRisk.level} score={claim.fraudRisk.score} />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-sm text-muted-foreground mb-2 truncate">{claim.description}</div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{claim.claimant}</span>
            <span className="text-sm font-semibold">{formatCurrency(claim.amount)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Policy: {claim.policyNumber}</span>
            <span>{timeSince(claim.dateSubmitted)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsCard;
