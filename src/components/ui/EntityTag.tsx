
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { User, Building2, MapPin, CalendarDays, DollarSign, FileText } from 'lucide-react';
import { Entity } from '@/lib/data';

interface EntityTagProps {
  entity: Entity;
  className?: string;
  showConfidence?: boolean;
}

const EntityTag = ({ entity, className, showConfidence = false }: EntityTagProps) => {
  const getEntityContent = () => {
    switch (entity.type) {
      case 'Person':
        return {
          icon: <User size={12} className="mr-1" />,
          colorClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
        };
      case 'Organization':
        return {
          icon: <Building2 size={12} className="mr-1" />,
          colorClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
        };
      case 'Location':
        return {
          icon: <MapPin size={12} className="mr-1" />,
          colorClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        };
      case 'Date':
        return {
          icon: <CalendarDays size={12} className="mr-1" />,
          colorClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        };
      case 'Amount':
        return {
          icon: <DollarSign size={12} className="mr-1" />,
          colorClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
        };
      case 'Document':
        return {
          icon: <FileText size={12} className="mr-1" />,
          colorClass: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
        };
      default:
        return {
          icon: null,
          colorClass: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
        };
    }
  };

  const content = getEntityContent();
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(
        'flex items-center py-0.5 px-2 text-xs font-normal rounded-full transition-all',
        content.colorClass,
        className
      )}
    >
      {content.icon}
      <span className="truncate max-w-[180px]">
        {entity.value}
        {showConfidence && ` (${Math.round(entity.confidence * 100)}%)`}
      </span>
    </Badge>
  );
};

export default EntityTag;
