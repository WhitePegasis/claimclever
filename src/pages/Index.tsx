
import React from 'react';
import StatsCards from '@/components/dashboard/Stats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { stats, recentActivity, claims } from '@/lib/data';
import { FileText, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClaimsCard from '@/components/ui/ClaimsCard';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  const navigate = useNavigate();
  
  // Get the high risk claims
  const highRiskClaims = claims.filter(claim => claim.fraudRisk.level === 'High');
  
  // Get the newest claims (top 3)
  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <div className="container max-w-7xl pt-20 px-4 mx-auto">
        <header className="py-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of claims processing, fraud detection, and entity extraction.</p>
        </header>
        
        <div className="space-y-8">
          <StatsCards stats={stats} />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-md font-medium">Recent Claims</CardTitle>
                  <CardDescription>
                    The latest submitted claims
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate('/claims')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map(claim => (
                    <ClaimsCard key={claim.id} claim={claim} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-md font-medium">Fraud Alerts</CardTitle>
                    <CardDescription>
                      High risk claims requiring attention
                    </CardDescription>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  {highRiskClaims.length > 0 ? (
                    <div className="space-y-4">
                      {highRiskClaims.map(claim => (
                        <ClaimsCard key={claim.id} claim={claim} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <p className="text-muted-foreground text-sm">No high-risk claims detected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-md font-medium">Entity Extraction</CardTitle>
                    <CardDescription>
                      AI-powered data extraction
                    </CardDescription>
                  </div>
                  <Cpu className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
                    <div className="text-3xl font-bold">{claims.reduce((acc, claim) => acc + claim.entities.length, 0)}</div>
                    <p className="text-muted-foreground text-sm">Entities extracted from claims</p>
                    <Button variant="outline" size="sm" onClick={() => navigate('/claims')}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
