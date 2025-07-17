"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUniversitiesQuery } from "@/redux/features/university/universityApi";
import { useGetUniversityDepartmentsQuery } from "@/redux/features/universityDepartment/universityDepartmentApi";
import { useCreateApplicationMutation } from "@/redux/features/application/applicationApi";
import { catchAsync } from "@/utils/catchAsync";

interface ApplicationFormData {
  userId: string;
  universityId: string[];
  departmentId: string[];
  category: string;
  status: "PENDING" | "WAITING" | "CONFIRMED" | "REJECTED";
  round: number;
  boardName: string;
  registrationNo: string;
  rollNo: string;
}

interface SelectedDepartment {
  universityId: string;
  departmentId: string;
}

const ApplicationPage = () => {
  const user = useSelector(selectCurrentUser);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<SelectedDepartment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [createApplication] = useCreateApplicationMutation();

  const { data: universitiesData = [] } = useGetUniversitiesQuery({ searchTerm });
  const { data: universityDeptData = [] } = useGetUniversityDepartmentsQuery(undefined);

  const { register, handleSubmit, setValue, reset } = useForm<ApplicationFormData>({
    defaultValues: {
      userId: user?.id || "",
      universityId: [],
      departmentId: [],
      category: "",
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
    setValue("universityId", updated);
  };

  const toggleDepartmentForUniversity = (universityId: string, departmentId: string) => {
    const exists = selectedDepartments.some(
      (item) => item.universityId === universityId && item.departmentId === departmentId
    );
    let updated = [...selectedDepartments];
    if (exists) {
      updated = updated.filter(
        (item) => !(item.universityId === universityId && item.departmentId === departmentId)
      );
    } else if (updated.length < 5) {
      updated.push({ universityId, departmentId });
    }

    setSelectedDepartments(updated);
    const deptIds = updated.map((d) => d.departmentId);
    setValue("departmentId", deptIds);
  };

  const onSubmit = catchAsync(async (data: ApplicationFormData) => {
    data.userId = user?.id || "";
    data.category = category;
    await createApplication(data).unwrap();
    reset();
    setSelectedDepartments([]);
    setSelectedUniversities([]);
    setCategory("");
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className=" bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          University Application Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input {...register("boardName", { required: true })} placeholder="Board Name" className="input border p-3 rounded" />
            <input {...register("registrationNo", { required: true })} placeholder="Registration No" className="input border p-3 rounded" />
            <input {...register("rollNo", { required: true })} placeholder="Roll No" className="input border p-3 rounded" />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded w-full"
          >
            <option value="">Select Group / Category</option>
            <option value="SCIENCE">Science</option>
            <option value="HUMANITIES">Humanities</option>
            <option value="COMMERCE">Commerce</option>
          </select>

          {/* Universities */}
          <div className="border rounded p-4 bg-gray-50">
            <label className="font-semibold mb-2 block">Select Universities (Max 5)</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search university..."
              className="mb-3 border p-2 rounded w-full"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {universitiesData?.data?.map((uni: { id: string; name: string }) => (
                <label key={uni.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUniversities.includes(uni.id)}
                    onChange={() => toggleUniversity(uni.id)}
                  />
                  {uni.name}
                </label>
              ))}
            </div>
          </div>

          {/* Departments per University */}
          <div className="space-y-6">
            {selectedUniversities.map((universityId) => {
              const departments = universityDeptData?.data?.filter(
                (d) => d.universityId === universityId
              );
              const uniName = universitiesData?.data?.find((u) => u.id === universityId)?.name;

              return (
                <div key={universityId} className="bg-gray-100 p-4 rounded">
                  <h3 className="font-semibold mb-2 text-blue-600">{uniName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {departments?.map((dep) => (
                      <label key={dep.departmentId} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedDepartments.some(
                            (d) =>
                              d.universityId === universityId &&
                              d.departmentId === dep.departmentId
                          )}
                          onChange={() =>
                            toggleDepartmentForUniversity(universityId, dep.departmentId)
                          }
                        />
                        {dep.department?.name || dep.departmentId}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded font-semibold"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Dummy Application List */}
      <div className=" mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Submitted Applications (Demo)</h2>
        <table className="w-full table-auto border-collapse border">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">University</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Round</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Row */}
            <tr>
              <td className="border p-2">Dhaka University</td>
              <td className="border p-2">CSE</td>
              <td className="border p-2">1</td>
              <td className="border p-2 text-green-600">PENDING</td>
            </tr>
            <tr>
              <td className="border p-2">JU</td>
              <td className="border p-2">Physics</td>
              <td className="border p-2">1</td>
              <td className="border p-2 text-yellow-600">WAITING</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationPage;
