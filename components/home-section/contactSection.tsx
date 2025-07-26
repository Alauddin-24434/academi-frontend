
// pages/contact.tsx

import Head from 'next/head';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Lucide icons for contact details

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null); // Clear previous messages

        try {
            // In a real application, you would send this data to your backend API
            // Example of a mock API call:
            const response = await new Promise(resolve => setTimeout(() => {
                console.log("Contact form submitted:", formData);
                resolve({ success: true, message: "Your message has been sent successfully!" });
            }, 1500)); // Simulate network delay

            const result = response as { success: boolean, message: string };

            if (result.success) {
                setSubmitMessage(result.message);
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
            } else {
                setSubmitMessage("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setSubmitMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>Academi - Contact Us</title>
                <meta name="description" content="Get in touch with Academi for inquiries, support, and feedback." />
            </Head>
            <div className="min-h-screen  py-12 px-4">
                <div className="container mx-auto">
                    <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">Get In <span className="text-teal-600">Touch</span></h1>
                    <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        We're here to help! Whether you have questions, feedback, or need support, reach out to us.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Information Section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
                            <div className="space-y-6 flex justify-between items-center">
                                <div className="flex items-center text-gray-700">
                                    <Mail size={24} className="text-teal-600 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Us</h3>
                                        <p className="text-base">info@academi.edu</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Phone size={24} className="text-teal-600 mr-4 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Call Us</h3>
                                        <p className="text-base">+880 123 4567890</p>
                                    </div>
                                </div>
                               
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-10">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">Find Us on the Map</h3>
                                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-500 text-sm">
                                    {/* Replace this with an actual Google Maps embed or similar */}
                                    <p>Map Placeholder</p>
                                    <MapPin size={48} className="absolute text-gray-400 opacity-50" />
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        placeholder="Inquiry about admissions"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        placeholder="Write your detailed message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} className="mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {submitMessage && (
                                    <p className={`mt-4 text-center text-sm ${submitMessage.includes("success") ? 'text-green-600' : 'text-red-600'}`}>
                                        {submitMessage}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactSection;