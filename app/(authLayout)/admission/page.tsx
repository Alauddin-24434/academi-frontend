"use client"

import { useState, useRef } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Redux
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/features/auth/authSlice"
import { useCreateStudentMutation } from "@/redux/features/student/studentApi"
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi"
import { useGetSessionsQuery } from "@/redux/features/session/sessionApi"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Icons
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Upload,
  GraduationCap,
  XCircle,
} from "lucide-react"

// Form Data Type
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
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  // API Hooks
  const [createStudent, { isLoading }] = useCreateStudentMutation()
  const { data: departmentData } = useGetDepartmentsQuery(undefined)
  const { data: sessionData } = useGetSessionsQuery(undefined)

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setValue("passportPhoto", file, { shouldValidate: true })
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData()
    const timestamp = Math.floor(new Date(data.dateOfBirth).getTime() / 1000)
    formData.append("dateOfBirth", timestamp.toString())

    Object.entries(data).forEach(([key, value]) => {
      if (key === "passportPhoto" && value instanceof File) {
        formData.append("passportPhoto", value)
      } else if (key !== "dateOfBirth" && value !== null) {
        formData.append(key, value.toString())
      }
    })

    try {
      const res = await createStudent(formData).unwrap()
      if (res?.success) {
        dispatch(setUser({ user: res.data?.user, token: res.data?.accessToken }))
        router.push("/payments")
        reset()
      }
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
      console.error("Submission error", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ===== Admission Form Card ===== */}
        <Card className="w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-none">
          {/* ===== Header ===== */}
          <CardHeader className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white p-8">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              Student Admission Form
            </CardTitle>
            <p className="text-blue-100 mt-2">
              Please fill in all required information accurately
            </p>
          </CardHeader>

          {/* ===== Form Content ===== */}
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* ===== Personal Info Section ===== */}
              {/* Create section components if reusable */}
              {/* Full name, father, mother, phone, gender, DOB */}

              {/* ===== Contact & Login Info Section ===== */}
              {/* Email, Password, Address */}

              {/* ===== Academic Section ===== */}
              {/* Department and Session Selection */}

              {/* ===== Photo Upload Section ===== */}
              {/* File input + preview */}

              {/* ===== Submit Button ===== */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
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
  )
}

export default StudentAdmissionForm
