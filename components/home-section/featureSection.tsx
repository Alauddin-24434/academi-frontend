import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { CreditCard, MessageSquare, Users } from 'lucide-react';

const FeatureSection = () => {
    return (
        <section id="features" className="w-full py-12 md:py-24  lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">


                        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">Manage <span className="text-teal-600">Features</span></h1>
                        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            From student enrollment to payment processing, our platform covers all aspects of educational
                            administration.
                        </p>
                    </div>
                </div>
                <div className=" grid  items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Users className="h-10 w-10 text-teal-600" />
                            <CardTitle>Student Management</CardTitle>
                            <CardDescription>
                                Complete student lifecycle management with enrollment, status tracking, and profile management.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Student registration & approval</li>
                                <li>• Academic session assignment</li>
                                <li>• Department & faculty organization</li>
                                <li>• Status tracking (Pending, Approved, Graduated)</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <MessageSquare className="h-10 w-10 text-teal-600" />
                            <CardTitle>Communication Hub</CardTitle>
                            <CardDescription>
                                Integrated messaging system with group communication and join request management.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Individual & group messaging</li>
                                <li>• Student group creation</li>
                                <li>• Join request approval system</li>
                                <li>• Real-time communication</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CreditCard className="h-10 w-10 text-teal-600" />
                            <CardTitle>Payment Processing</CardTitle>
                            <CardDescription>
                                Secure payment management with transaction tracking and multiple payment statuses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Secure transaction processing</li>
                                <li>• Payment status tracking</li>
                                <li>• Transaction history</li>
                                <li>• Automated receipts</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;