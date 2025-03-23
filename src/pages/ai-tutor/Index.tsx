
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Clock, BookOpen, MessagesSquare, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import Navbar from '@/components/layout/Navbar';

const AiTutorPage = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m your AI tutor. How can I help you with your studies today?', timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Autoscroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me explain this concept in more detail...",
        "Based on your question, I'd recommend reviewing Chapter 5 in your textbook which covers this topic extensively.",
        "I can see how this might be confusing. Let's break it down step by step...",
        "This is a common question! The key thing to understand is...",
        "Let me provide some examples to help clarify this concept for you."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { role: 'bot', content: randomResponse, timestamp: new Date() }]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const ChatMessage = ({ message }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
          {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </Avatar>
        <div className={`rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          <p className="text-sm">{message.content}</p>
          <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    </div>
  );

  const suggestionTopics = [
    { title: "Algebra Help", icon: <Sparkles className="h-4 w-4" /> },
    { title: "Science Concepts", icon: <Lightbulb className="h-4 w-4" /> },
    { title: "History Timeline", icon: <Clock className="h-4 w-4" /> },
    { title: "Literature Analysis", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-semibold mb-6">AI Tutor</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[70vh] flex flex-col">
              <div className="p-4 border-b bg-muted/50">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3 bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </Avatar>
                  <div>
                    <h2 className="font-medium">SmartLearn AI Tutor</h2>
                    <p className="text-xs text-muted-foreground">Helping you understand complex concepts</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="flex">
                      <Avatar className="h-8 w-8 mr-2">
                        <Bot className="h-4 w-4" />
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask anything..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Topics */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Suggested Topics</h3>
              <div className="space-y-2">
                {suggestionTopics.map((topic, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setInputMessage(`Help me understand ${topic.title}`);
                    }}
                  >
                    {topic.icon}
                    <span>{topic.title}</span>
                  </Button>
                ))}
              </div>
            </Card>
            
            {/* Chat History */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Previous Sessions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <MessagesSquare className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm">Math Problem Solving</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessagesSquare className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm">Chemistry Help</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTutorPage;
