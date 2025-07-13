"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type DepartmentFormData = {
  name: string;
  code: string;
  seatCapacity: number;
  universityId: string;
};

const fakeDepartments: DepartmentFormData[] = [
  {
    name: "Computer Science",
    code: "CSE",
    seatCapacity: 100,
    universityId: "DU",
  },
  {
    name: "Business Administration",
    code: "BBA",
    seatCapacity: 80,
    universityId: "NSU",
  },
];

const DepartmentPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepartmentFormData>({
    defaultValues: {
      name: "",
      code: "",
      seatCapacity: 0,
      universityId: "",
    },
  });

  const onSubmit = (data: DepartmentFormData) => {
    console.log("Submitted Department:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">Department Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Department"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                {...register("name", { required: "Department name is required" })}
                placeholder="Department Name"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("code", { required: "Code is required" })}
                placeholder="Code"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.code ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.code && (
                <p className="text-red-500 mt-1 text-sm">{errors.code.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                {...register("seatCapacity", {
                  required: "Seat capacity is required",
                  min: { value: 1, message: "Minimum seat capacity is 1" },
                })}
                placeholder="Seat Capacity"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.seatCapacity ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.seatCapacity && (
                <p className="text-red-500 mt-1 text-sm">{errors.seatCapacity.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("universityId", { required: "University ID is required" })}
                placeholder="University ID (e.g. DU)"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.universityId ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.universityId && (
                <p className="text-red-500 mt-1 text-sm">{errors.universityId.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-md shadow"
          >
            Submit
          </button>
        </form>
      )}

      <div className="mt-14 overflow-x-auto rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">
          Department List
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Code</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Seat Capacity</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">University ID</th>
            </tr>
          </thead>
          <tbody>
            {fakeDepartments.map((dep, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{dep.name}</td>
                <td className="px-6 py-4 border-b text-gray-700">{dep.code}</td>
                <td className="px-6 py-4 border-b text-gray-700">{dep.seatCapacity}</td>
                <td className="px-6 py-4 border-b text-gray-700">{dep.universityId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentPage;
