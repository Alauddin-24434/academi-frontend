


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
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-6 md:p-10">
      {/* MAIN CONTENT */}
      <section className="flex flex-col-reverse lg:flex-row gap-8 items-start">
        {/* LEFT SIDE - INFO */}
        <div className="flex-grow bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-10">
          {/* Personal Info */}
          <div className="">


            <div className="flex flex-row justify-between items-center mb-4 border-b border-teal-300 pb-2 ">
              <div>
                <h1 className="text-5xl font-extrabold text-teal-700 drop-shadow-md">
                   Student Profile
                </h1>
                <p className="text-teal-500 mt-2 text-lg">
                  Welcome back, <span className="font-semibold">{student.fullName}</span>
                </p>
              </div>
              {/* RIGHT SIDE - PROFILE PHOTO */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-md overflow-hidden border-4 border-teal-400 shadow-lg mx-auto lg:mx-0">
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

          {/* Department Info */}
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
