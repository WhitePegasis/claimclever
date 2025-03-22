
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FraudBadge from '@/components/ui/FraudBadge';
import { claims } from "@/lib/data";
import ClaimsLayout from "@/components/layout/ClaimsLayout";
import FraudRiskTable from '@/components/fraud/FraudRiskTable';
import FraudMetrics from '@/components/fraud/FraudMetrics';

const Fraud = () => {
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter claims by fraud risk level
  const filteredClaims = claims.filter(claim => {
    const matchesRisk = riskFilter === 'all' || 
      (riskFilter === 'High' && claim.fraudRisk.level === 'High') ||
      (riskFilter === 'Medium' && claim.fraudRisk.level === 'Medium') ||
      (riskFilter === 'Low' && claim.fraudRisk.level === 'Low');
    
    const matchesSearch = 
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRisk && matchesSearch;
  });

  // Get high risk claims
  const highRiskClaims = claims.filter(claim => claim.fraudRisk.level === 'High');
  
  return (
    <ClaimsLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fraud Detection</h1>
            <p className="text-muted-foreground">
              Monitor and investigate potentially fraudulent claims
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search claims..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FraudMetrics claims={claims} />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Claims By Risk Level</h2>
          </div>
          <FraudRiskTable claims={filteredClaims} onRowClick={(id) => navigate(`/claims/${id}`)} />
        </div>

        {highRiskClaims.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">High Risk Factors</h2>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {highRiskClaims.map(claim => (
                <Card key={claim.id} className="border-l-4 border-l-fraud-high">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{claim.claimant}</CardTitle>
                        <CardDescription>{claim.claimNumber} | {claim.type} Claim</CardDescription>
                      </div>
                      <FraudBadge level={claim.fraudRisk.level} score={claim.fraudRisk.score} showScore />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {claim.fraudRisk.reasons && (
                      <ul className="space-y-2">
                        {claim.fraudRisk.reasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-fraud-high shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="ml-auto" 
                      onClick={() => navigate(`/claims/${claim.id}`)}
                    >
                      View Claim Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ClaimsLayout>
  );
};

export default Fraud;
