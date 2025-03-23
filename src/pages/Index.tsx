
import React, { useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import AnnouncementsList from '@/components/dashboard/AnnouncementsList';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  // Simulate page loading effect
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <DashboardHeader />
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UpcomingDeadlines />
          <AnnouncementsList />
        </div>
        
        <PerformanceChart />
      </main>
    </div>
  );
};

export default Index;
