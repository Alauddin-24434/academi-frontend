"use client";

import StatCard from "@/components/StatCard";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetOverViewsQuery } from "@/redux/features/dashboard/dashboardApi";
import { User, Users, Banknote, BookOpen, Group, Hourglass } from "lucide-react";
import { useSelector } from "react-redux";

type Props = {
  role: "ADMIN" | "STUDENT";
  data: any;
};

export default function Dashboard() {
  const user = useSelector(selectCurrentUser)
  const role = user?.role;

  const { data: dashboardData, isLoading } = useGetOverViewsQuery(undefined);




  if (isLoading) <p>Loading............</p>

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
            <StatCard title="Total Groups" value={dashboardData?.data?.totalGroups} icon={<Group />} />
            <StatCard title="Pending Join Requests" value={dashboardData?.data?.pendingJoinRequests} icon={<Hourglass />} />
            <StatCard title="Total Paid" value={`${dashboardData?.data?.totalPaid}`} icon={<Banknote />} />
            <StatCard title="Total Due" value={`${dashboardData?.data?.totalDue}`} icon={<Banknote />} />
          </>
        )}
      </div>
    </div>
  )
}
