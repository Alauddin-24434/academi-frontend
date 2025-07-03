"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, CreditCard } from "lucide-react";
import Link from "next/link";

export default function NewApplication() {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Mock data
  const universities = [
    { id: "1", name: "State University", type: "PUBLIC", applicationFee: 500 },
    { id: "2", name: "Tech Institute", type: "PRIVATE", applicationFee: 750 },
    {
      id: "3",
      name: "National University",
      type: "PUBLIC",
      applicationFee: 600,
    },
    {
      id: "4",
      name: "International College",
      type: "INTERNATIONAL",
      applicationFee: 1000,
    },
  ];

  const departments = [
    { id: "1", name: "Computer Science", code: "CS", seatCapacity: 120 },
    { id: "2", name: "Software Engineering", code: "SE", seatCapacity: 80 },
    { id: "3", name: "Information Technology", code: "IT", seatCapacity: 100 },
    { id: "4", name: "Data Science", code: "DS", seatCapacity: 60 },
  ];

  const selectedUniversityData = universities.find(
    (u) => u.id === selectedUniversity,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">New Application</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>
                  Fill in your application information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* University Selection */}
                <div className="space-y-2">
                  <Label htmlFor="university">Select University</Label>
                  <Select
                    value={selectedUniversity}
                    onValueChange={setSelectedUniversity}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id}>
                          {uni.name} ({uni.type}) - ₹{uni.applicationFee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department Selection */}
                <div className="space-y-2">
                  <Label htmlFor="department">Select Department</Label>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name} ({dept.code}) - {dept.seatCapacity} seats
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Board Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="boardName">Board Name</Label>
                    <Input
                      id="boardName"
                      placeholder="e.g., CBSE, State Board"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNo">Registration Number</Label>
                    <Input
                      id="registrationNo"
                      placeholder="Your registration number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input id="rollNo" placeholder="Your roll number" />
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional information you'd like to provide"
                    className="min-h-[100px]"
                  />
                </div>

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label>Required Documents</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload Mark Sheet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                      >
                        Choose File
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload ID Proof</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedUniversityData ? (
                  <>
                    <div>
                      <h4 className="font-medium">University</h4>
                      <p className="text-sm text-gray-600">
                        {selectedUniversityData.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedUniversityData.type}
                      </p>
                    </div>

                    {selectedDepartment && (
                      <div>
                        <h4 className="font-medium">Department</h4>
                        <p className="text-sm text-gray-600">
                          {
                            departments.find((d) => d.id === selectedDepartment)
                              ?.name
                          }
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Application Fee</span>
                        <span className="font-bold">
                          ₹{selectedUniversityData.applicationFee}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Processing Fee</span>
                        <span>₹50</span>
                      </div>
                      <div className="border-t mt-2 pt-2">
                        <div className="flex justify-between items-center font-bold">
                          <span>Total Amount</span>
                          <span>
                            ₹{selectedUniversityData.applicationFee + 50}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" disabled={!selectedDepartment}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    Select a university to see the summary
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 space-y-2">
                <p>• Application fee is non-refundable</p>
                <p>• All documents must be uploaded before submission</p>
                <p>• Application will be reviewed within 5-7 business days</p>
                <p>• You will receive email notifications for status updates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
