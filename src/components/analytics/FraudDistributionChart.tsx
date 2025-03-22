
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { claims } from '@/lib/data';

const FraudDistributionChart = () => {
  // Count claims by fraud risk level
  const highRiskCount = claims.filter(claim => claim.fraudRisk.level === 'High').length;
  const mediumRiskCount = claims.filter(claim => claim.fraudRisk.level === 'Medium').length;
  const lowRiskCount = claims.filter(claim => claim.fraudRisk.level === 'Low').length;
  
  const data = [
    { name: 'High Risk', value: highRiskCount, color: '#ef4444' },
    { name: 'Medium Risk', value: mediumRiskCount, color: '#f59e0b' },
    { name: 'Low Risk', value: lowRiskCount, color: '#10b981' },
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Risk Distribution</CardTitle>
        <CardDescription>
          Distribution of claims by fraud risk level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudDistributionChart;
