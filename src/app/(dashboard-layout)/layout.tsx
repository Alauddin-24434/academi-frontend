'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Universities', path: '/dashboard/universities' },
  { label: 'Departments', path: '/dashboard/departments' },
  { label: 'Applications', path: '/dashboard/applications' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-4 shadow-lg z-30 transform top-0 left-0 h-full fixed md:relative transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                pathname === link.path ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-0 md:ml-64">
        {/* Topbar for small screen */}
        <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <button onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
