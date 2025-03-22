
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileText, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Stats } from '@/lib/data';

interface StatsCardsProps {
  stats: Stats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
          <FileText className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClaims}</div>
          <p className="text-xs text-muted-foreground">
            {stats.newClaims} new in the last 7 days
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.approvedClaims}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.approvedClaims / stats.totalClaims) * 100).toFixed(1)}% approval rate
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          <XCircle className="w-4 h-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rejectedClaims}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.rejectedClaims / stats.totalClaims) * 100).toFixed(1)}% rejection rate
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
          <Clock className="w-4 h-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageProcessingTime.toFixed(1)} days</div>
          <p className="text-xs text-muted-foreground">
            Average time to resolution
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in [animation-delay:400ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
          <AlertTriangle className="w-4 h-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.fraudDetected}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.fraudDetected / stats.totalClaims) * 100).toFixed(1)}% of total claims
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden animate-fade-in [animation-delay:500ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">New Claims</CardTitle>
          <AlertCircle className="w-4 h-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newClaims}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting initial review
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
