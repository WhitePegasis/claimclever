
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Claim } from '@/lib/data';
import ClaimsCard from '@/components/ui/ClaimsCard';
import { Search, Filter } from 'lucide-react';

interface ClaimsListProps {
  claims: Claim[];
}

const ClaimsList = ({ claims }: ClaimsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [fraudFilter, setFraudFilter] = useState<string>('');

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = 
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || claim.status === statusFilter;
    const matchesType = !typeFilter || claim.type === typeFilter;
    const matchesFraud = !fraudFilter || claim.fraudRisk.level === fraudFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesFraud;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search claims..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="w-[130px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-[130px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="Auto">Auto</SelectItem>
                <SelectItem value="Property">Property</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Life">Life</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-[130px]">
            <Select value={fraudFilter} onValueChange={setFraudFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-risks">All Risks</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredClaims.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg bg-muted/30">
          <p className="text-muted-foreground">No claims found</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setTypeFilter('');
              setFraudFilter('');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClaims.map((claim, index) => (
            <ClaimsCard 
              key={claim.id} 
              claim={claim} 
              className={`transition-all duration-300 delay-${index * 100} animate-slide-up`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimsList;
