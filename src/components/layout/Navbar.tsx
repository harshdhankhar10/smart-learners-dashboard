
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
  X,
  HelpCircle,
  CreditCard,
  Settings,
  BookOpen,
  Clock,
  Lightbulb,
  MessagesSquare,
  UserPlus,
  BarChart
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-4 w-4" /> },
    { 
      name: 'Learning', 
      path: '#',
      icon: <Book className="h-4 w-4" />,
      children: [
        { name: 'Classrooms', path: '/classrooms', icon: <BookOpen className="h-4 w-4" /> },
        { name: 'Materials', path: '/materials', icon: <FileText className="h-4 w-4" /> },
        { name: 'Assignments', path: '/assignments', icon: <ClipboardCheck className="h-4 w-4" /> },
      ]
    },
    { 
      name: 'Activities', 
      path: '#',
      icon: <Calendar className="h-4 w-4" />,
      children: [
        { name: 'Attendance', path: '/attendance', icon: <Calendar className="h-4 w-4" /> },
        { name: 'Exams', path: '/exams', icon: <FileText className="h-4 w-4" /> },
        { name: 'Events', path: '/events', icon: <Clock className="h-4 w-4" /> },
      ]
    },
    { 
      name: 'Insights', 
      path: '#',
      icon: <PieChart className="h-4 w-4" />,
      children: [
        { name: 'Performance', path: '/performance', icon: <BarChart className="h-4 w-4" /> },
        { name: 'Recommendations', path: '/recommendations', icon: <Lightbulb className="h-4 w-4" /> },
      ]
    },
    { 
      name: 'Community', 
      path: '#',
      icon: <MessageSquare className="h-4 w-4" />,
      children: [
        { name: 'Discussions', path: '/discussions', icon: <MessageSquare className="h-4 w-4" /> },
        { name: 'Support', path: '/support', icon: <HelpCircle className="h-4 w-4" /> },
        { name: 'Parents Portal', path: '/parents', icon: <UserPlus className="h-4 w-4" /> },
      ]
    },
    { name: 'Payments', path: '/payments', icon: <CreditCard className="h-4 w-4" /> },
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
            <nav className="hidden md:flex items-center space-x-1">
              {mainNavItems.map((item) => 
                item.children ? (
                  <div key={item.name} className="relative group">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-9 px-3 flex items-center gap-1.5 ${
                        location.pathname === item.path ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 ml-0.5 opacity-70" />
                    </Button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link 
                              key={child.name}
                              to={child.path}
                              className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                                location.pathname === child.path ? 'bg-accent/50 text-accent-foreground' : 'text-gray-700'
                              }`}
                            >
                              {child.icon}
                              <span>{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={item.name} to={item.path}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-9 px-3 flex items-center gap-1.5 ${
                        location.pathname === item.path ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              )}
            </nav>
          )}

          {/* Right side items */}
          <div className="flex items-center">
            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-1 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-3 border-b">
                  <p className="font-medium">Notifications</p>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">New assignment posted</p>
                          <p className="text-xs text-gray-500">Mathematics - Linear Algebra</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <User className="h-4 w-4" />
                  </Avatar>
                  <span className="hidden sm:inline-block font-medium text-sm">Alex Johnson</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col items-center justify-center p-4 border-b">
                  <Avatar className="h-16 w-16 mb-2 border border-gray-200">
                    <User className="h-6 w-6" />
                  </Avatar>
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Student ID: ST12345</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
            {mainNavItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.children ? (
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3 p-3 font-medium">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-8 flex flex-col space-y-1 border-l border-gray-100 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`flex items-center space-x-3 p-2 rounded-md ${
                            location.pathname === child.path
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.icon}
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
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
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
