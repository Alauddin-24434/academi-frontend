"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ApplicationTokenFormData = {
  userId: string;
  round: number;
  amount: number;
  paidAt: string;
  isValid: boolean;
};

const fakeTokens: ApplicationTokenFormData[] = [
  {
    userId: "user1",
    round: 1,
    amount: 1000,
    paidAt: "2025-07-10T10:00:00Z",
    isValid: true,
  },
  {
    userId: "user2",
    round: 2,
    amount: 1200,
    paidAt: "2025-07-11T11:00:00Z",
    isValid: false,
  },
];

const ApplicationTokenPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationTokenFormData>({
    defaultValues: {
      userId: "",
      round: 1,
      amount: 0,
      paidAt: "",
      isValid: true,
    },
  });

  const onSubmit = (data: ApplicationTokenFormData) => {
    console.log("Submitted Token:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">Application Token Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Token"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-3xl mx-auto"
          noValidate
        >
          <input
            {...register("userId", { required: "User ID is required" })}
            placeholder="User ID"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.userId ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            type="number"
            {...register("round", { required: true, min: 1 })}
            placeholder="Round"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.round ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            type="number"
            {...register("amount", { required: true, min: 0 })}
            placeholder="Amount"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            type="datetime-local"
            {...register("paidAt", { required: "Paid At is required" })}
            placeholder="Paid At"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.paidAt ? "border-red-500" : "border-gray-300"
            }`}
          />
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("isValid")}
              className="form-checkbox h-5 w-5 text-blue-600"
              defaultChecked
            />
            <span>Is Valid</span>
          </label>

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
          Application Tokens List
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">User ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Round</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Amount</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Paid At</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Is Valid</th>
            </tr>
          </thead>
          <tbody>
            {fakeTokens.map((token, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{token.userId}</td>
                <td className="px-6 py-4 border-b text-gray-700">{token.round}</td>
                <td className="px-6 py-4 border-b text-gray-700">{token.amount}</td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {token.paidAt ? new Date(token.paidAt).toLocaleString() : "-"}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {token.isValid ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTokenPage;
