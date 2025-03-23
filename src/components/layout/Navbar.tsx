
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  FileText, 
  Home, 
  Book, 
  MessageSquare, 
  PieChart,
  ClipboardCheck, 
  User,
  Menu,
  X
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Classrooms', path: '/classrooms', icon: <Book className="h-4 w-4" /> },
    { name: 'Materials', path: '/materials', icon: <FileText className="h-4 w-4" /> },
    { name: 'Assignments', path: '/assignments', icon: <ClipboardCheck className="h-4 w-4" /> },
    { name: 'Attendance', path: '/attendance', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Performance', path: '/performance', icon: <PieChart className="h-4 w-4" /> },
    { name: 'Discussions', path: '/discussions', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block">
              SmartLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-1 ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right side items */}
          <div className="flex items-center">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="mr-1 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 border border-gray-200">
                <User className="h-4 w-4" />
              </Avatar>
              <span className="hidden sm:inline-block font-medium text-sm">Alex Johnson</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-2">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-slide-up">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
