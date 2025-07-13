"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ApplicationFormData = {
  userId: string;
  universityId: string;
  departmentId: string;
  status: "PENDING" | "WAITING" | "CONFIRMED" | "REJECTED";
  round: number;
  boardName: string;
  registrationNo: string;
  rollNo: string;
};

const fakeApplications: ApplicationFormData[] = [
  {
    userId: "user1",
    universityId: "DU",
    departmentId: "CSE",
    status: "PENDING",
    round: 1,
    boardName: "Dhaka Board",
    registrationNo: "12345",
    rollNo: "54321",
  },
  {
    userId: "user2",
    universityId: "NSU",
    departmentId: "BBA",
    status: "CONFIRMED",
    round: 1,
    boardName: "Chittagong Board",
    registrationNo: "67890",
    rollNo: "09876",
  },
];

const ApplicationPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    defaultValues: {
      userId: "",
      universityId: "",
      departmentId: "",
      status: "PENDING",
      round: 1,
      boardName: "",
      registrationNo: "",
      rollNo: "",
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log("Submitted Application:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">Application Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Application"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-4xl mx-auto"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                {...register("userId", { required: "User ID is required" })}
                placeholder="User ID"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.userId ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.userId && (
                <p className="text-red-500 mt-1 text-sm">{errors.userId.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("universityId", { required: "University ID is required" })}
                placeholder="University ID"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.universityId ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.universityId && (
                <p className="text-red-500 mt-1 text-sm">{errors.universityId.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("departmentId", { required: "Department ID is required" })}
                placeholder="Department ID"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.departmentId ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.departmentId && (
                <p className="text-red-500 mt-1 text-sm">{errors.departmentId.message}</p>
              )}
            </div>

            <div>
              <select
                {...register("status")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PENDING">Pending</option>
                <option value="WAITING">Waiting</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <input
                type="number"
                {...register("round", {
                  min: { value: 1, message: "Round must be at least 1" },
                })}
                placeholder="Round"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.round ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.round && (
                <p className="text-red-500 mt-1 text-sm">{errors.round.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("boardName", { required: "Board name required" })}
                placeholder="Board Name"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.boardName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.boardName && (
                <p className="text-red-500 mt-1 text-sm">{errors.boardName.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("registrationNo", { required: "Registration No required" })}
                placeholder="Registration Number"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.registrationNo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.registrationNo && (
                <p className="text-red-500 mt-1 text-sm">{errors.registrationNo.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("rollNo", { required: "Roll No required" })}
                placeholder="Roll Number"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.rollNo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.rollNo && (
                <p className="text-red-500 mt-1 text-sm">{errors.rollNo.message}</p>
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
          Applications List
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">User ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">University ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Department ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Round</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Board Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Registration No</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {fakeApplications.map((app, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{app.userId}</td>
                <td className="px-6 py-4 border-b text-gray-700">{app.universityId}</td>
                <td className="px-6 py-4 border-b text-gray-700">{app.departmentId}</td>
                <td className="px-6 py-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      app.status === "CONFIRMED"
                        ? "bg-green-500"
                        : app.status === "PENDING"
                        ? "bg-yellow-500"
                        : app.status === "REJECTED"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b text-gray-700">{app.round}</td>
                <td className="px-6 py-4 border-b text-gray-700">{app.boardName}</td>
                <td className="px-6 py-4 border-b text-gray-700">{app.registrationNo}</td>
                <td className="px-6 py-4 border-b text-gray-700">{app.rollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationPage;
