
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, Mail, Phone, MapPin, Calendar, GraduationCap, 
  Shield, Edit, Upload, Award, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from 'recharts';

const ProfilePage = () => {
  // Attendance data for chart
  const attendanceData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 94 },
    { month: 'Mar', attendance: 88 },
    { month: 'Apr', attendance: 95 },
    { month: 'May', attendance: 97 },
    { month: 'Jun', attendance: 93 },
  ];

  // Subject performance data
  const subjectPerformance = [
    { name: 'Mathematics', value: 85 },
    { name: 'Physics', value: 78 },
    { name: 'Literature', value: 92 },
    { name: 'Computer Science', value: 95 },
    { name: 'Chemistry', value: 82 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Academic achievements
  const achievements = [
    { title: 'Dean\'s List', date: 'Fall 2023', icon: Award },
    { title: 'Science Project Winner', date: 'Apr 2023', icon: BookOpen },
    { title: 'Perfect Attendance', date: 'Spring 2023', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your student profile</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side - Profile Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="overflow-hidden animate-fade-in">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 bg-white rounded-full p-1 shadow-md">
                  <Avatar className="h-24 w-24">
                    <User className="h-12 w-12" />
                  </Avatar>
                </div>
                <div className="pt-14">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">Alex Johnson</h2>
                      <p className="text-gray-600">Student ID: STU2023456</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex gap-1 items-center">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex flex-col space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>alex.johnson@example.edu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>New York, USA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Joined: September 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="animate-fade-in delay-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Grade</p>
                  <p>11th Grade</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p>Science & Technology</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Class</p>
                  <p>11-A (2023-2024)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Academic Advisor</p>
                  <p>Dr. Sarah Collins</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Last updated 3 months ago</p>
                    </div>
                    <Button size="sm" variant="outline">Change</Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Disabled</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Login History</p>
                      <p className="text-sm text-gray-500">View your recent logins</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side - Performance and Stats */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Attendance Overview</span>
                  <Button variant="outline" size="sm">View Full Report</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={attendanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="#3B82F6" 
                        fill="#93C5FD" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in delay-100">
                <CardHeader>
                  <CardTitle className="text-lg">Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectPerformance}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {subjectPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-200">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <achievement.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">View All Achievements</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="animate-fade-in delay-300">
              <CardHeader>
                <CardTitle className="text-lg">Documents & Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {['Student ID', 'Transcript', 'Progress Report', 'Medical Form'].map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                      <FileText className="h-10 w-10 text-blue-500 mb-2" />
                      <p className="font-medium">{doc}</p>
                      <p className="text-xs text-gray-500 mt-1">Last updated: May 5, 2023</p>
                    </div>
                  ))}
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="font-medium text-gray-600">Upload New</p>
                    <p className="text-xs text-gray-500 mt-1">Add a new document</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Fix component not defined error
const Avatar = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
    <div className="flex h-full w-full items-center justify-center bg-muted rounded-full">
      {children}
    </div>
  </div>
);

export default ProfilePage;
