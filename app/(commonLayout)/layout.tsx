// components/layout.tsx
// (Assuming this file is in your components directory and imported by your root layout)

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Import Lucide icons for the footer (install if not already done: npm install lucide-react)
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Section: Academi Logo/Text and Navigation Links */}
            <div className="flex items-center space-x-8">
              {/* Academi Logo/Text */}
              <Link href="/" className="text-2xl font-bold text-teal-800 hover:text-teal-600 transition-colors duration-200">
                Academi
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6">
                <Link href="/aboutUs" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
                  About Us
                </Link>
                <Link href="/events" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
                  Events
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right Section: Student Portal Button */}
            <Link href={'/dashboard'}>
              {/* Button is a custom component, so it stays as a child */}
              <Button className="bg-teal-600 hover:bg-teal-700">Student Portal</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>{children}</main>

      {/* --- Footer --- */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-3xl font-bold text-teal-400 mb-4">
              Academi
            </Link>
            <p className="text-gray-300 mb-4">
              Empowering your academic journey with seamless tools and a vibrant community.
            </p>
            <div className="flex space-x-4">
              {/* Social media links remain <a> tags as they are external links */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aboutUs" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Get In Touch</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin size={20} className="mr-3 text-teal-400 flex-shrink-0" />
                <p className="text-gray-300">
                  123 University Road,<br/>
                  Academi City, 1200 BD<br/>
                  Barishal, Bangladesh
                </p>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                {/* These are still <a> tags because they are external protocols (tel:, mailto:) */}
                <Phone size={20} className="mr-3 text-teal-400 flex-shrink-0" />
                <a href="tel:+8801234567890" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  +880 123 4567890
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail size={20} className="mr-3 text-teal-400 flex-shrink-0" />
                <a href="mailto:info@academi.edu" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                  info@academi.edu
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: About Academi (Optional) */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">About Academi</h3>
            <p className="text-gray-300 mb-4">
              Academi is dedicated to providing a supportive and innovative environment for students to excel academically and personally.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          © {currentYear} Academi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;