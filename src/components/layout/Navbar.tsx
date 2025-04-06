
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FileText, Home, AlertTriangle, BarChart3, Settings } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <Home className="h-5 w-5" />
  },
  {
    title: 'Claims',
    href: '/claims',
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: 'Fraud Detection',
    href: '/fraud',
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

const Navbar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-30 glassmorphism px-4 py-3 flex items-center justify-between border-b">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold">CP</div>
          <span className="text-lg font-medium hidden sm:inline-block">Claims Pro</span>
        </Link>
      </div>
      
      <nav className="flex items-center space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:h-10 rounded-full sm:rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted",
              location.pathname === item.href && "bg-muted text-foreground"
            )}
          >
            <span className="sm:hidden">{item.icon}</span>
            <span className="hidden sm:flex items-center space-x-2">
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
