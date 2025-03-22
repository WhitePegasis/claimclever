
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Claim } from '@/lib/data';

interface FraudMetricsProps {
  claims: Claim[];
}

const FraudMetrics = ({ claims }: FraudMetricsProps) => {
  // Count claims by risk level
  const highRiskCount = claims.filter(claim => claim.fraudRisk.level === 'High').length;
  const mediumRiskCount = claims.filter(claim => claim.fraudRisk.level === 'Medium').length;
  const lowRiskCount = claims.filter(claim => claim.fraudRisk.level === 'Low').length;
  
  // Calculate percentages
  const totalClaims = claims.length;
  const highRiskPercentage = totalClaims ? Math.round((highRiskCount / totalClaims) * 100) : 0;
  const mediumRiskPercentage = totalClaims ? Math.round((mediumRiskCount / totalClaims) * 100) : 0;
  const lowRiskPercentage = totalClaims ? Math.round((lowRiskCount / totalClaims) * 100) : 0;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            High Risk Claims
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-fraud-high" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highRiskCount}</div>
          <p className="text-xs text-muted-foreground">
            {highRiskPercentage}% of total claims
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Medium Risk Claims
          </CardTitle>
          <Shield className="h-4 w-4 text-fraud-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediumRiskCount}</div>
          <p className="text-xs text-muted-foreground">
            {mediumRiskPercentage}% of total claims
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Low Risk Claims
          </CardTitle>
          <ShieldCheck className="h-4 w-4 text-fraud-low" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowRiskCount}</div>
          <p className="text-xs text-muted-foreground">
            {lowRiskPercentage}% of total claims
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default FraudMetrics;
