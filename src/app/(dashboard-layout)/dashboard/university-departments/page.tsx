"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { catchAsync } from "@/utils/catchAsync";
import {
  useCrateUniversityDepartmentMutation,
  useGetUniversityDepartmentsQuery,
} from "@/redux/features/universityDepartment/universityDepartmentApi";
import { useGetUniversitiesQuery } from "@/redux/features/university/universityApi";
import { useGetGlobalDepartmentsQuery } from "@/redux/features/globalDepartment/globalDepartment";


type UniversityDepartmentFormData = {
  universityId: string;
  departmentId: string;
  seatCapacity: number;
};

const UniversityDepartmentPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [createUniversityDepartment] =
    useCrateUniversityDepartmentMutation();

  const { data: universityDepartments } = useGetUniversityDepartmentsQuery(undefined);
  const { data: universities } = useGetUniversitiesQuery({});
  const { data: departments } = useGetGlobalDepartmentsQuery(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UniversityDepartmentFormData>({
    defaultValues: {
      universityId: "",
      departmentId: "",
      seatCapacity: 0,
    },
  });

  const onSubmit: SubmitHandler<UniversityDepartmentFormData> = catchAsync(
    async (data) => {
      await createUniversityDepartment(data).unwrap();
      reset();
      setIsOpen(false);
    }
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6 border p-4 rounded-md shadow">
        <h1 className="text-3xl font-semibold text-gray-800">
          University-Department Mapping
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded shadow"
        >
          {isOpen ? "Close Form" : "Add Mapping"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* University Select */}
            <div>
              <label className="block mb-1 font-medium">University</label>
              <select
                {...register("universityId", {
                  required: "University is required",
                })}
                className={`w-full border rounded-md p-3 ${errors.universityId ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select University</option>
                {universities?.data?.map((uni: any) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              {errors.universityId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.universityId.message}
                </p>
              )}
            </div>

            {/* Department Select */}
            <div>
              <label className="block mb-1 font-medium">Department</label>
              <select
                {...register("departmentId", {
                  required: "Department is required",
                })}
                className={`w-full border rounded-md p-3 ${errors.departmentId ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select Department</option>
                {departments?.data?.map((dep: any) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            {/* Seat Capacity Input */}
            <div>
              <label className="block mb-1 font-medium">Seat Capacity</label>
              <input
                type="number"
                {...register("seatCapacity", {
                  required: "Seat capacity is required",
                  min: { value: 1, message: "Minimum 1 seat required" },
                })}
                placeholder="e.g. 50"
                className={`w-full border rounded-md p-3 ${errors.seatCapacity ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.seatCapacity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.seatCapacity.message}
                </p>
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

      {/* Mapped Department Table */}
      <div className="mt-14 overflow-x-auto rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">
          Mapped Departments
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">
                University
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">
                Department
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">
                Seat Capacity
              </th>
            </tr>
          </thead>
          <tbody>
            {universityDepartments?.data?.map((item: any, idx: number) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors even:bg-gray-50"
              >
                <td className="px-6 py-4 border-b text-gray-800 font-medium">
                  {item.university?.name}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {item.department?.name}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {item.seatCapacity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityDepartmentPage;
