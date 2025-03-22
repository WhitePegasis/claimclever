
import React from 'react';
import { ChevronRight, AlertTriangle, Shield, ShieldCheck } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import FraudBadge from '@/components/ui/FraudBadge';
import { Claim } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';

interface FraudRiskTableProps {
  claims: Claim[];
  onRowClick: (id: string) => void;
}

const FraudRiskTable = ({ claims, onRowClick }: FraudRiskTableProps) => {
  // Sort claims by fraud risk score (highest first)
  const sortedClaims = [...claims].sort((a, b) => b.fraudRisk.score - a.fraudRisk.score);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claim #</TableHead>
            <TableHead>Claimant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedClaims.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
                No claims matching your filter criteria
              </TableCell>
            </TableRow>
          ) : (
            sortedClaims.map((claim) => (
              <TableRow key={claim.id} onClick={() => onRowClick(claim.id)} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                <TableCell>{claim.claimant}</TableCell>
                <TableCell>{formatDate(claim.dateSubmitted)}</TableCell>
                <TableCell>{claim.type}</TableCell>
                <TableCell>{formatCurrency(claim.amount)}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${claim.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      claim.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      claim.status === 'In Review' ? 'bg-blue-100 text-blue-700' :
                      claim.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {claim.status}
                  </span>
                </TableCell>
                <TableCell>
                  <FraudBadge level={claim.fraudRisk.level} score={claim.fraudRisk.score} showScore />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FraudRiskTable;
