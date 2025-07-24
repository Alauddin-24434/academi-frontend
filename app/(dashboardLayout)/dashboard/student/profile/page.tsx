"use client";
import { useGetUserByUserIdQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

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

type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
};

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-16 flex flex-col">
      {/* HEADER */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-md">
          👤 Student Profile
        </h1>
        <p className="text-indigo-500 mt-2 text-lg">
          Welcome back, <span className="font-semibold">{student.fullName}</span>
        </p>
      </header>

      {/* MAIN CONTENT */}
      <section className="flex flex-1 gap-16">
        {/* LEFT SIDE - PROFILE PHOTO */}
        <div className="flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl border-8 border-indigo-300 w-96 h-96">
          <img
            src={student.passportPhoto}
            alt={`${student.fullName} Passport`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="flex-grow bg-white rounded-3xl shadow-2xl p-12 flex flex-col justify-between">
          {/* Personal Info */}
          <div>
            <h2 className="text-4xl font-bold text-indigo-700 mb-8 border-b-4 border-indigo-300 pb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-xl text-gray-700">
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

          {/* Department Info */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-4 border-indigo-300 pb-4">
              Department & Faculty
            </h2>
            <div className="text-gray-700 text-2xl space-y-4">
              <p>
                <span className="font-semibold">Department Name:</span> {student.department.name}
              </p>
              <p>
                <span className="font-semibold">Department Code:</span> {student.department.code}
              </p>
              <p>
                <span className="font-semibold">Faculty:</span> {student.department.faculty.name}
              </p>
              <p className="text-lg italic text-indigo-400 max-w-xl">
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
      <p className="text-indigo-700 font-semibold">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
