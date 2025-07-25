import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"

export default function Events() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Event" />

      <div className="p-6">
        <Card className="akademi-card">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Events Coming Soon</h2>
            <p className="text-gray-600">
              This page is under development. Events management features will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
