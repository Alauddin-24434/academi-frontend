'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onCreated: () => void;
  studentId:string;
}

interface GroupFormData {
  name: string;
  session: string;
  rules: string;
  avatar: FileList;
}

export default function GroupModal({ onClose, onCreated,studentId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<GroupFormData>();

  const [loading, setLoading] = useState(false);
  const avatarFile = watch('avatar')?.[0];

  const onSubmit = async (data: GroupFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('session', data.session);
    formData.append('rules', data.rules);
    formData.append('adminId', studentId); // replace dynamically
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }


    try {
      await axios.post('http://localhost:5000/api/messages/group', formData);
      reset();
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create group');
    } finally {
   
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Group Name"
              {...register('name', { required: 'Group name is required' })}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Session"
              {...register('session', { required: 'Session is required' })}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.session && (
              <p className="text-red-500 text-sm mt-1">{errors.session.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Rules"
              {...register('rules', { required: 'Rules are required' })}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.rules && (
              <p className="text-red-500 text-sm mt-1">{errors.rules.message}</p>
            )}
          </div>

          <div>
            <label className="flex flex-col items-center justify-center border border-dashed rounded px-4 py-6 cursor-pointer hover:bg-purple-50">
              <span className="text-gray-600">Click to upload avatar</span>
              <input
                type="file"
                accept="image/*"
                {...register('avatar')}
                className="hidden"
              />
            </label>
            {avatarFile && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Avatar Preview"
                  className="w-24 h-24 object-cover rounded-full mx-auto"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
