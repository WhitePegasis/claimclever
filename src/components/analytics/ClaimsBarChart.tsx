
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { claims } from '@/lib/data';

// Aggregate data by claim type
const ClaimsBarChart = () => {
  // Prepare chart data by claim type
  const typeMap: Record<string, number> = {};
  claims.forEach(claim => {
    typeMap[claim.type] = (typeMap[claim.type] || 0) + 1;
  });

  const data = Object.entries(typeMap).map(([type, count]) => ({
    type,
    count
  }));

  const colors = ['#2563eb', '#4f46e5', '#7c3aed', '#9333ea'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims by Type</CardTitle>
        <CardDescription>
          Distribution of claims across different insurance types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsBarChart;
