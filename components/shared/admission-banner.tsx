import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Link from "next/link"

export default function AdmissionBanner() {
  return (
    <div className="bg-accent-yellow text-dark-background py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <h2 className="text-xl md:text-2xl font-bold">Admission is open for the next year batch</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button asChild className="bg-dark-background text-white hover:bg-dark-background/90 px-6 py-3 rounded-full">
          <Link href="#">Get started now</Link>
        </Button>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Phone className="w-5 h-5" />
          <span>+1 234 567 8910</span>
        </div>
      </div>
    </div>
  )
}
