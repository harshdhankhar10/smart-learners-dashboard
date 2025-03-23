import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Book, 
  Edit, 
  Lock, 
  Bell, 
  ClipboardList,
  FileText as FileTextIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

const ProfilePage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>
      <ProfileSettings />
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [location, setLocation] = useState('New York, USA');
  const [dob, setDob] = useState('05/20/1998');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  // Account Information Section
  const AccountInformation = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Account Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <Input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  // Security Section
  const SecuritySection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Security</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Change Password</label>
          <Input
            type="password"
            placeholder="New Password"
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <Input
            type="password"
            placeholder="Confirm New Password"
            className="mt-1"
          />
        </div>
      </div>
      <Button className={cn("mt-2")} variant="outline" size="sm">
        Update Password
      </Button>
    </div>
  );

  // Documents Section
  const DocumentsSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Documents</h3>
      <div className="grid gap-3">
        {[
          { name: "Registration Certificate", date: "Oct 12, 2023" },
          { name: "Last Semester Results", date: "Dec 20, 2023" },
          { name: "ID Card Request", date: "Jan 05, 2024" }
        ].map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
            <div className="flex items-center gap-3">
              <FileTextIcon className="h-5 w-5 text-primary/70" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">Uploaded: {doc.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </div>
      <Button className={cn("mt-2")} variant="outline" size="sm">
        Upload New Document
      </Button>
    </div>
  );

  return (
    <Card className="bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-6 mb-6">
        <Avatar className="h-20 w-20">
          <User className="h-10 w-10" />
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <AccountInformation />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecuritySection />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <DocumentsSection />
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <Button onClick={handleSubmit} className="w-full mt-4">
        Update Profile
      </Button>
    </Card>
  );
};

export default ProfilePage;
