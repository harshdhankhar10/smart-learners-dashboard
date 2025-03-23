
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Search,
  Filter,
  PlusCircle,
  User,
  Clock,
  ThumbsUp,
  MessageSquare,
  Send,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';

const DiscussionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const discussions = [
    {
      id: 1,
      title: "Calculus Integration Techniques",
      subject: "Mathematics 301",
      author: "Alex Johnson",
      authorAvatar: null,
      date: "Sep 15, 2023",
      time: "10:30 AM",
      content: "I'm having trouble understanding integration by parts. Can someone explain when to use it versus substitution?",
      replies: 8,
      likes: 5,
      lastActivity: "2 hours ago",
      tags: ["calculus", "integration", "help"],
      isFollowing: true,
    },
    {
      id: 2,
      title: "Newton's Third Law Examples",
      subject: "Physics 201",
      author: "Maya Rodriguez",
      authorAvatar: null,
      date: "Sep 14, 2023",
      time: "03:45 PM",
      content: "Looking for real-world examples of Newton's Third Law in action for my upcoming presentation.",
      replies: 12,
      likes: 9,
      lastActivity: "Yesterday",
      tags: ["physics", "newton", "presentation"],
      isFollowing: false,
    },
    {
      id: 3,
      title: "Group Project Teams for Literature Analysis",
      subject: "Literature 101",
      author: "John Smith",
      authorAvatar: null,
      date: "Sep 13, 2023",
      time: "11:15 AM",
      content: "Has anyone formed groups yet for the upcoming project? I'm looking for team members who are interested in analyzing modernist literature.",
      replies: 5,
      likes: 3,
      lastActivity: "2 days ago",
      tags: ["group project", "literature", "modernism"],
      isFollowing: false,
    },
    {
      id: 4,
      title: "Recommended Resources for Data Structures",
      subject: "Computer Science 202",
      author: "Olivia Chen",
      authorAvatar: null,
      date: "Sep 12, 2023",
      time: "09:20 AM",
      content: "Does anyone have recommendations for tutorials or books on advanced data structures? Particularly interested in balanced trees and graph algorithms.",
      replies: 15,
      likes: 22,
      lastActivity: "15 minutes ago",
      tags: ["cs", "data structures", "resources"],
      isFollowing: true,
    },
  ];
  
  const messages = [
    {
      id: 1,
      author: "Sam Taylor",
      authorAvatar: null,
      content: "The key difference between integration by parts and substitution is about complexity. Use substitution when you can identify a part of the integrand that can be replaced with a simpler variable. Use integration by parts when you have a product of functions and one becomes simpler when differentiated while the other doesn't become too complex when integrated.",
      time: "2 hours ago",
      likes: 8,
      replies: [],
    },
    {
      id: 2,
      author: "Li Wei",
      authorAvatar: null,
      content: "A good way to remember: integration by parts is essentially the product rule for derivatives, but in reverse. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫v(x)u'(x)dx",
      time: "1 hour ago",
      likes: 5,
      replies: [
        {
          id: 21,
          author: "Alex Johnson",
          authorAvatar: null,
          content: "That's helpful! So I should use it when I can identify two functions where one gets simpler when differentiated?",
          time: "45 minutes ago",
          likes: 2,
        },
        {
          id: 22,
          author: "Li Wei",
          authorAvatar: null,
          content: "Exactly! The LIATE rule can help you choose which function should be u and which should be v'. L: logarithmic, I: inverse trig, A: algebraic, T: trigonometric, E: exponential.",
          time: "30 minutes ago",
          likes: 4,
        }
      ],
    },
    {
      id: 3,
      author: "Dr. Michael Stevens",
      authorAvatar: null,
      content: "I'll be covering this in more detail in tomorrow's lecture, but the examples shared here are excellent. Don't forget to review the practice problems in chapter 7, sections 3-5.",
      time: "20 minutes ago",
      likes: 12,
      replies: [],
    },
  ];
  
  const filteredDiscussions = discussions.filter(
    discussion => discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    toast.success("Message sent successfully!");
    setNewMessage('');
  };
  
  const toggleFollow = (id) => {
    toast.success("Subscription updated");
  };
  
  const likeMessage = (id) => {
    toast.success("Post liked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Discussions
              </h1>
              <p className="mt-1 text-gray-600">
                Engage in classroom discussions and collaborative learning
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Discussions List */}
          <div className="lg:col-span-1">
            <Card className="p-4 mb-6 border border-gray-100 shadow-soft">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-gray-900">Recent Discussions</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                </Button>
              </div>
              
              <div className="space-y-3">
                {filteredDiscussions.map((discussion) => (
                  <Card 
                    key={discussion.id} 
                    className={`p-3 border hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer ${discussion.id === 1 ? 'border-primary/30 bg-primary/5' : 'border-gray-100'}`}
                  >
                    <div className="flex items-start">
                      <Avatar className="h-8 w-8 mr-3 mt-1">
                        <User className="h-4 w-4" />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 line-clamp-1">{discussion.title}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{discussion.lastActivity}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{discussion.subject}</p>
                        <p className="text-sm text-gray-700 line-clamp-2 mt-1">{discussion.content}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {discussion.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center text-xs text-gray-500">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                              {discussion.likes}
                            </span>
                          </div>
                          <Button 
                            variant={discussion.isFollowing ? "default" : "outline"} 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => toggleFollow(discussion.id)}
                          >
                            {discussion.isFollowing ? 'Following' : 'Follow'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Discussion Thread */}
          <div className="lg:col-span-2">
            <Card className="p-5 border border-gray-100 shadow-soft">
              <div className="flex items-start mb-6">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-500 mr-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Calculus Integration Techniques</h2>
                  <p className="text-sm text-gray-600 mt-1">Mathematics 301 • Started by Alex Johnson</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 mb-6">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-3">
                    <User className="h-5 w-5" />
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">Alex Johnson</h3>
                      <span className="text-xs text-gray-500 ml-2">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Sep 15, 2023 • 10:30 AM
                      </span>
                    </div>
                    <div className="mt-2 text-gray-700">
                      <p>I'm having trouble understanding integration by parts. Can someone explain when to use it versus substitution?</p>
                      <p className="mt-2">I've been practicing with the problems from chapter 7, but I'm still confused about which technique to apply in different situations.</p>
                    </div>
                    <div className="flex items-center mt-3">
                      <Button variant="ghost" size="sm" className="h-8 text-gray-600" onClick={() => likeMessage(0)}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        5
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-gray-600 ml-2">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5 mb-6">
                {messages.map((message) => (
                  <div key={message.id} className="pl-0 sm:pl-8">
                    <div className="p-4 rounded-lg border border-gray-100 bg-white">
                      <div className="flex items-start">
                        <Avatar className="h-8 w-8 mr-3">
                          <User className="h-4 w-4" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900">{message.author}</h3>
                            <span className="text-xs text-gray-500 ml-2">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {message.time}
                            </span>
                          </div>
                          <div className="mt-2 text-gray-700 text-sm">
                            <p>{message.content}</p>
                          </div>
                          <div className="flex items-center mt-3">
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600" onClick={() => likeMessage(message.id)}>
                              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                              {message.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600 ml-2">
                              <MessageCircle className="h-3.5 w-3.5 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Nested replies */}
                    {message.replies && message.replies.length > 0 && (
                      <div className="mt-3 space-y-3 pl-6 sm:pl-12">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                            <div className="flex items-start">
                              <Avatar className="h-6 w-6 mr-2">
                                <User className="h-3 w-3" />
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h3 className="text-sm font-medium text-gray-900">{reply.author}</h3>
                                  <span className="text-xs text-gray-500 ml-2">
                                    <Clock className="h-3 w-3 inline mr-1" />
                                    {reply.time}
                                  </span>
                                </div>
                                <div className="mt-1 text-gray-700 text-sm">
                                  <p>{reply.content}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-600" onClick={() => likeMessage(reply.id)}>
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {reply.likes}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Reply Box */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Leave a Reply</h3>
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-3 mt-1">
                    <User className="h-4 w-4" />
                  </Avatar>
                  <div className="flex-1">
                    <div className="rounded-lg border border-gray-200 mb-2 overflow-hidden">
                      <textarea 
                        className="w-full p-3 text-sm focus:outline-none resize-none"
                        placeholder="Write your reply here..."
                        rows={3}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionsPage;
