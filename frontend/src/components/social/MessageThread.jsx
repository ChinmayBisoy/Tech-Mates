import React, { useState } from 'react';
import { Send, Paperclip, Search } from 'lucide-react';
import { useSocialStore } from '@/store/socialStore';

// Message Thread Component - Direct messaging between users
export default function MessageThread({ conversationId }) {
  const { conversations, sendMessage } = useSocialStore();
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversation = conversations.find(c => c.id === conversationId);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(conversationId, messageText);
      setMessageText('');
    }
  };

  const filteredMessages = conversation?.messages.filter(m =>
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={conversation.participantAvatar}
            alt={conversation.participantName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{conversation.participantName}</p>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">No messages found</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'john_collector' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'john_collector'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'john_collector' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
