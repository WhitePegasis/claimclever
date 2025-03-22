
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample claims volume data (since we don't have historic data in our data.ts)
const volumeData = [
  { month: 'Jan', count: 3 },
  { month: 'Feb', count: 5 },
  { month: 'Mar', count: 4 },
  { month: 'Apr', count: 7 },
  { month: 'May', count: 9 },
  { month: 'Jun', count: 6 },
  { month: 'Jul', count: 8 },
  { month: 'Aug', count: 10 },
  { month: 'Sep', count: 7 },
  { month: 'Oct', count: 5 },
  { month: 'Nov', count: 6 },
  { month: 'Dec', count: 7 },
];

const ClaimsVolumeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims Volume</CardTitle>
        <CardDescription>
          Monthly claims submission volume over the past year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={volumeData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
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
              <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsVolumeChart;
