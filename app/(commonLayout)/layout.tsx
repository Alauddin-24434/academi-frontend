import { Button } from "@/components/ui/button";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div >
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-6">
                <a href="#home" data-lenis-scroll="#home" className="text-teal-600 font-medium">
                  Home
                </a>
                <a href="#about" data-lenis-scroll="#about" className="text-gray-600 hover:text-teal-600">
                  About
                </a>
                <a href="#programs" data-lenis-scroll="#programs" className="text-gray-600 hover:text-teal-600">
                  Programs
                </a>
                <a href="#faculty" data-lenis-scroll="#faculty" className="text-gray-600 hover:text-teal-600">
                  Faculty
                </a>
                <a href="#campus" data-lenis-scroll="#campus" className="text-gray-600 hover:text-teal-600">
                  Campus Life
                </a>
                <a href="#admissions" data-lenis-scroll="#admissions" className="text-gray-600 hover:text-teal-600">
                  Admissions
                </a>
                <a href="#news" data-lenis-scroll="#news" className="text-gray-600 hover:text-teal-600">
                  News
                </a>
                <a href="#contact" data-lenis-scroll="#contact" className="text-gray-600 hover:text-teal-600">
                  Contact
                </a>
              </div>
            </div>
          <Link href={'/dashboard'}>
            <Button className="bg-teal-600 hover:bg-teal-700">Student Portal</Button>
          </Link>
          </div>
        </div>
      </nav>
      <main >{children}</main>
    </div>
  );
};

export default layout;