'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import PrivateRoute from '@/middleware/privateRoute';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetStudentByUserIdQuery } from '@/redux/features/student/studentApi';
import { usePaymentInitiateMutation } from '@/redux/features/payment/paymentApi';

type Plan = { title: string; price: number };

function PaymentCard({
    title,
    description,
    price,
    features,
    onSelectPlan,
    highlight = false,
    height = 'min-h-[380px]',
    disabled = false,
}: {
    title: string;
    description: string;
    price: string;
    features: string[];
    onSelectPlan: (plan: Plan) => void;
    highlight?: boolean;
    height?: string;
    disabled?: boolean;
}) {
    const numericPrice = Number(price.replace(/[^\d]/g, ''));

    return (
        <Card
            className={`w-full md:w-[350px] ${height} bg-white/5 backdrop-blur-md border ${highlight ? 'border-yellow-400' : 'border-teal-600'
                } shadow-lg flex flex-col justify-between`}
        >
            <CardHeader className="pb-3">
                <CardTitle className="text-white text-2xl">{title}</CardTitle>
                <CardDescription className="text-teal-200 text-sm mb-4">{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pt-0 flex-grow">
                <ul className="mb-6 space-y-2 text-teal-100 text-sm">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <div className="text-white text-3xl font-extrabold mb-4">{price}</div>
                    <Button
                        disabled={disabled}
                        className={`w-full text-white text-base py-2 ${disabled
                            ? 'bg-gray-500 cursor-not-allowed'
                            : highlight
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : 'bg-teal-600 hover:bg-teal-700'
                            }`}
                        onClick={() => {
                            if (!disabled) onSelectPlan({ title, price: numericPrice });
                        }}
                    >
                        Pay Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PaymentsPage() {
    const user = useSelector(selectCurrentUser);
    console.log(user)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const { data: studentData } = useGetStudentByUserIdQuery(user?.studentId);
    const [paymentInitiate] = usePaymentInitiateMutation();

    const handlePaymentSubmit = async () => {
        if (!selectedPlan || !studentData?.data?.id) return;

        const paymentData = {
            amount: Number(selectedPlan?.price || 0),
            studentId: studentData?.data?.id || '',
            paymentDate: new Date(),
            description: selectedPlan?.title || '',
        };


        try {
            console.log('Submitting payment:', paymentData);
            const res = await paymentInitiate(paymentData).unwrap();
            console.log('Payment Response:', res);
            if (res?.success && res?.data?.paymentInitiateResult?.payment_url
) {
                window.location.href = res.data.paymentInitiateResult.payment_url; // Redirect to payment gateway
            }
            setSelectedPlan(null);
        } catch (error) {
            console.error(error);
            alert('Payment submission failed');
        }
    };

    return (
        <PrivateRoute>
            <section className="min-h-screen py-16 px-4 md:px-10 bg-gradient-to-br from-[#0f172a] to-[#164e63]">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
                    <p className="text-lg text-teal-200">
                        Select the most suitable payment option to continue your academic journey smoothly.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    <PaymentCard
                        title="Monthly Fee"
                        description="This recurring fee includes tuition, lab usage, internet access, and student support services."
                        price="500"
                        height="min-h-[460px]"
                        disabled
                        features={[
                            'All course lectures',
                            'Lab access and materials',
                            '24/7 student support',
                            'High-speed internet',
                        ]}
                        onSelectPlan={setSelectedPlan}
                    />
                    <PaymentCard
                        title="Admission Fee"
                        description="This one-time fee covers your registration and onboarding process."
                        price="5000"
                        highlight
                        height="min-h-[380px]"
                        features={['Registration with student ID', 'Orientation session', 'Access to welcome kit']}
                        onSelectPlan={(plan) => {
                            setSelectedPlan(plan);
                            setTimeout(() => {
                                handlePaymentSubmit();
                            }, 100); // small delay to ensure state updates
                        }}
                    />
                    <PaymentCard
                        title="Library Fee"
                        description="Covers access to the digital library, physical resources, and reading rooms for a year."
                        price="500"
                        height="min-h-[380px]"
                        disabled
                        features={['Unlimited book borrowing', 'Access to online journals', 'Quiet study spaces']}
                        onSelectPlan={setSelectedPlan}
                    />
                </div>
            </section>
        </PrivateRoute>
    );
}
