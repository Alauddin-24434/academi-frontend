"use client";
import { useGetUserByUserIdQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AlertTriangle, CreditCard } from "lucide-react";

type Faculty = {
  id: string;
  name: string;
  description: string;
};

type Department = {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  faculty: Faculty;
};

type Student = {
  id: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  city: string;
  phone: string;
  address: string;
  gender: string;
  passportPhoto: string;
  status: string;
  dateOfBirth: string;
  departmentId: string;
  department: Department;
};

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;
  const router = useRouter();

  const { data: userData, isLoading, isError } = useGetUserByUserIdQuery(userId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-gray-400 animate-pulse">
          Loading user data...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-red-500">
          Failed to load user data.
        </p>
      </div>
    );

  const student = userData?.data?.student;

  if (!student)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-gray-600">
          No student data found.
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-6 md:p-10">
      <section className="flex flex-col-reverse lg:flex-row gap-8 items-start">
        <div className="flex-grow bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-10">
          {/* STATUS-BASED MESSAGE */}
          {student.status === "PENDING" && (
            <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-700">
                    Action Required: Payment Pending!
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    Your student profile is not approved yet. Please complete your payment to proceed.
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/payments")}
                className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                <CreditCard size={18} />
                Make Payment
              </button>
            </div>
          )}




          {/* PERSONAL INFO */}
          <div>
            <div className="flex flex-row justify-between items-center mb-4 border-b border-teal-300 pb-2 ">
              <div>
                <h1 className="text-5xl font-extrabold text-teal-700 drop-shadow-md">
                  Student Information
                </h1>
                {student.status === "APPROVE" && (
                  <div>

                    <p className="text-sm text-teal-600 mt-1">
                      🎉  Congratulations on becoming an official member of our institution.
                    </p>
                  </div>

                )}
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-md overflow-hidden border-4 border-teal-400 shadow-lg">
                <img
                  src={student.passportPhoto}
                  alt={`${student.fullName} Passport`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
              <InfoRow label="Full Name" value={student.fullName} />
              <InfoRow label="Father's Name" value={student.fatherName} />
              <InfoRow label="Mother's Name" value={student.motherName} />
              <InfoRow label="Gender" value={student.gender} />
              <InfoRow
                label="Date of Birth"
                value={new Date(parseInt(student.dateOfBirth) * 1000).toLocaleDateString()}
              />
              <InfoRow label="Status" value={student.status} />
              <InfoRow label="City" value={student.city} />
              <InfoRow label="Phone" value={student.phone} />
              <InfoRow label="Address" value={student.address} />
            </div>
          </div>

          {/* DEPARTMENT INFO */}
          <div>
            <h2 className="text-2xl font-bold text-teal-700 mb-4 border-b border-teal-300 pb-2">
              🏫 Department & Faculty
            </h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-semibold">Department Name:</span>{" "}
                {student.department.name}
              </p>
              <p>
                <span className="font-semibold">Department Code:</span>{" "}
                {student.department.code}
              </p>
              <p>
                <span className="font-semibold">Faculty:</span>{" "}
                {student.department.faculty.name}
              </p>
              <p className="text-sm italic text-teal-500">
                {student.department.faculty.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-teal-600">{label}</p>
      <p className="mt-1 text-gray-800 font-semibold text-sm">{value}</p>
    </div>
  );
}
