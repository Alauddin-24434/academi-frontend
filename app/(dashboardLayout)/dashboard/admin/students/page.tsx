"use client";

import PrivateRoute from "@/middleware/privateRoute";
import React, { useState, useEffect } from "react";

type Student = {
  id: string;
  fullName: string;
  studentId: string;
  phone: string;
  status: string;
};

const mockStudents: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: `stu-${i + 1}`,
  fullName: `Student ${i + 1}`,
  studentId: `S${1000 + i + 1}`,
  phone: `01700000${i + 1}`,
  status: i % 2 === 0 ? "APPROVE" : "PENDING",
}));

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Filtered data
  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (

    <PrivateRoute allowedRoles={["ADMIN"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Students</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded px-3 py-2 mb-4 w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Student ID</th>
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student.id} className="text-center hover:bg-gray-50">
                    <td className="py-2 px-4 border">
                      {indexOfFirstStudent + index + 1}
                    </td>
                    <td className="py-2 px-4 border">{student.studentId}</td>
                    <td className="py-2 px-4 border">{student.fullName}</td>
                    <td className="py-2 px-4 border">{student.phone}</td>
                    <td className="py-2 px-4 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${student.status === "APPROVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-4 border text-center text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </PrivateRoute>

  );
};

export default StudentsPage;
