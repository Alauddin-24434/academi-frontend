"use client";

import React, { useState, useRef, use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCreateAdmissionMutation } from "@/redux/features/admission/admissionApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface FormData {
  userId: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  city: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  passportPhoto: File | null;
  departmemntId:string;
}

const StudentAdmissionForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const user = useSelector(selectCurrentUser);
const userId=user?.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [createAdmission] = useCreateAdmissionMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Force form to track `passportPhoto`
  watch("passportPhoto");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();

    try {
      setStatus("loading");

      const timestamp = Math.floor(new Date(data.dateOfBirth).getTime() / 1000);
      formData.append("dateOfBirth", timestamp.toString());
      formData.append("userId", "cmdepeic20000nia8t7frdkhz");
      formData.append("departmentId", "cmdeq4h5y0001nie0emkvviu7");

      Object.entries(data).forEach(([key, value]) => {
        if (key === "passportPhoto" && value instanceof File) {
          formData.append("passportPhoto", value);
        } else if (key !== "dateOfBirth" && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const res = await createAdmission(formData).unwrap();
      setStatus("success");
      toast.success("Admission successful!");
      console.log(res);
    } catch (error) {
      console.error("Admission error:", error);
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 shadow-lg border rounded-xl">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-xl p-6">
        <CardTitle className="text-2xl font-bold">🎓 Student Admission Form</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName", { required: true })} />
            {errors.fullName && <p className="text-red-500 text-sm">Full name is required</p>}
          </div>

          <div>
            <Label htmlFor="fatherName">Father's Name</Label>
            <Input id="fatherName" {...register("fatherName", { required: true })} />
            {errors.fatherName && <p className="text-red-500 text-sm">Father's name is required</p>}
          </div>

          <div>
            <Label htmlFor="motherName">Mother's Name</Label>
            <Input id="motherName" {...register("motherName", { required: true })} />
            {errors.motherName && <p className="text-red-500 text-sm">Mother's name is required</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone", { required: true })} />
            {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>


            <Select onValueChange={(value) => setValue("gender", value.toUpperCase())}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && <p className="text-red-500 text-sm">Gender is required</p>}
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
                valueAsDate: true, // এটি Date object বানায়
              })}
            />

            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">Date of birth is required</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city", { required: true })} />
            {errors.city && <p className="text-red-500 text-sm">City is required</p>}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address", { required: true })} />
            {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="passportPhoto">Passport Photo</Label>
            <Input
              id="passportPhoto"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setValue("passportPhoto", file, { shouldValidate: true });
                }
              }}
            />
            {errors.passportPhoto && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Submit Admission"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentAdmissionForm;
