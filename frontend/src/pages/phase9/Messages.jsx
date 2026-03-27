import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useSocialStore } from '@/store/socialStore';
import MessageThread from '@/components/social/MessageThread';

export const Messages_Phase9 = () => {
  const { conversations } = useSocialStore();
  const [activeConversationId, setActiveConversationId] = React.useState(conversations[0]?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Direct messaging with sellers and buyers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-screen max-h-96">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Conversations</h3>
            </div>
            <div className="overflow-y-auto">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full p-4 border-b border-gray-200 dark:border-gray-700 text-left transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeConversationId === conv.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {conv.participantName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-3">
            {activeConversationId && <MessageThread conversationId={activeConversationId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages_Phase9;
