
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  MessageSquare, Clock, PlusCircle, Search, Filter, 
  AlertTriangle, CheckCircle, XCircle, HelpCircle, 
  UserPlus, PaperclipIcon, Send 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

const SupportPage = () => {
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  
  // Sample data for tickets
  const tickets = [
    {
      id: 'TKT-1234',
      subject: 'Unable to access online exam portal',
      category: 'Technical',
      status: 'open',
      priority: 'high',
      created: '2023-10-02T14:35:00',
      lastUpdated: '2023-10-04T10:22:00',
      messages: 3,
      assignedTo: 'IT Support Team'
    },
    {
      id: 'TKT-1212',
      subject: 'Question about assessment grading',
      category: 'Academic',
      status: 'pending',
      priority: 'medium',
      created: '2023-09-28T09:15:00',
      lastUpdated: '2023-09-30T16:40:00',
      messages: 5,
      assignedTo: 'Academic Affairs'
    },
    {
      id: 'TKT-1180',
      subject: 'Request for deadline extension',
      category: 'Academic',
      status: 'closed',
      priority: 'medium',
      created: '2023-09-15T11:22:00',
      lastUpdated: '2023-09-18T14:30:00',
      messages: 4,
      assignedTo: 'Prof. Williams'
    },
    {
      id: 'TKT-1156',
      subject: 'Issue with library card access',
      category: 'Administrative',
      status: 'resolved',
      priority: 'low',
      created: '2023-09-10T13:05:00',
      lastUpdated: '2023-09-11T09:15:00',
      messages: 2,
      assignedTo: 'Library Services'
    },
  ];
  
  // Data for analytics chart
  const analyticsData = [
    { name: 'Technical', value: 8 },
    { name: 'Academic', value: 12 },
    { name: 'Administrative', value: 5 },
    { name: 'Financial', value: 3 },
  ];
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  
  // Return status badge based on ticket status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>;
      default:
        return null;
    }
  };
  
  // Get icon based on priority
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <HelpCircle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Support Center</h1>
            <p className="text-gray-600 mt-1">Manage your support requests and get help</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button onClick={() => setNewTicketOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center">2</h3>
              <p className="text-gray-600 text-center">Active Tickets</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-100">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center">5</h3>
              <p className="text-gray-600 text-center">Resolved This Month</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-yellow-100 rounded-full p-3 mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-center">1.2 Days</h3>
              <p className="text-gray-600 text-center">Avg. Response Time</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>My Support Tickets</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        className="pl-9 pr-4 py-2 rounded-md border border-gray-200 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {tickets.map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              {getPriorityIcon(ticket.priority)}
                              <div>
                                <h3 className="font-medium">{ticket.subject}</h3>
                                <p className="text-sm text-gray-600">
                                  {ticket.id} • {ticket.category}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="hidden md:block">
                              <p>Created: {formatDate(ticket.created)}</p>
                              <p>Updated: {formatDate(ticket.lastUpdated)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(ticket.status)}
                              <p className="text-xs mt-1">
                                {ticket.messages} {ticket.messages === 1 ? 'message' : 'messages'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="open" className="space-y-4">
                    {tickets.filter(t => t.status === 'open').map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              {getPriorityIcon(ticket.priority)}
                              <div>
                                <h3 className="font-medium">{ticket.subject}</h3>
                                <p className="text-sm text-gray-600">
                                  {ticket.id} • {ticket.category}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="hidden md:block">
                              <p>Created: {formatDate(ticket.created)}</p>
                              <p>Updated: {formatDate(ticket.lastUpdated)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(ticket.status)}
                              <p className="text-xs mt-1">
                                {ticket.messages} {ticket.messages === 1 ? 'message' : 'messages'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  {/* Similar TabsContent for other tabs (pending, resolved) */}
                  <TabsContent value="pending" className="space-y-4">
                    {tickets.filter(t => t.status === 'pending').map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                      >
                        {/* Ticket content (same structure as above) */}
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              {getPriorityIcon(ticket.priority)}
                              <div>
                                <h3 className="font-medium">{ticket.subject}</h3>
                                <p className="text-sm text-gray-600">
                                  {ticket.id} • {ticket.category}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="hidden md:block">
                              <p>Created: {formatDate(ticket.created)}</p>
                              <p>Updated: {formatDate(ticket.lastUpdated)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(ticket.status)}
                              <p className="text-xs mt-1">
                                {ticket.messages} {ticket.messages === 1 ? 'message' : 'messages'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="resolved" className="space-y-4">
                    {tickets.filter(t => t.status === 'resolved' || t.status === 'closed').map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                      >
                        {/* Ticket content (same structure as above) */}
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              {getPriorityIcon(ticket.priority)}
                              <div>
                                <h3 className="font-medium">{ticket.subject}</h3>
                                <p className="text-sm text-gray-600">
                                  {ticket.id} • {ticket.category}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="hidden md:block">
                              <p>Created: {formatDate(ticket.created)}</p>
                              <p>Updated: {formatDate(ticket.lastUpdated)}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(ticket.status)}
                              <p className="text-xs mt-1">
                                {ticket.messages} {ticket.messages === 1 ? 'message' : 'messages'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Ticket Categories</CardTitle>
                <CardDescription>Distribution of your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {analyticsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tickets`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6 animate-fade-in delay-100">
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <h3 className="font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      FAQ Knowledge Base
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Find answers to common questions</p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <h3 className="font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Student Handbook
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Policies and procedures</p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <h3 className="font-medium flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-purple-500" />
                      Contact Directory
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Find staff and department contacts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* New Ticket Form */}
        {newTicketOpen && (
          <Card className="animate-fade-in mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Support Ticket</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setNewTicketOpen(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
              <CardDescription>Provide details about your issue or question</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="academic">Academic Query</option>
                      <option value="administrative">Administrative</option>
                      <option value="financial">Financial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="priority" value="low" className="h-4 w-4 text-blue-600" />
                      <span>Low</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="priority" value="medium" className="h-4 w-4 text-blue-600" checked />
                      <span>Medium</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="priority" value="high" className="h-4 w-4 text-blue-600" />
                      <span>High</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-3 border border-gray-200 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attachments (optional)</label>
                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <PaperclipIcon className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop files here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Max 5 files. PDF, PNG, JPG (Max 5MB each)</p>
                    <input type="file" className="hidden" multiple />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setNewTicketOpen(false)}>Cancel</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Need Immediate Help?</CardTitle>
            <CardDescription>Contact our support team directly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-600 mt-1">Available Mon-Fri, 9am-5pm</p>
                <Button variant="outline" className="mt-3 w-full">Start Chat</Button>
              </div>
              
              <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-gray-600 mt-1">+1 (555) 123-4567</p>
                <Button variant="outline" className="mt-3 w-full">Call Now</Button>
              </div>
              
              <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600 mt-1">support@smartlearn.edu</p>
                <Button variant="outline" className="mt-3 w-full">Send Email</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Fix missing component error
const Phone = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-phone", className)}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Mail = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-mail", className)}
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default SupportPage;
