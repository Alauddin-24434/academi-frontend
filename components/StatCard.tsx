import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string; // e.g., bg-purple-100
};

const StatCard = ({
  title,
  value,
  icon,
  color = "bg-purple-100",
}: StatCardProps) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md ${color} flex items-center gap-6 min-w-[250px] min-h-[120px]`}
    >
      {icon && (
        <div className="text-4xl text-purple-700 bg-white rounded-full p-3 shadow-inner">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <h4 className="text-base font-semibold text-gray-700">{title}</h4>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
