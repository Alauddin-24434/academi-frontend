'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type MessageType = 'INDIVIDUAL' | 'GROUP';

interface Message {
  id: string;
  name: string;
  lastMessage: string;
}

const dummyIndividualMessages: Message[] = [
  { id: '1', name: 'Abir', lastMessage: 'Hi! How are you?' },
  { id: '2', name: 'Alam', lastMessage: 'Meeting at 5pm' },
];

const dummyGroupMessages: Message[] = [
  { id: '101', name: 'Project Team', lastMessage: 'Deadline extended' },
  { id: '102', name: 'Study Group', lastMessage: 'Let’s meet at 6' },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<MessageType>('INDIVIDUAL');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          activeTab === 'INDIVIDUAL'
            ? 'http://localhost:5000/api/messages'
            : 'http://localhost:5000/api/messages/group';

        const res = await axios.get(endpoint);
        setMessages(res.data?.data || []);
      } catch (err: any) {
        console.error(err);
        setMessages(
          activeTab === 'INDIVIDUAL' ? dummyIndividualMessages : dummyGroupMessages
        );
        setError('Could not fetch live messages, using dummy data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [activeTab]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full max-w-sm border-r bg-white">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('INDIVIDUAL')}
            className={`flex-1 p-3 text-center font-medium border-b-2 ${
              activeTab === 'INDIVIDUAL'
                ? 'border-purple-600 text-purple-700'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveTab('GROUP')}
            className={`flex-1 p-3 text-center font-medium border-b-2 ${
              activeTab === 'GROUP'
                ? 'border-purple-600 text-purple-700'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            Group
          </button>
        </div>

        {/* Message List */}
        <div className="overflow-y-auto h-full">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 hover:bg-gray-100 border-b cursor-pointer ${
                  selectedMessage?.id === msg.id ? 'bg-gray-100' : ''
                }`}
              >
                <h4 className="font-semibold text-sm">{msg.name}</h4>
                <p className="text-xs text-gray-500 truncate">{msg.lastMessage}</p>
              </div>
            ))
          )}
          {error && <div className="p-4 text-red-500 text-sm">{error}</div>}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 p-6 bg-gray-50">
        {selectedMessage ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{selectedMessage.name}</h2>
            <div className="h-[70vh] border p-4 rounded bg-white overflow-y-auto">
              <p className="text-gray-500">[Message thread appears here]</p>
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded px-4 py-2"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 h-full flex items-center justify-center text-lg">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
}
