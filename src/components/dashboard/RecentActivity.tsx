
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const navigate = useNavigate();
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'claim_created':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'fraud_detected':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'status_updated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'payment_issued':
        return <Clock className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const timeSince = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const handleClick = (claimId?: string) => {
    if (claimId) {
      navigate(`/claims/${claimId}`);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className={`flex items-start p-4 border-t border-border hover:bg-muted/30 transition-colors ${activity.claimId ? 'cursor-pointer' : ''}`}
              onClick={() => handleClick(activity.claimId)}
            >
              <div className="mr-3 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{timeSince(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
