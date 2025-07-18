import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"

export default function Activity() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Latest Activity" />

      <div className="p-6">
        <Card className="akademi-card">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
            <p className="text-gray-600">
              This page is under development. Activity tracking features will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
