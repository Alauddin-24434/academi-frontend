"use client";

import React, { useState, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  GraduationCap,
  XCircle,
  PlusCircle,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateTeacherMutation, useGetAllTeachersQuery } from "@/redux/features/teacher/teacherApi";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import { Toaster } from "react-hot-toast";
import { catchAsync } from "@/middleware/catchAsync";

interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  password: string;
  address: string;
  passportPhoto: File | null;
  departmentId: string;
  teachingSubjectTitle: string;
  teachingDescription?: string;
}

const TeacherPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const { data: departmentData } = useGetDepartmentsQuery(undefined);
  const { data: teacherData, refetch } = useGetAllTeachersQuery(undefined);
  console.log(teacherData)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue("passportPhoto", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = catchAsync(async (data) => {
    const formData = new FormData();

    const timestamp = Math.floor(new Date(data.dateOfBirth).getTime() / 1000);
    formData.append("dateOfBirth", timestamp.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (key === "passportPhoto" && value instanceof File) {
        formData.append("passportPhoto", value);
      } else if (key !== "dateOfBirth" && value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const res = await createTeacher(formData).unwrap();
    if (res?.success === true) {
      toast.success("Teacher created successfully!");
      reset();
      refetch();
    }

  })


  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Teachers</h1>
        <Dialog>
          <DialogTrigger asChild className="bg-teal-500 hover:bg-teal-800">
            <Button className="flex gap-2"><PlusCircle /> Add Teacher</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-screen">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <GraduationCap /> Create Teacher
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input {...register("fullName", { required: true })} />
                </div>
                <div>
                  <Label>Father's Name *</Label>
                  <Input {...register("fatherName", { required: true })} />
                </div>
                <div>
                  <Label>Mother's Name *</Label>
                  <Input {...register("motherName", { required: true })} />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input {...register("phone", { required: true })} />
                </div>
                <div>
                  <Label>Gender *</Label>
                  <Select onValueChange={(val) => setValue("gender", val, { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input type="date" {...register("dateOfBirth", { required: true })} />
                </div>
                <div>
                  <Label>Address *</Label>
                  <Input {...register("address", { required: true })} />
                </div>
                <div>
                  <Label>Department *</Label>
                  <Select onValueChange={(val) => setValue("departmentId", val, { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
                    <SelectContent>
                      {departmentData?.data?.map((dept: any) => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Teaching Subject *</Label>
                  <Input {...register("teachingSubjectTitle", { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Input {...register("teachingDescription")} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input {...register("email", { required: true })} />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input type="password" {...register("password", { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Passport Photo *</Label>
                  <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="h-32 mt-2 object-cover" />}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Create Teacher"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Teachers */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Subject</th>
            
            </tr>
          </thead>
          <tbody>
            {teacherData?.data?.map((teacher: any) => (
              <tr key={teacher.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{teacher.fullName}</td>
                <td className="py-2 px-4 border">{teacher.phone}</td>
                <td className="py-2 px-4 border">{teacher.gender}</td>
                <td className="py-2 px-4 border">{teacher.teachingSubjectTitle
}</td>
        
              </tr>
            )) || (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">No teachers found</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default TeacherPage;
