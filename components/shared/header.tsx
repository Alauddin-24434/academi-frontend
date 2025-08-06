import Link from "next/link"
import { Phone } from "lucide-react"

export default function Header() {
  return (
    <header className="relative py-4 px-6 bg-[#00483d]  md:px-10 flex items-center justify-between">


      <div className="container mx-auto flex flex-row justify-between">
        <Link href="/" className="text-2xl font-bold text-[#ffffff]">
          learning.
        </Link>
        <div className="flex items-center gap-8 ">

          <nav className="hidden md:flex gap-6 text-sm font-medium text-[#ffffff]">
            <Link href="/" className="hover:text-accent-yellow transition-colors">
              Home
            </Link>
        
            <Link href="/courses" className="hover:text-accent-yellow transition-colors">
              Courses
            </Link>
         
        
           
          
          </nav>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#ffffff]">
          <Phone className="w-4 h-4" />
          <span>1 800 222 000</span>
        </div>
      </div>
    </header>
  )
}
