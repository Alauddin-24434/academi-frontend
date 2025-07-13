"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type CircularFormData = {
  title: string;
  description?: string;
  fileUrl?: string;
  universityId?: string;
  publishedAt?: string;
};

const fakeCirculars: CircularFormData[] = [
  {
    title: "Admission Notice 2025",
    description: "Admission is open for 2025-26 session.",
    fileUrl: "https://example.com/admission.pdf",
    universityId: "DU",
    publishedAt: "2025-06-01T12:00:00Z",
  },
  {
    title: "Holiday Announcement",
    description: "University will remain closed on 15th August.",
    fileUrl: undefined,
    universityId: "NSU",
    publishedAt: "2025-07-01T09:00:00Z",
  },
];

const CircularPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CircularFormData>({
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      universityId: "",
      publishedAt: "",
    },
  });

  const onSubmit = (data: CircularFormData) => {
    console.log("Submitted Circular:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">Circular Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Circular"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-3xl mx-auto"
          noValidate
        >
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder="Description (optional)"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <input
            {...register("fileUrl")}
            placeholder="File URL (optional)"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            {...register("universityId")}
            placeholder="University ID (optional)"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="datetime-local"
            {...register("publishedAt")}
            placeholder="Published At"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
          Circular List
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Description</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">File URL</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">University ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Published At</th>
            </tr>
          </thead>
          <tbody>
            {fakeCirculars.map((circ, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{circ.title}</td>
                <td className="px-6 py-4 border-b text-gray-700">{circ.description || "-"}</td>
                <td className="px-6 py-4 border-b text-blue-600 underline hover:text-blue-800 cursor-pointer">
                  {circ.fileUrl ? (
                    <a href={circ.fileUrl} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">{circ.universityId || "-"}</td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {circ.publishedAt ? new Date(circ.publishedAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CircularPage;
