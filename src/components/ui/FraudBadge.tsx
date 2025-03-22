
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FraudBadgeProps {
  level: 'Low' | 'Medium' | 'High';
  score?: number;
  className?: string;
  showScore?: boolean;
}

const FraudBadge = ({ level, score, className, showScore = false }: FraudBadgeProps) => {
  const getBadgeContent = () => {
    switch (level) {
      case 'Low':
        return {
          icon: <ShieldCheck size={14} className="mr-1" />,
          text: 'Low Risk',
          variant: 'outline',
          colorClass: 'text-fraud-low border-fraud-low bg-fraud-low/10'
        };
      case 'Medium':
        return {
          icon: <Shield size={14} className="mr-1" />,
          text: 'Medium Risk',
          variant: 'outline',
          colorClass: 'text-fraud-medium border-fraud-medium bg-fraud-medium/10'
        };
      case 'High':
        return {
          icon: <ShieldAlert size={14} className="mr-1" />,
          text: 'High Risk',
          variant: 'outline',
          colorClass: 'text-fraud-high border-fraud-high bg-fraud-high/10'
        };
      default:
        return {
          icon: <ShieldCheck size={14} className="mr-1" />,
          text: 'Unknown',
          variant: 'outline',
          colorClass: 'text-muted-foreground'
        };
    }
  };

  const content = getBadgeContent();
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'flex items-center py-1 px-2 h-6 transition-all',
        content.colorClass,
        className
      )}
    >
      {content.icon}
      <span>
        {content.text}
        {showScore && score !== undefined && ` (${(score * 100).toFixed(0)}%)`}
      </span>
    </Badge>
  );
};

export default FraudBadge;
