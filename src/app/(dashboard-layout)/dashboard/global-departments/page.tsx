"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { catchAsync } from "@/utils/catchAsync";
import { useCrateGlobalDepartmentMutation, useGetGlobalDepartmentsQuery } from "@/redux/features/globalDepartment/globalDepartment";

enum CategoryEnum {
  SCIENCE = "SCIENCE",
  HUMANITIES = "HUMANITIES",
  COMMERCE = "COMMERCE",
}

type GlobalDepartmentFormData = {
  name: string;
  code: string;
  category: CategoryEnum;
};

const GlobalDepartmentPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [createGlobalDepartment] = useCrateGlobalDepartmentMutation();

  const { data: departmentsData } = useGetGlobalDepartmentsQuery(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GlobalDepartmentFormData>({
    defaultValues: {
      name: "",
      code: "",
      category: CategoryEnum.SCIENCE, // ডিফল্ট ভ্যালু দিতে পারো
    },
  });

  const onGlobalDepartmentSubmit: SubmitHandler<GlobalDepartmentFormData> = catchAsync(async (data) => {
    console.log("Submitted Global Department:", data);
    await createGlobalDepartment(data).unwrap();

    reset();
    setIsOpen(false);
  });

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
          onSubmit={handleSubmit(onGlobalDepartmentSubmit)}
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
              {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register("code", { required: "Code is required" })}
                placeholder="Code"
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.code ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.code && <p className="text-red-500 mt-1 text-sm">{errors.code.message}</p>}
            </div>

            <div>
              <label className="font-medium block mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                defaultValue={CategoryEnum.SCIENCE}
              >
                <option value={CategoryEnum.SCIENCE}>Science</option>
                <option value={CategoryEnum.HUMANITIES}>Humanities</option>
                <option value={CategoryEnum.COMMERCE}>Commerce</option>
              </select>
              {errors.category && <p className="text-red-500 mt-1 text-sm">{errors.category.message}</p>}
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

      {/* Department List Table */}
      <div className="mt-14 overflow-x-auto rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">Department List</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Code</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 border-b">Category</th>
            </tr>
          </thead>
          <tbody>
            {departmentsData?.data?.map((dep :GlobalDepartmentFormData, idx:number) => (
              <tr key={idx} className="hover:bg-gray-100 transition-colors even:bg-gray-50">
                <td className="px-6 py-4 border-b text-gray-800 font-medium">{dep.name}</td>
                <td className="px-6 py-4 border-b text-gray-700">{dep.code}</td>
                <td className="px-6 py-4 border-b text-gray-700">{dep.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GlobalDepartmentPage;
