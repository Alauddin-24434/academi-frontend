'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: '1. Fill Out Admission Form',
    description: 'Visit the Admission page and complete the application form with accurate personal and academic details.',
  },
  {
    title: '2. Submit Required Documents',
    description: 'Upload passport photo, academic certificates, and other required documents.',
  },
  {
    title: '3. Pay Admission Fee',
    description: 'Go to the Payment section and complete your payment securely.',
  },
  {
    title: '4. Confirmation & Dashboard Access',
    description: 'After successful payment, your admission will be verified, and you will get access to the student portal.',
  },
];

export default function AdmissionProcessPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-teal-700">How the Admission Process Works</h1>
        <p className="text-gray-600 mb-12">
          Follow the steps below to complete your admission at DIU.
        </p>

        <div className="space-y-8 text-left">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 bg-white shadow-md p-6 rounded-lg">
              <CheckCircle className="text-teal-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
