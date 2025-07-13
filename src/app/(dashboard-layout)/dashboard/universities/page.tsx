"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type UniversityFormData = {
  name: string;
  code: string;
  location: string;
  email: string;
  phone: string;
  logoUrl: string;
  websiteUrl: string;
  applicationFee: number;
  type: string;
  isActive: boolean;
};

const fakeUniversities: UniversityFormData[] = [
  {
    name: "Dhaka University",
    code: "DU",
    location: "Dhaka",
    email: "info@du.ac.bd",
    phone: "01700000000",
    logoUrl: "https://via.placeholder.com/40",
    websiteUrl: "https://www.du.ac.bd",
    applicationFee: 500,
    type: "Public",
    isActive: true,
  },
  {
    name: "North South University",
    code: "NSU",
    location: "Dhaka",
    email: "contact@nsu.edu.bd",
    phone: "01800000000",
    logoUrl: "https://via.placeholder.com/40",
    websiteUrl: "https://www.northsouth.edu",
    applicationFee: 800,
    type: "Private",
    isActive: true,
  },
];

const UniversityPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UniversityFormData>({
    defaultValues: {
      name: '',
      code: '',
      location: '',
      email: '',
      phone: '',
      logoUrl: '',
      websiteUrl: '',
      applicationFee: 0,
      type: '',
      isActive: true,
    },
  });

  const onSubmit = (data: UniversityFormData) => {
    console.log('Submitted:', data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6 ">
      {/* Title & Button Row */}
      <div className="flex items-center justify-between mb-6 border p-4">
        <h1 className="text-3xl font-semibold text-gray-800">University Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? 'Close Form' : 'Add University'}
        </button>
      </div>

      {/* Conditional Form */}
      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md  space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                {...register('name', { required: 'University name is required' })}
                placeholder="University Name"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('code', { required: 'Code is required' })}
                placeholder="Code"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.code && (
                <p className="text-red-500 mt-1 text-sm">{errors.code.message}</p>
              )}
            </div>

            <input
              {...register('location')}
              placeholder="Location"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register('phone')}
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register('logoUrl')}
              placeholder="Logo URL"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register('websiteUrl')}
              placeholder="Website URL"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              {...register('applicationFee')}
              placeholder="Application Fee"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register('type')}
              placeholder="Type (Public/Private/International)"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('isActive')}
              className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium select-none">Is Active?</span>
          </label>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-md shadow"
          >
            Submit
          </button>
        </form>
      )}

      {/* University List Table */}
      <div className="mt-14  overflow-x-auto rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">
          University List
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Logo</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Code</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Type</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Location</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Email</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {fakeUniversities.map((uni, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b">
                  <img
                    src={uni.logoUrl}
                    alt="logo"
                    className="w-10 h-10 rounded object-cover"
                    loading="lazy"
                  />
                </td>
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{uni.name}</td>
                <td className="px-6 py-4 border-b text-gray-700">{uni.code}</td>
                <td className="px-6 py-4 border-b text-gray-700">{uni.type}</td>
                <td className="px-6 py-4 border-b text-gray-700">{uni.location}</td>
                <td className="px-6 py-4 border-b text-blue-600 underline hover:text-blue-800 cursor-pointer">
                  {uni.email}
                </td>
                <td className="px-6 py-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      uni.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {uni.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityPage;
