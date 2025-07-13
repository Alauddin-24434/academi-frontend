"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type NoticeFormData = {
  title: string;
  content: string;
  universityId: string;
  publishedAt?: string;
};

const fakeNotices: NoticeFormData[] = [
  {
    title: "Exam Schedule Published",
    content: "The exam schedule for Fall 2025 is now available.",
    universityId: "DU",
    publishedAt: "2025-06-20T09:00:00Z",
  },
  {
    title: "Holiday Notice",
    content: "University closed on 21st July for national holiday.",
    universityId: "NSU",
    publishedAt: "2025-07-10T08:00:00Z",
  },
];

const NoticePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoticeFormData>({
    defaultValues: {
      title: "",
      content: "",
      universityId: "",
      publishedAt: "",
    },
  });

  const onSubmit = (data: NoticeFormData) => {
    console.log("Submitted Notice:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">Notice Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Notice"}
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
            {...register("content", { required: "Content is required" })}
            placeholder="Content"
            className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            rows={6}
          />
          {errors.content && (
            <p className="text-red-500 mt-1 text-sm">{errors.content.message}</p>
          )}

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
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">Notice List</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Content</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">University ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Published At</th>
            </tr>
          </thead>
          <tbody>
            {fakeNotices.map((notice, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{notice.title}</td>
                <td className="px-6 py-4 border-b text-gray-700">{notice.content}</td>
                <td className="px-6 py-4 border-b text-gray-700">{notice.universityId}</td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {notice.publishedAt ? new Date(notice.publishedAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticePage;
