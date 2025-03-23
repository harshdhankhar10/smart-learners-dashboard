
import React, { useState } from 'react';
import { Calendar, CreditCard, Wallet, Receipt, ShieldCheck, MessagesSquare, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Sample data for payments
  const payments = [
    {
      id: 1,
      description: "Tuition Fee - Spring Semester",
      amount: 2500,
      status: "paid",
      date: new Date(2023, 5, 15),
      method: "Credit Card",
      reference: "TF-2023-001"
    },
    {
      id: 2,
      description: "Library Fine",
      amount: 50,
      status: "unpaid",
      date: new Date(2024, 1, 20),
      method: "Online Transfer",
      reference: "LF-2024-001"
    },
    {
      id: 3,
      description: "Exam Fee - Fall Semester",
      amount: 300,
      status: "paid",
      date: new Date(2023, 10, 5),
      method: "Credit Card",
      reference: "EF-2023-002"
    },
    {
      id: 4,
      description: "Late Registration Fee",
      amount: 100,
      status: "pending",
      date: new Date(2024, 2, 10),
      method: "Cash",
      reference: "LR-2024-001"
    },
    {
      id: 5,
      description: "Sports Club Membership",
      amount: 150,
      status: "paid",
      date: new Date(2023, 8, 1),
      method: "Online Transfer",
      reference: "SC-2023-003"
    },
  ];

  // Filter payments based on search query
  const filteredPayments = payments.filter(payment =>
    payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date correctly for TypeScript
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'paid':
        return 'default'; // Instead of 'success'
      case 'pending':
        return 'secondary';
      case 'unpaid':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Payment Details Component
  const PaymentDetails = ({ payment }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Description:</span>
          <span className="text-sm">{payment.description}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Amount:</span>
          <span className="text-sm">${payment.amount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={getBadgeVariant(payment.status)}>{payment.status}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Date:</span>
          <span className="text-sm">{formatDate(payment.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Method:</span>
          <span className="text-sm">{payment.method}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Reference:</span>
          <span className="text-sm">{payment.reference}</span>
        </div>
      </div>
    </div>
  );

  // Support Section Component
  const SupportSection = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
      <p className="text-gray-600 mb-4">
        If you have any questions about your payments or need assistance, please contact our support team.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessagesSquare className="h-4 w-4 text-primary" />
          <span className="text-sm">Chat with us</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-sm">payments@smartlearn.edu</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <span className="text-sm">+1 (555) 123-4567</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payments List */}
        <div className="md:col-span-2">
          <Card className="shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Payment History</h2>
                <Input
                  type="search"
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <Separator className="mb-4" />
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>A list of your recent payments.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedPayment(payment)}>
                        <TableCell className="font-medium">{payment.description}</TableCell>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(payment.status)}>{payment.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Details & Support */}
        <div className="space-y-6">
          {selectedPayment ? (
            <PaymentDetails payment={selectedPayment} />
          ) : (
            <Card className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Select a Payment</h3>
              <p className="text-gray-600">Click on a payment in the list to view its details.</p>
            </Card>
          )}
          <SupportSection />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
