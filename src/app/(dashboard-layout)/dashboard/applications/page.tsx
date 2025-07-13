"use client";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

// Fake universities
const fakeUniversities = [
  { id: "DU", name: "University of Dhaka" },
  { id: "RU", name: "University of Rajshahi" },
  { id: "KU", name: "Khulna University" },
  { id: "NSU", name: "North South University" },
  { id: "BRAC", name: "BRAC University" },
];

// Departments by stream
const departmentsByStream = {
  SCIENCE: [
    { id: "CSE", name: "Computer Science" },
    { id: "EEE", name: "Electrical Engineering" },
    { id: "PHY", name: "Physics" },
  ],
  HUMANITIES: [
    { id: "ENG", name: "English" },
    { id: "HIS", name: "History" },
    { id: "PHI", name: "Philosophy" },
  ],
  COMMERCE: [
    { id: "BBA", name: "Business Admin" },
    { id: "ACC", name: "Accounting" },
    { id: "FIN", name: "Finance" },
  ],
};

type ApplicationFormData = {
  userId: string;
  universityIds: string[];
  departmentIds: string[];
  stream: keyof typeof departmentsByStream | "";
  status: "PENDING" | "WAITING" | "CONFIRMED" | "REJECTED";
  round: number;
  boardName: string;
  registrationNo: string;
  rollNo: string;
};

const ApplicationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [applications, setApplications] = useState<ApplicationFormData[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [selectedStream, setSelectedStream] = useState<keyof typeof departmentsByStream | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    defaultValues: {
      userId: "",
      universityIds: [],
      departmentIds: [],
      stream: "",
      status: "PENDING",
      round: 1,
      boardName: "",
      registrationNo: "",
      rollNo: "",
    },
  });

  const toggleUniversity = (id: string) => {
    let updated = [...selectedUniversities];
    if (updated.includes(id)) {
      updated = updated.filter((u) => u !== id);
    } else if (updated.length < 5) {
      updated.push(id);
    }
    setSelectedUniversities(updated);
    setValue("universityIds", updated);
  };

  const handleDepartmentSelect = (id: string) => {
    let updated = [...selectedDepartments];
    if (updated.includes(id)) {
      updated = updated.filter((d) => d !== id);
    } else if (updated.length < 5) {
      updated.push(id);
    }
    setSelectedDepartments(updated);
    setValue("departmentIds", updated);
  };

  const filteredUniversities = useMemo(() => {
    return fakeUniversities.filter((uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const onSubmit = (data: ApplicationFormData) => {
    setApplications((prev) => [...prev, data]);
    reset();
    setSelectedDepartments([]);
    setSelectedUniversities([]);
    setSelectedStream("");
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between border p-4">
        <h1 className="text-3xl font-bold">Application Management</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {isOpen ? "Close Form" : "Add Application"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left */}
            <div className="space-y-4">
              <input {...register("userId", { required: "User ID required" })} placeholder="User ID" className="border p-3 rounded w-full" />
             
              <input {...register("boardName", { required: "Board Name required" })} placeholder="Board Name" className="border p-3 rounded w-full" />
              <input {...register("registrationNo", { required: "Reg No required" })} placeholder="Registration No" className="border p-3 rounded w-full" />
              <input {...register("rollNo", { required: "Roll No required" })} placeholder="Roll No" className="border p-3 rounded w-full" />
         
            </div>

            {/* Middle */}
            <div className="space-y-4 border rounded-md p-4 h-full">
                     <label className="font-medium block">Departments (max 5)</label>
              <select
                value={selectedStream}
                onChange={(e) => {
                  const val = e.target.value as keyof typeof departmentsByStream;
                  setSelectedStream(val);
                  setSelectedDepartments([]);
                  setValue("departmentIds", []);
                }}
                className="border p-3 rounded w-full"
              >
                <option value="">Choose Group</option>
                <option value="SCIENCE">Science</option>
                <option value="HUMANITIES">Humanities</option>
                <option value="COMMERCE">Commerce</option>
              </select>

         
              <div className="grid grid-cols-1 gap-2">
                {selectedStream &&
                  departmentsByStream[selectedStream].map((dept) => (
                    <label key={dept.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dept.id}
                        checked={selectedDepartments.includes(dept.id)}
                        onChange={() => handleDepartmentSelect(dept.id)}
                      />
                      {dept.name}
                    </label>
                  ))}
              </div>
            </div>

            {/* Right */}
            <div className="border rounded-md p-4 h-full">
              <label className="block font-semibold mb-2">Select Universities (Max 5)</label>
              <input
                type="text"
                placeholder="Search university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-3 border p-2 rounded"
              />
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {filteredUniversities.map((uni) => (
                  <label key={uni.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      value={uni.id}
                      checked={selectedUniversities.includes(uni.id)}
                      onChange={() => toggleUniversity(uni.id)}
                      className="accent-blue-600"
                    />
                    {uni.name}
                  </label>
                ))}
              </div>
              {selectedUniversities.length > 5 && (
                <p className="text-red-500 text-sm mt-1">You can select up to 5 universities only.</p>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-semibold">
            Submit
          </button>
        </form>
      )}

      {/* Application List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Applications List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Stream</th>
                <th className="border px-4 py-2">Departments</th>
                <th className="border px-4 py-2">Universities</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{app.userId}</td>
                  <td className="border px-4 py-2">{app.stream}</td>
                  <td className="border px-4 py-2">
                    {app.departmentIds.map((id) => (
                      <span key={id} className="bg-blue-100 text-sm px-2 py-1 mr-1 rounded">{id}</span>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {app.universityIds.map((id) => (
                      <span key={id} className="bg-green-100 text-sm px-2 py-1 mr-1 rounded">{id}</span>
                    ))}
                  </td>
                  <td className="border px-4 py-2">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
