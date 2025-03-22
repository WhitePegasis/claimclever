
import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Claim } from '@/lib/data';
import FraudBadge from '@/components/ui/FraudBadge';
import EntityTag from '@/components/ui/EntityTag';
import { formatDistanceToNow, format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ClaimDetailsProps {
  claim: Claim;
}

const ClaimDetails = ({ claim }: ClaimDetailsProps) => {
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const timeSince = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const handleApprove = () => {
    toast.success('Claim has been approved', {
      description: `Claim ${claim.claimNumber} has been approved successfully.`,
    });
  };

  const handleReject = () => {
    toast.error('Claim has been rejected', {
      description: `Claim ${claim.claimNumber} has been rejected.`,
    });
  };

  const handleReview = () => {
    toast.info('Claim marked for review', {
      description: `Claim ${claim.claimNumber} has been marked for additional review.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex gap-2 mb-2">
                {getStatusBadge(claim.status)}
                {getTypeBadge(claim.type)}
              </div>
              <CardTitle className="text-2xl font-semibold">
                {claim.claimNumber}
              </CardTitle>
              <CardDescription>
                {claim.policyNumber} • Submitted {timeSince(claim.dateSubmitted)}
              </CardDescription>
            </div>
            <FraudBadge level={claim.fraudRisk.level} score={claim.fraudRisk.score} showScore />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Claim Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Claimant</p>
                  <p className="font-medium">{claim.claimant}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">{formatCurrency(claim.amount)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Submitted Date</p>
                  <p className="font-medium">{formatDate(claim.dateSubmitted)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(claim.dateUpdated)}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p className="text-sm">{claim.description}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Extracted Entities</h3>
              <div className="flex flex-wrap gap-2">
                {claim.entities.map((entity) => (
                  <EntityTag key={entity.id} entity={entity} />
                ))}
              </div>
            </div>
            
            {claim.fraudRisk.level === 'High' && claim.fraudRisk.reasons && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <h3 className="text-sm font-medium text-red-500">Fraud Risk Indicators</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    {claim.fraudRisk.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4 flex justify-end gap-3">
          {claim.status !== 'Rejected' && (
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          )}
          
          {claim.status !== 'Approved' && (
            <Button variant="default" onClick={handleApprove}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          )}
          
          <Button variant="outline" onClick={handleReview}>
            <Clock className="mr-2 h-4 w-4" />
            Mark for Review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClaimDetails;
