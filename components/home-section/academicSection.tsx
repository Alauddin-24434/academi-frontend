import { BookOpen, Building2, Calendar, UserCheck } from 'lucide-react';
import React from 'react';

const AcademicSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="text-sm font-medium text-teal-600 uppercase tracking-wider">
                        Academic Organization
                    </span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Structured Academic Management
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Organize your institution with faculties, departments, and academic sessions. Maintain a clear and flexible academic structure for smooth administration and role-based access.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                            <Building2 className="h-6 w-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Faculty Management</h4>
                        <p className="text-sm text-gray-500">Organize departments under faculties</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                            <BookOpen className="h-6 w-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Department Structure</h4>
                        <p className="text-sm text-gray-500">Unique codes and clear organization</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                            <Calendar className="h-6 w-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Academic Sessions</h4>
                        <p className="text-sm text-gray-500">Year-wise student management</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                            <UserCheck className="h-6 w-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">Role-Based Access</h4>
                        <p className="text-sm text-gray-500">Admin, Student, and User roles</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcademicSection;