import emailjs from '@emailjs/browser';
import Head from 'next/head';
import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet'; // <-- Import LatLngExpression for typing
import 'leaflet/dist/leaflet.css';

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // EmailJS env variables
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service configuration missing.');
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (result.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error('An error occurred.');
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Type-safe map center
  const mapCenter: LatLngExpression = [22.7010, 90.3690]; // Barishal coordinates

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact page using Leaflet.js and EmailJS without Google Maps"
        />
      </Head>

      <div className="min-h-screen py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-4">
            Get In <span className="text-teal-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">We're here to help!</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Contact Info</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="text-teal-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>info@academi.edu</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="text-teal-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+880 123 4567890</p>
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Our Location</h3>
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: '256px', width: '100%', borderRadius: '0.5rem' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapCenter}>
                    <Popup>Our Office (Barishal)</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Send Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white ${
                    isSubmitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default ContactSection;
