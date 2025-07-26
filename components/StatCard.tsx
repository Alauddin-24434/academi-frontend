import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
      {icon && (
        <div className="text-3xl text-teal-600 bg-teal-50 p-3 rounded-full">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
