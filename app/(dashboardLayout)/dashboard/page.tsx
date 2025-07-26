"use client";

import StatCard from "@/components/StatCard";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetOverViewsQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  User,
  Users,
  Banknote,
  BookOpen,
  Group,
  Hourglass,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const role = user?.role;

  const { data: dashboardData, isLoading } = useGetOverViewsQuery(undefined);

  if (isLoading) return <p className="text-center mt-10">Loading............</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {role === "ADMIN" ? (
          <>
            <StatCard title="Total Students" value={dashboardData?.data?.totalStudents} icon={<Users />} />
            <StatCard title="Approved Students" value={dashboardData?.data?.approvedStudents} icon={<User />} />
            <StatCard title="Pending Students" value={dashboardData?.data?.pendingStudents} icon={<Hourglass />} />
            <StatCard title="Suspended Students" value={dashboardData?.data?.suspendedStudents} icon={<User />} />
            <StatCard title="Total Faculties" value={dashboardData?.data?.totalFaculties} icon={<BookOpen />} />
            <StatCard title="Total Departments" value={dashboardData?.data?.totalDepartments} icon={<BookOpen />} />
            <StatCard title="Total Groups" value={dashboardData?.data?.totalGroups} icon={<Group />} />
            <StatCard title="Pending Join Requests" value={dashboardData?.data?.pendingJoinRequests} icon={<Hourglass />} />
            <StatCard title="Total Payments" value={`${dashboardData?.data?.totalPayments}`} icon={<Banknote />} />
            <StatCard title="Completed Payments" value={`৳${dashboardData?.data?.completedPayments}`} icon={<Banknote />} />
            <StatCard title="Pending Payments" value={`${dashboardData?.data?.pendingPayments}`} icon={<Banknote />} />
          </>
        ) : (
          <>
            <StatCard title="Full Name" value={dashboardData?.data?.fullName} icon={<User />} />
            <StatCard title="Status" value={dashboardData?.data?.status} icon={<User />} />
            <StatCard title="Session" value={dashboardData?.data?.session} icon={<BookOpen />} />
            <StatCard title="Department" value={dashboardData?.data?.department} icon={<BookOpen />} />
            <StatCard title="Faculty" value={dashboardData?.data?.faculty} icon={<BookOpen />} />
            <StatCard title="Total Paid" value={`${dashboardData?.data?.totalPaid}`} icon={<Banknote />} />
          </>
        )}
      </div>

      {/* Student's Payment Table */}
      {role === "STUDENT" && dashboardData?.data?.paymentLists?.length > 0 && (
        <div className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-teal-800">Your Payment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
              <thead className="bg-teal-50 text-teal-700">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Amount</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData?.data?.paymentLists.map((payment: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">৳{payment.amount}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${payment.status === "COMPLETE" ? "bg-green-100 text-green-700" :
                          payment.status === "FAILED" ? "bg-red-100 text-red-700" :
                          payment.status === "CANCELED" ? "bg-gray-200 text-gray-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
