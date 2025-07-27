'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

const HeroSection = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed hero-bg"
        style={{
          backgroundImage: "url('/images/admission-head.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-5xl mx-auto">
          <p className="text-teal-600 mb-6 text-lg md:text-xl animate-fade-in-up font-medium tracking-wide">
            Welcome to DIU
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up hero-text-shadow"
            style={{ animationDelay: "0.2s" }}
          >
            Shaping Tomorrow's
            <span className="block text-teal-600 mt-2">Leaders Today</span>
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up hero-text-shadow"
            style={{ animationDelay: "0.4s" }}
          >
            Join our prestigious institution where academic excellence meets innovation. We provide world-class
            education, cutting-edge research opportunities, and a vibrant campus community.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {user && user.role === 'STUDENT' ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-full"
                >
                Dashboard Portal <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            ) : ( 
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-full"
                >
                  Admission <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link href="/admission-process">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-teal-600 bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-full"
              >
                How It Works <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
