'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetUserByUserIdQuery } from '@/redux/features/auth/authApi';
import GroupModal from '@/components/modal/GroupModal';
import { z } from 'zod';

type MessageType = 'INDIVIDUAL' | 'GROUP';

interface Group {
  id: string;
  name: string;
  lastMessage: string;
  avatar?: string;
}

// ✅ Zod schemas
export const createGroupMessageSchema = z.object({
  content: z.string().min(1, "Message content is required"),
  senderId: z.string(),
  groupId: z.string(),
});

export const createIndividualMessageSchema = z.object({
  content: z.string().min(1, "Message content is required"),
  senderId: z.string(),
  receiverId: z.string(),
});

let socket: Socket;

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<MessageType>('INDIVIDUAL');
  const [selectedGroup, setSelectedMessage] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;

  const { data: userData } = useGetUserByUserIdQuery(userId);

  // Dummy students data for INDIVIDUAL tab
  const dummyStudents: Group[] = [
    {
      id: 'stu1',
      name: 'Abdullah Al Noman',
      lastMessage: 'Hi, how are you?',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'stu2',
      name: 'Sharmin Akter',
      lastMessage: 'Please send notes.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 'stu3',
      name: 'Md Rakib Hasan',
      lastMessage: 'Assignment done.',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    },
  ];

  // ✅ Initialize socket
  useEffect(() => {
    socket = io('http://localhost:5000');
    socket.emit('join', userId);

    socket.on('new-message', (data) => {
      console.log('Received new message:', data);
      fetchGroup(); // Refetch to show new messages
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ Fetch groups or students
  useEffect(() => {
    fetchGroup();
  }, [activeTab]);

  const fetchGroup = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'INDIVIDUAL') {
        setGroups(dummyStudents);
      } else {
        const res = await axios.get('http://localhost:5000/api/messages/group');
        setGroups(res?.data?.data || []);
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle send
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedGroup) return;

    if (activeTab === 'INDIVIDUAL') {
      const messageData = {
        content: newMessage,
        senderId: userData?.data?.student?.id,
        receiverId: selectedGroup.id,
      };

      const parsed = createIndividualMessageSchema.safeParse(messageData);
      if (!parsed.success) {
        console.error(parsed.error.format());
        alert('Validation error: please check your message input.');
        return;
      }

      try {
        console.log('Sending individual message:', messageData);
        socket.emit('private-message', messageData);
        setNewMessage('');
      } catch (err) {
        console.error(err);
        alert('Failed to send individual message');
      }

    } else {
      const messageData = {
        content: newMessage,
        senderId: userData?.data?.student?.id,
        groupId: selectedGroup.id,
      };

      const parsed = createGroupMessageSchema.safeParse(messageData);
      if (!parsed.success) {
        console.error(parsed.error.format());
        alert('Validation error: please check your message input.');
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/messages/group/message', messageData);
        socket.emit('group-message', messageData);
        setNewMessage('');
      } catch (err) {
        console.error(err);
        alert('Failed to send group message');
      }
    }
  };

  const handleSelectMessage = (msg: Group) => {
    setSelectedMessage(msg);
    if (activeTab === 'GROUP') {
      socket.emit('join-group', msg.id);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {showModal && (
        <GroupModal
          onClose={() => setShowModal(false)}
          onCreated={() => fetchGroup()}
          studentId={userData?.data?.student?.id}
        />
      )}

      {/* Sidebar */}
      <div className="w-full max-w-sm border-r bg-white flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-purple-50">
          <h2 className="text-lg font-semibold text-purple-700">Messages</h2>
          {activeTab === 'GROUP' && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
            >
              + Create Group
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('INDIVIDUAL')}
            className={`flex-1 p-3 text-center font-medium ${activeTab === 'INDIVIDUAL'
              ? 'border-b-2 border-purple-600 text-purple-700 bg-purple-50'
              : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveTab('GROUP')}
            className={`flex-1 p-3 text-center font-medium ${activeTab === 'GROUP'
              ? 'border-b-2 border-purple-600 text-purple-700 bg-purple-50'
              : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            Group
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            groups.map((grp) => (
              <div
                key={grp.id}
                onClick={() => handleSelectMessage(grp)}
                className={`flex items-center gap-3 p-4 hover:bg-purple-50 border-b cursor-pointer ${selectedGroup?.id === grp.id ? 'bg-purple-50' : ''
                  }`}
              >
                {grp.avatar && (
                  <img
                    src={grp.avatar}
                    alt={grp.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">{grp.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{grp.lastMessage}</p>
                </div>
              </div>
            ))
          )}
          {error && <div className="p-4 text-red-500 text-sm">{error}</div>}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedGroup ? (
          <>
            <div className="border-b px-6 py-4 bg-white">
              <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="h-full border rounded bg-white p-4">
                <p className="text-gray-500">[Message thread here]</p>
              </div>
            </div>

            <div className="border-t bg-white px-6 py-4 flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
}
