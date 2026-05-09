"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  CheckCheck, 
  ChevronLeft,
  Circle,
  Clock,
  User,
  Info
} from 'lucide-react';
import { conversations } from '@/lib/mockData';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MentorMessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messages, setMessages] = useState(conversations[0]?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg = {
      id: `m${messages.length + 1}`,
      sender: 'mentor',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleSelectConversation = (conversation: (typeof conversations)[number]) => {
    setSelectedConv(conversation);
    setMessages(conversation.messages || []);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col xl:flex-row gap-6 animate-in fade-in duration-700 px-6 lg:px-10 pt-8 pb-4">
      
      {/* 1. Conversations Sidebar */}
      <div className="w-full xl:w-[380px] flex flex-col bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2a2f91] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-[#2a2f91]/5 focus:border-[#2a2f91]/40 transition-all font-medium"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={cn(
                "w-full p-5 flex items-start gap-4 transition-all border-b border-slate-50 last:border-0 relative",
                selectedConv.id === conv.id 
                  ? "bg-blue-50/50" 
                  : "hover:bg-slate-50/50"
              )}
            >
              {selectedConv.id === conv.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2a2f91]" />
              )}
              
              <div className="relative shrink-0">
                <img 
                  src={conv.student.avatar} 
                  alt={conv.student.name} 
                  className="h-12 w-12 rounded-xl object-cover shadow-sm bg-slate-100"
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full shadow-sm",
                  conv.student.status === 'online' ? "bg-green-500" : "bg-slate-300"
                )} />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 truncate">{conv.student.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{conv.timestamp}</span>
                </div>
                <p className={cn(
                  "text-xs truncate leading-relaxed",
                  conv.unreadCount > 0 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"
                )}>
                  {conv.lastMessage}
                </p>
              </div>

              {conv.unreadCount > 0 && (
                <div className="h-5 w-5 rounded-full bg-[#2a2f91] text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-sm">
                  {conv.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Chat Window Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
                <img 
                  src={selectedConv.student.avatar} 
                  alt={selectedConv.student.name} 
                  className="h-10 w-10 rounded-xl object-cover shadow-sm"
                />
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full",
                  selectedConv.student.status === 'online' ? "bg-green-500" : "bg-slate-300"
                )} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-none mb-1">{selectedConv.student.name}</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                {selectedConv.student.status === 'online' ? 'Active Now' : 'Last seen 2h ago'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-[#2a2f91] hover:bg-blue-50 rounded-xl transition-all">
              <Phone size={20} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-[#2a2f91] hover:bg-blue-50 rounded-xl transition-all">
              <Video size={20} />
            </button>
            <div className="w-px h-6 bg-slate-100 mx-2" />
            <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20 custom-scrollbar">
          {/* Date Separator */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Today</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[80%] md:max-w-[70%]",
                msg.sender === 'mentor' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl text-[14px] font-medium leading-relaxed relative shadow-sm",
                msg.sender === 'mentor' 
                  ? "bg-[#2a2f91] text-white rounded-tr-none" 
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
              )}>
                {msg.text}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400">{msg.timestamp}</span>
                {msg.sender === 'mentor' && <CheckCheck size={12} className="text-[#2a2f91]" />}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-5 border-t border-slate-100 bg-white">
          <div className="flex items-end gap-3 bg-slate-50 border border-slate-100 rounded-[24px] p-2 pl-4 focus-within:ring-4 focus-within:ring-[#2a2f91]/5 focus-within:border-[#2a2f91]/20 transition-all">
            <button className="mb-2 p-2 text-slate-400 hover:text-[#2a2f91] transition-colors shrink-0">
              <Paperclip size={20} />
            </button>
            <textarea 
              rows={1}
              placeholder="Write a message..." 
              className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-slate-700 placeholder:text-slate-400 font-medium resize-none max-h-32"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button 
              onClick={handleSendMessage}
              className={cn(
                "p-3 rounded-full transition-all shrink-0 shadow-lg",
                newMessage.trim() 
                  ? "bg-[#2a2f91] text-white scale-100" 
                  : "bg-slate-200 text-slate-400 scale-90"
              )}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Info size={10} /> Shift + Enter for new line
          </p>
        </div>

      </div>

      {/* 3. Helper Info Panel (Hidden on smaller screens, shown on XL) */}
      <div className="hidden xl:flex w-[320px] flex-col gap-6 shrink-0">
        
        {/* Student Context Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={selectedConv.student.avatar} 
                    alt={selectedConv.student.name} 
                    className="h-24 w-24 rounded-[32px] object-cover border-4 border-slate-50 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-2 bg-white rounded-2xl shadow-lg border border-slate-100">
                    <User size={16} className="text-[#2a2f91]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{selectedConv.student.name}</h3>
                <p className="text-xs text-[#2a2f91] font-bold uppercase tracking-widest mt-1">{selectedConv.student.university}</p>
                
                <div className="w-full h-px bg-slate-100 my-6" />
                
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Plan</span>
                        <span className="text-[11px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg">PREMIUM</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sessions</span>
                        <span className="text-xs font-bold text-slate-900">5 Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Major</span>
                        <span className="text-xs font-bold text-slate-900 truncate ml-4">{selectedConv.student.major}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-[#1a1c4b] rounded-3xl p-6 text-white shadow-xl">
           <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-blue-300">Quick Actions</h4>
           <div className="space-y-3">
              <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[12px] font-bold h-10 justify-start px-4">
                Schedule a Follow-up
              </Button>
              <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[12px] font-bold h-10 justify-start px-4">
                Upload Review Files
              </Button>
              <Button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-200 text-[12px] font-bold h-10 justify-start px-4">
                Archive Conversation
              </Button>
           </div>
        </div>

      </div>

    </div>
  );
}
