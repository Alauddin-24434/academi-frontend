"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { toast } from "sonner"
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Upload,
  GraduationCap,
  XCircle,

} from "lucide-react"
import { useCreateStudentMutation, } from "@/redux/features/student/studentApi"

import { useAppDispatch } from "@/redux/hooks"
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi"

import { useRouter, } from "next/navigation"

import { useGetSessionsQuery } from "@/redux/features/session/sessionApi"
import { setUser } from "@/redux/features/auth/authSlice"
import { catchAsync } from "@/middleware/catchAsync"
import { Toaster } from "react-hot-toast"




interface FormData {
  fullName: string
  fatherName: string
  motherName: string
  phone: string
  password: string
  gender: string
  dateOfBirth: string
  address: string
  passportPhoto: File | null
  departmentId: string
  sessionId: string
  email: string
}

const StudentAdmissionForm = () => {

  const [imagePreview, setImagePreview] = useState<string | null>(null)



  const [createStudent, { isLoading }] = useCreateStudentMutation()
  const { data: departmentData, } = useGetDepartmentsQuery(undefined)
  const { data: sessionData } = useGetSessionsQuery(undefined)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch();

  const router = useRouter();




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setValue("passportPhoto", file, { shouldValidate: true })

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }


  const onSubmit: SubmitHandler<FormData> = catchAsync(async (data) => {
    const formData = new FormData()
    const timestamp = Math.floor(new Date(data.dateOfBirth).getTime() / 1000)
    formData.append("dateOfBirth", timestamp.toString())

    Object.entries(data).forEach(([key, value]) => {
      if (key === "passportPhoto" && value instanceof File) {
        formData.append("passportPhoto", value)
      } else if (key !== "dateOfBirth" && value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    const res = await createStudent(formData).unwrap();
    if (res?.success === true) {
      dispatch(setUser({ user: res?.data?.user, token: res?.data?.accessToken }))

      router.push("/payments")
      reset();
    }
  }
  )





  // If the user is not a student, or is a student but has no admission status, render the form
  return (


    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Form Card with Flip Animation */}
        <div className="perspective-1000">
          <div
            className={`relative w-full transition-transform duration-700 transform-style-preserve-3d`}
          >
            {/* Front Side - Form */}
            <Card className="w-full backface-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-none">
              <CardHeader className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white p-8">
                <CardTitle className="text-3xl font-bold flex items-center gap-3">
                  <GraduationCap className="h-8 w-8" />
                  Student Admission Form
                </CardTitle>
                <p className="text-blue-100 mt-2">Please fill in all required information accurately</p>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <User className="h-5 w-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          {...register("fullName", { required: "Full name is required" })}
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">
                          Father's Name *
                        </Label>
                        <Input
                          id="fatherName"
                          {...register("fatherName", { required: "Father's name is required" })}
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                          placeholder="Enter father's name"
                        />
                        {errors.fatherName && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {errors.fatherName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motherName" className="text-sm font-medium text-gray-700">
                          Mother's Name *
                        </Label>
                        <Input
                          id="motherName"
                          {...register("motherName", { required: "Mother's name is required" })}
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                          placeholder="Enter mother's name"
                        />
                        {errors.motherName && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {errors.motherName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: "Please enter a valid phone number",
                              },
                            })}
                            className="h-11 pl-10 border-gray-300 focus:border-teal-500 focus:ring--500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                          Gender *
                        </Label>
                        <Select onValueChange={(value) => setValue("gender", value.toUpperCase(), { shouldValidate: true })}>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            Gender is required
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                          Date of Birth *
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...register("dateOfBirth", {
                              required: "Date of birth is required",
                            })}
                            className="h-11 pl-10 border-gray-300 focus:border-teal-500 focus:ring--500"
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address and Email Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Contact & Account Information</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                        placeholder="Enter your valid email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <XCircle className="h-4 w-4" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                          },
                        })}
                        className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                        placeholder="Enter your valid password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <XCircle className="h-4 w-4" />
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Full Address *
                      </Label>
                      <Input
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500"
                        placeholder="Enter your complete address"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <XCircle className="h-4 w-4" />
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <GraduationCap className="h-5 w-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Academic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                          Department *
                        </Label>
                        <Select onValueChange={(value) => setValue("departmentId", value, { shouldValidate: true })}>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentData?.data?.map((dept: any) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.departmentId && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            Department is required
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="session" className="text-sm font-medium text-gray-700">
                          Academic Session *
                        </Label>
                        <Select onValueChange={(value) => setValue("sessionId", value, { shouldValidate: true })}>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500">
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            {sessionData?.data?.map((session: any) => ( // Use 'seasons' directly, assuming it's the array
                              <SelectItem key={session?.id} value={session?.id}>
                                {session?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.sessionId && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            Session is required
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Upload className="h-5 w-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Photo Upload</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="passportPhoto" className="text-sm font-medium text-gray-700">
                          Passport Size Photo *
                        </Label>
                        <div className="relative">
                          <Input
                            id="passportPhoto"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="h-11 border-gray-300 focus:border-teal-500 focus:ring--500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-teal-700 hover:file:bg-blue-100"
                          />
                        </div>
                        {errors.passportPhoto && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            Photo is required
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Upload a recent passport-size photograph (JPG, PNG, max 2MB)
                        </p>
                      </div>

                      {/* Image Preview */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                          {imagePreview ? (
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">Photo Preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"

                      className="w-full md:w-auto px-12 py-3 h-12 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting Application...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          Submit Admission Application
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
         <Toaster position="top-center" />
    </div>

  )
}

export default StudentAdmissionForm