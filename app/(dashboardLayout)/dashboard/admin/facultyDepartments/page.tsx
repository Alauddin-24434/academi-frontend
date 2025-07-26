'use client';

import {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
} from '@/redux/features/department/departmentApi';
import {
  useCreateFacultyMutation,
  useGetFacultiesQuery,
} from '@/redux/features/faculty/facultyApi';

import { useForm } from 'react-hook-form';
import React from 'react';

type Faculty = {
  id: string;
  name: string;
  description?: string;
};

type Department = {
  id: string;
  name: string;
  code: string;
  facultyId: string;
};

export default function AdminFacultyAndDepartmentPage() {
  const { data: facultiesData } = useGetFacultiesQuery(undefined);
  const { data: departmentData } = useGetDepartmentsQuery(undefined);

  const [createFaculty] = useCreateFacultyMutation();
  const [createDepartment] = useCreateDepartmentMutation();

  const {
    register: registerFaculty,
    handleSubmit: handleSubmitFaculty,
    reset: resetFaculty,
  } = useForm();

  const {
    register: registerDept,
    handleSubmit: handleSubmitDept,
    reset: resetDept,
  } = useForm();

  const onFacultySubmit = async (data: any) => {
    try {
      await createFaculty(data).unwrap();
      resetFaculty();
    } catch (error: any) {
      console.error('Faculty Creation Failed:', error?.data?.message || error.message);
      alert(error?.data?.message || 'Faculty creation error');
    }
  };

  const onDepartmentSubmit = async (data: any) => {
    try {
      await createDepartment(data).unwrap();
      resetDept();
    } catch (error: any) {
      console.error('Department Creation Failed:', error?.data?.message || error.message);
      alert(error?.data?.message || 'Department creation error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Admin - Faculty & Department</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Faculty Form */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create Faculty</h2>
          <form onSubmit={handleSubmitFaculty(onFacultySubmit)} className="space-y-4">
            <input
              {...registerFaculty('name')}
              placeholder="Faculty Name"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <textarea
              {...registerFaculty('description')}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Faculty
            </button>
          </form>

          {/* Faculty List */}
          <ul className="mt-6 space-y-2">
            {facultiesData?.data?.map((faculty: Faculty) => (
              <li key={faculty.id} className="border p-2 rounded">
                <strong>{faculty.name}</strong>
                {faculty.description && (
                  <p className="text-sm text-gray-600">{faculty.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Department Form */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create Department</h2>
          <form onSubmit={handleSubmitDept(onDepartmentSubmit)} className="space-y-4">
            <input
              {...registerDept('name')}
              placeholder="Department Name"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              {...registerDept('code')}
              placeholder="Code"
              className="w-full px-3 py-2 border rounded"
              required
            />
            <select
              {...registerDept('facultyId')}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Faculty</option>
              {facultiesData?.data?.map((fac: Faculty) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add Department
            </button>
          </form>

          {/* Department List */}
          <ul className="mt-6 space-y-2">
            {departmentData?.data?.map((dept: Department) => (
              <li key={dept.id} className="border p-2 rounded">
                <strong>{dept.name}</strong> —{' '}
                <span className="text-sm text-gray-600">{dept.code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
