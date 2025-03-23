
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  CreditCard, Download, DollarSign, ArrowUp, ArrowDown, 
  FileText, Clock, CalendarDays, Search, Filter, PlusCircle,
  CheckCircle, AlertCircle, BarChart4, Wallet, Receipt, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data for payments
  const payments = [
    {
      id: 'INV-20231001',
      description: 'Tuition Fee - Fall Semester 2023',
      amount: 3500,
      dueDate: '2023-10-15',
      status: 'paid',
      paymentDate: '2023-10-05',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'INV-20231002',
      description: 'Laboratory Fee - Science',
      amount: 250,
      dueDate: '2023-10-20',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null
    },
    {
      id: 'INV-20231003',
      description: 'Library Access Fee',
      amount: 100,
      dueDate: '2023-10-25',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null
    },
    {
      id: 'INV-20230901',
      description: 'Technology Fee',
      amount: 150,
      dueDate: '2023-09-15',
      status: 'paid',
      paymentDate: '2023-09-12',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'INV-20230801',
      description: 'Registration Fee',
      amount: 75,
      dueDate: '2023-08-10',
      status: 'paid',
      paymentDate: '2023-08-08',
      paymentMethod: 'Online Payment'
    }
  ];
  
  // Sample data for expense categories
  const expenseBreakdown = [
    { category: 'Tuition', value: 3500 },
    { category: 'Lab Fees', value: 250 },
    { category: 'Library', value: 100 },
    { category: 'Technology', value: 150 },
    { category: 'Registration', value: 75 },
    { category: 'Others', value: 125 }
  ];
  
  // Calculate statistics
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalFees = totalPaid + totalPending;
  const paidPercentage = Math.round((totalPaid / totalFees) * 100);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Fees & Payments</h1>
            <p className="text-gray-600 mt-1">Manage your financial transactions and payments</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">
              <History className="h-4 w-4 mr-2" />
              Payment History
            </Button>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-blue-50 opacity-50"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Fees</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalFees)}</h3>
                  <p className="text-sm text-gray-600 mt-1">Academic Year 2023-24</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-green-50 opacity-50"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalPaid)}</h3>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Paid in full</span>
                  </div>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <ArrowUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-yellow-50 opacity-50"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Amount</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalPending)}</h3>
                  <div className="flex items-center text-sm text-yellow-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Due in 10 days</span>
                  </div>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <ArrowDown className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices & Receipts</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships & Aid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Payment Status</CardTitle>
                    <CardDescription>Current semester payment progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tuition Fee</span>
                          <span className="text-sm font-medium">Paid</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Laboratory Fee</span>
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Library Access</span>
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Technology Fee</span>
                          <span className="text-sm font-medium">Paid</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-sm font-medium">{paidPercentage}%</span>
                        </div>
                        <Progress value={paidPercentage} className="h-3" />
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Total Due</p>
                        <p className="font-bold">{formatCurrency(totalFees)}</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <p className="text-green-700 text-sm">Amount Paid</p>
                        <p className="font-bold text-green-700">{formatCurrency(totalPaid)}</p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 rounded-lg text-center">
                        <p className="text-yellow-700 text-sm">Remaining</p>
                        <p className="font-bold text-yellow-700">{formatCurrency(totalPending)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 animate-fade-in delay-100">
                  <CardHeader>
                    <CardTitle>Fee Distribution</CardTitle>
                    <CardDescription>Breakdown of your academic fees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={expenseBreakdown}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [formatCurrency(value), 'Amount']}
                            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#4F46E5" 
                            radius={[4, 4, 0, 0]} 
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.filter(p => p.status === 'pending').map((payment) => (
                        <div key={payment.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between">
                            <p className="font-medium">{payment.description}</p>
                            {getStatusBadge(payment.status)}
                          </div>
                          <div className="flex justify-between items-end mt-2">
                            <div className="text-sm">
                              <p className="text-gray-600">Due: {formatDate(payment.dueDate)}</p>
                              <p className="text-gray-600">Invoice: {payment.id}</p>
                            </div>
                            <p className="font-bold">{formatCurrency(payment.amount)}</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            Pay Now
                          </Button>
                        </div>
                      ))}
                      
                      {payments.filter(p => p.status === 'pending').length === 0 && (
                        <div className="text-center py-6">
                          <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                          <p className="font-medium">No upcoming payments</p>
                          <p className="text-sm text-gray-600">You're all caught up!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in delay-100">
                  <CardHeader>
                    <CardTitle>Payment Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg flex items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-600">Fast & secure</p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Wallet className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-gray-600">2-3 days processing</p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <Receipt className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Pay at Finance Office</p>
                          <p className="text-sm text-gray-600">Cash or check</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Set Up Auto Pay
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="invoices">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Invoices & Receipts</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search invoices..."
                        className="pl-9 pr-4 py-2 rounded-md border border-gray-200 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs uppercase text-gray-500">
                        <th className="px-4 py-3 text-left">Invoice ID</th>
                        <th className="px-4 py-3 text-left">Description</th>
                        <th className="px-4 py-3 text-left">Issue Date</th>
                        <th className="px-4 py-3 text-left">Due Date</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={payment.id} className={cn("transition-colors hover:bg-gray-50", index !== payments.length - 1 && "border-b border-gray-100")}>
                          <td className="px-4 py-4">
                            <span className="font-medium">{payment.id}</span>
                          </td>
                          <td className="px-4 py-4">{payment.description}</td>
                          <td className="px-4 py-4 text-gray-600">
                            {formatDate(payment.dueDate ? new Date(new Date(payment.dueDate).getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() : null)}
                          </td>
                          <td className="px-4 py-4 text-gray-600">{formatDate(payment.dueDate)}</td>
                          <td className="px-4 py-4 text-right font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-4 text-center">{getStatusBadge(payment.status)}</td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              PDF
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment-methods">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Saved Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative">
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Default</Badge>
                        </div>
                        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-12 w-20 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-600">Expires 05/2026</p>
                          </div>
                          <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                            <div className="flex gap-2 justify-start sm:justify-end">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Remove</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                          <div className="bg-gradient-to-r from-gray-700 to-gray-900 h-12 w-20 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Mastercard ending in 8567</p>
                            <p className="text-sm text-gray-600">Expires 11/2025</p>
                          </div>
                          <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                            <div className="flex gap-2 justify-start sm:justify-end">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Set Default</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Remove</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer">
                        <div className="text-center py-6">
                          <PlusCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="font-medium">Add New Payment Method</p>
                          <p className="text-sm text-gray-600 mt-1">Credit card, bank account, or other payment methods</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 animate-fade-in delay-100">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Recent transactions and payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.filter(p => p.status === 'paid').map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 border-b last:border-0">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{payment.description}</p>
                              <p className="text-sm text-gray-500">{formatDate(payment.paymentDate)} • {payment.paymentMethod}</p>
                            </div>
                          </div>
                          <p className="font-bold">{formatCurrency(payment.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Configure your payment preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Auto-Pay</p>
                          <p className="text-sm text-gray-600">Automatically pay dues on time</p>
                        </div>
                        <div className="bg-gray-200 w-12 h-6 rounded-full flex items-center p-1 cursor-pointer">
                          <div className="bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Payment Notifications</p>
                          <p className="text-sm text-gray-600">Get alerted about upcoming dues</p>
                        </div>
                        <div className="bg-primary w-12 h-6 rounded-full flex items-center justify-end p-1 cursor-pointer">
                          <div className="bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Email Receipts</p>
                          <p className="text-sm text-gray-600">Receive payment confirmations</p>
                        </div>
                        <div className="bg-primary w-12 h-6 rounded-full flex items-center justify-end p-1 cursor-pointer">
                          <div className="bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <p className="font-medium mb-2">Billing Address</p>
                      <div className="text-sm text-gray-600">
                        <p>Alex Johnson</p>
                        <p>123 Campus Drive</p>
                        <p>Apt 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Update Address
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 animate-fade-in delay-200">
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-600" />
                          Payment FAQ
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Find answers to common payment questions</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">View FAQ</Button>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-purple-600" />
                          Financial Aid Office
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Mon-Fri: 9am-5pm</p>
                        <p className="text-sm text-gray-600">Email: finance@smartlearn.edu</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">Contact Support</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scholarships">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Available Scholarships</CardTitle>
                    <CardDescription>Scholarships you may be eligible for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Academic Excellence Scholarship",
                          amount: "$2,500",
                          deadline: "2023-11-15",
                          requirements: "GPA 3.5+, Science major, 2nd year or above",
                          status: "eligible"
                        },
                        {
                          title: "STEM Research Grant",
                          amount: "$1,800",
                          deadline: "2023-12-01",
                          requirements: "Ongoing research project, Faculty recommendation",
                          status: "eligible"
                        },
                        {
                          title: "International Student Fund",
                          amount: "$3,000",
                          deadline: "2023-11-30",
                          requirements: "International student status, Financial need",
                          status: "ineligible"
                        }
                      ].map((scholarship, index) => (
                        <div key={index} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2 items-start">
                                <h3 className="font-semibold text-lg">{scholarship.title}</h3>
                                {scholarship.status === 'eligible' ? (
                                  <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800">Not Eligible</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Requirements:</span> {scholarship.requirements}
                              </p>
                              <div className="flex items-center text-sm text-gray-600 mt-2">
                                <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                                <span>Deadline: {formatDate(scholarship.deadline)}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end">
                              <p className="text-lg font-bold">{scholarship.amount}</p>
                              <p className="text-sm text-gray-600">per academic year</p>
                              
                              <Button 
                                disabled={scholarship.status !== 'eligible'} 
                                className="mt-3"
                                variant={scholarship.status === 'eligible' ? "default" : "outline"}
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 animate-fade-in delay-100">
                  <CardHeader>
                    <CardTitle>Financial Aid Status</CardTitle>
                    <CardDescription>Your current financial aid information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 text-sm">Total Aid Awarded</p>
                          <p className="font-bold text-lg">$7,500</p>
                          <p className="text-xs text-gray-500">2023-2024 Academic Year</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 text-sm">Aid Disbursed</p>
                          <p className="font-bold text-lg">$3,750</p>
                          <p className="text-xs text-gray-500">Fall Semester 2023</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 text-sm">Pending Disbursement</p>
                          <p className="font-bold text-lg">$3,750</p>
                          <p className="text-xs text-gray-500">Spring Semester 2024</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Academic Merit Scholarship</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Active</span></p>
                            <p className="text-sm text-gray-600">Amount: $5,000 per academic year</p>
                            <p className="text-sm text-gray-600">Maintenance Requirement: 3.5+ GPA</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Awarded Date: {formatDate('2023-08-15')}</p>
                            <p className="text-sm text-gray-600">Duration: 4 academic years</p>
                            <p className="text-sm text-gray-600">Current GPA: 3.8</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Student Work Grant</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Active</span></p>
                            <p className="text-sm text-gray-600">Amount: $2,500 per academic year</p>
                            <p className="text-sm text-gray-600">Requirement: 10 hours/week work study</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Awarded Date: {formatDate('2023-08-15')}</p>
                            <p className="text-sm text-gray-600">Position: Library Assistant</p>
                            <p className="text-sm text-gray-600">Supervisor: Ms. Johnson</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-4 space-y-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Financial Aid Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "FAFSA Renewal", deadline: "2023-12-01", status: "upcoming" },
                        { title: "Scholarship Application", deadline: "2023-11-15", status: "upcoming" },
                        { title: "Work Study Renewal", deadline: "2024-01-15", status: "upcoming" }
                      ].map((deadline, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <CalendarDays className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{deadline.title}</p>
                            <p className="text-sm text-gray-600">Due: {formatDate(deadline.deadline)}</p>
                            <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                              {new Date(deadline.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? "Due Soon" : "Upcoming"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in delay-100">
                  <CardHeader>
                    <CardTitle>Documents Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "FAFSA Confirmation", status: "submitted", date: "2023-09-15" },
                        { name: "Income Verification", status: "required", date: null },
                        { name: "Residency Proof", status: "submitted", date: "2023-09-20" }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-start gap-3">
                          {doc.status === 'submitted' ? (
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            {doc.status === 'submitted' ? (
                              <p className="text-sm text-green-600">Submitted: {formatDate(doc.date)}</p>
                            ) : (
                              <p className="text-sm text-yellow-600">Action required</p>
                            )}
                          </div>
                          {doc.status === 'required' && (
                            <Button variant="outline" size="sm" className="ml-auto">Upload</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in delay-200">
                  <CardHeader>
                    <CardTitle>Financial Aid Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">Contact the financial aid office for assistance with scholarships, grants, or payment arrangements.</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>financialaid@smartlearn.edu</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+1 (555) 234-5678</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Mon-Fri: 9am-5pm</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Admin Building, Room 203</span>
                      </div>
                      
                      <Button className="w-full mt-2">Schedule Appointment</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Fix missing components
const MapPin = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-map-pin", className)}
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default PaymentsPage;
