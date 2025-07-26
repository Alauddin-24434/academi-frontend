import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GraduationCap, Shield, Users } from 'lucide-react';

const RoleSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">



                        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">User <span className="text-teal-600">Management</span></h1>
                        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Tailored experiences for administrators, students, and general users with role-based permissions.
                        </p>
                    </div>
                </div>
                <div className=" grid  gap-6 py-12 lg:grid-cols-3">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Shield className="h-12 w-12 text-teal-600 mx-auto" />
                            <CardTitle>Administrators</CardTitle>
                            <CardDescription>Full system control with comprehensive management capabilities</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>• Manage all students and faculties</p>
                                <p>• Process payments and transactions</p>
                                <p>• View comprehensive analytics</p>
                                <p>• Configure system settings</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <GraduationCap className="h-12 w-12 text-teal-600 mx-auto" />
                            <CardTitle>Students</CardTitle>
                            <CardDescription>Personalized dashboard for academic and social activities</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>• View academic information</p>
                                <p>• Join and create study groups</p>
                                <p>• Make payments securely</p>
                                <p>• Communicate with peers</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Users className="h-12 w-12 text-teal-600 mx-auto" />
                            <CardTitle>General Users</CardTitle>
                            <CardDescription>Basic access for prospective students and visitors</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>• Browse available programs</p>
                                <p>• Submit applications</p>
                                <p>• Access public information</p>
                                <p>• Contact administration</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default RoleSection;