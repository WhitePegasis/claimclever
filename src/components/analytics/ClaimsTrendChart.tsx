
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample claims status trend data
const statusTrendData = [
  { 
    month: 'Jan',
    Approved: 1,
    Rejected: 0,
    Pending: 1,
    'In Review': 1,
  },
  { 
    month: 'Feb',
    Approved: 2,
    Rejected: 1,
    Pending: 1,
    'In Review': 1,
  },
  { 
    month: 'Mar',
    Approved: 2,
    Rejected: 0,
    Pending: 2,
    'In Review': 0,
  },
  { 
    month: 'Apr',
    Approved: 3,
    Rejected: 1,
    Pending: 2,
    'In Review': 1,
  },
  { 
    month: 'May',
    Approved: 4,
    Rejected: 2,
    Pending: 2,
    'In Review': 1,
  },
  { 
    month: 'Jun',
    Approved: 3,
    Rejected: 1,
    Pending: 1,
    'In Review': 1,
  },
];

const ClaimsTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims Status Trends</CardTitle>
        <CardDescription>
          Monthly claims by status over the past 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={statusTrendData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Approved" stroke="#10b981" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Rejected" stroke="#ef4444" />
              <Line type="monotone" dataKey="Pending" stroke="#f59e0b" />
              <Line type="monotone" dataKey="In Review" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsTrendChart;
