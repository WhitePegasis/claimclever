
import React from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaimsLayout from "@/components/layout/ClaimsLayout";
import { claims, stats } from "@/lib/data";
import ClaimsBarChart from '@/components/analytics/ClaimsBarChart';
import ClaimsVolumeChart from '@/components/analytics/ClaimsVolumeChart';
import ClaimsTrendChart from '@/components/analytics/ClaimsTrendChart';
import FraudDistributionChart from '@/components/analytics/FraudDistributionChart';

const Analytics = () => {
  return (
    <ClaimsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Claims data and performance metrics
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Claims
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClaims}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.newClaims} new this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approval Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats.approvedClaims / stats.totalClaims) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.approvedClaims} approved claims
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Processing Time
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageProcessingTime} days</div>
              <p className="text-xs text-muted-foreground">
                From submission to decision
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fraud Detection
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fraudDetected}</div>
              <p className="text-xs text-muted-foreground">
                High risk cases identified
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="volume" className="space-y-4">
          <TabsList>
            <TabsTrigger value="volume">Claims Volume</TabsTrigger>
            <TabsTrigger value="type">Claims by Type</TabsTrigger>
            <TabsTrigger value="status">Claims by Status</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="volume" className="space-y-4">
            <ClaimsVolumeChart />
          </TabsContent>
          <TabsContent value="type" className="space-y-4">
            <ClaimsBarChart />
          </TabsContent>
          <TabsContent value="status" className="space-y-4">
            <ClaimsTrendChart />
          </TabsContent>
          <TabsContent value="fraud" className="space-y-4">
            <FraudDistributionChart />
          </TabsContent>
        </Tabs>
      </div>
    </ClaimsLayout>
  );
};

export default Analytics;
