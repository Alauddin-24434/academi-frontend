"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { EventStatus, IEvent, useCreateEventMutation, useGetEventsQuery } from "@/redux/features/event/eventAPi";
import { Toaster } from "react-hot-toast";
import { catchAsync } from "@/middleware/catchAsync";
import Loader from "@/components/loader/loading";

interface FormData {
  name: string;
  description: string;
  date: string;
  status: EventStatus;
}

const EventPage = () => {
  const { data: events, isLoading, error } = useGetEventsQuery();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({

  });

  const onSubmit: SubmitHandler<FormData> = catchAsync(async (data) => {
    const isoDate = new Date(data.date).toISOString();
    const eventData = {
      ...data,
      date: isoDate,
      images: [],


    };

    await createEvent(eventData).unwrap();
    reset();

  })

  if (isLoading)
    return <Loader />


  return (
    <div className="p-6 ">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Events</h1>
        {/* Create Event Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-teal-600 hover:bg-teal-700 text-white">Create New Event</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Fill the form below to create a new event.</DialogDescription>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div>
                <Label>Name *</Label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Event name"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <Label>Description *</Label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full border rounded p-2"
                  rows={4}
                  placeholder="Event description"
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
              </div>

              <div>
                <Label>Date *</Label>
                <Input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
              </div>

              <div>
                <Label>Status *</Label>
                <Select {...register("status")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EventStatus.UPCOMING}>Upcoming</SelectItem>
                    <SelectItem value={EventStatus.CANCELLED}>Cancel</SelectItem>
                    <SelectItem value={EventStatus.COMPLETED}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Event List */}
      { error ? (
        <p>Error loading events.</p>
      ) : events && events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
            </tr>
          </thead>
          <tbody>
            {events?.data?.map((event: IEvent) => (
              <tr key={event.id} className="border border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-2">{event.name}</td>
                <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{event.status || EventStatus}</td>
                <td className="px-4 py-2">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0]}
                      alt={event.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "No Images"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default EventPage;
