
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {mainNavItems.map((item) => 
                  item.children ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className="h-9 px-3">
                        <span className="flex items-center gap-1.5">
                          {item.icon}
                          <span>{item.name}</span>
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-1 p-2">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link 
                                to={child.path}
                                className={cn(
                                  "flex items-center gap-2 rounded-md p-2 hover:bg-accent",
                                  location.pathname === child.path ? "bg-accent text-accent-foreground" : ""
                                )}
                              >
                                {child.icon}
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.name}>
                      <Link to={item.path}>
                        <NavigationMenuLink 
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "h-9 px-3",
                            location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            {item.icon}
                            <span>{item.name}</span>
                          </span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Right side items */}
          <div className="flex items-center">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="mr-1 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            {/* User Profile */}
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <User className="h-4 w-4" />
                </Avatar>
                <span className="hidden sm:inline-block font-medium text-sm">Alex Johnson</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </Link>

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
