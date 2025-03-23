import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Phone,
  Plus,
  Search,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Sample data for support tickets
  const tickets = [
    {
      id: "TK-1001",
      subject: "Login Issues with Student Portal",
      description: "I'm unable to log in to the student portal using my credentials. I've tried resetting my password but still facing issues.",
      status: "open",
      priority: "high",
      createdAt: new Date(2024, 3, 15),
      department: "IT Support",
      assignedTo: "John Techson"
    },
    {
      id: "TK-1002",
      subject: "Course Material Not Accessible",
      description: "I cannot access the course materials for the 'Advanced Mathematics' course. The link seems to be broken.",
      status: "pending",
      priority: "medium",
      createdAt: new Date(2024, 3, 10),
      department: "Academic Support",
      assignedTo: "Alice Smith"
    },
    {
      id: "TK-1003",
      subject: "Payment Confirmation Issues",
      description: "I made a payment for the tuition fee, but I haven't received any confirmation yet. Please check if the payment went through.",
      status: "closed",
      priority: "low",
      createdAt: new Date(2024, 3, 5),
      department: "Finance Department",
      assignedTo: "Emily Johnson"
    },
  ];

  // Format date correctly for TypeScript
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(searchTermLower) ||
      ticket.description.toLowerCase().includes(searchTermLower) ||
      ticket.id.toLowerCase().includes(searchTermLower)
    ) &&
    (selectedPriority === '' || ticket.priority === selectedPriority) &&
    (selectedStatus === '' || ticket.status === selectedStatus);
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Support Center</h1>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableCaption>A list of your recent support tickets.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3">Ticket ID</TableHead>
              <TableHead className="px-6 py-3">Subject</TableHead>
              <TableHead className="px-6 py-3">Priority</TableHead>
              <TableHead className="px-6 py-3">Status</TableHead>
              <TableHead className="px-6 py-3">Created At</TableHead>
              <TableHead className="px-6 py-3">Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ticket.id}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {ticket.subject}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant={ticket.priority === 'high' ? 'destructive' : ticket.priority === 'medium' ? 'secondary' : 'outline'}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {ticket.status}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {formatDate(ticket.createdAt)}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {ticket.assignedTo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create New Ticket Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Create a New Ticket</h2>
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Request</CardTitle>
            <CardDescription>
              Please fill out the form below to submit a new support ticket.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" id="subject" placeholder="Enter the subject of your request" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your issue in detail" className="min-h-[80px]" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT Support</SelectItem>
                    <SelectItem value="academic">Academic Support</SelectItem>
                    <SelectItem value="finance">Finance Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Submit Ticket <Plus className="ml-2 h-4 w-4" /></Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Contact Support Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <HelpCircle className="h-6 w-6 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Help Center</h3>
            <p className="text-gray-600 mb-4">Visit our help center for FAQs and guides.</p>
            <Button variant="outline">Go to Help Center</Button>
          </Card>
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <Mail className="h-6 w-6 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Email us for assistance with any issues.</p>
            <a href="mailto:support@example.com">
              <Button variant="outline">Send us an Email</Button>
            </a>
          </Card>
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <Phone className="h-6 w-6 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us for immediate assistance.</p>
            <Button variant="outline">Call Us</Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
