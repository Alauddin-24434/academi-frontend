// pages/events.tsx

import Head from 'next/head';
import { Tag, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react'; // Import Lucide icons
import Image from 'next/image'; // Import the Image component

// Define a type for your event data for better type safety
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "upcoming" | "completed"; // Key property for status
  tag: string[]; // For additional categorization like "Academic", "Sports"
  imageUrl?: string; // Make imageUrl optional with '?'
}

const EventsPage = () => {
  // Example Event Data
  const events: Event[] = [
    {
      id: 1,
      title: "Annual Tech Fest",
      date: "August 20, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Main Auditorium, Academi Campus",
      description: "Explore innovations, participate in coding challenges, and attend expert workshops.",
      status: "upcoming",
      tag: ["Academic", "Technology"]
    },
    {
      id: 2,
      title: "Student Orientation Day",
      date: "September 1, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "New Student Welcome Center",
      description: "A warm welcome and essential information session for all new students joining Academi.",
      status: "upcoming",
      tag: ["Orientation", "Campus"]
    },
    {
      id: 3,
      title: "Career Fair 2025",
      date: "September 15, 2025",
      time: "11:00 AM - 4:00 PM",
      location: "University Sports Hall",
      description: "Connect with top companies, explore internship opportunities, and get career advice.",
      status: "upcoming",
      tag: ["Career", "Networking"]
    },
    {
      id: 4,
      title: "Graduation Ceremony 2024", // Example of a completed event with an image
      date: "December 10, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Grand Convocation Hall",
      description: "Celebrating the achievements of the graduating class of 2024.",
      status: "completed",
      tag: ["Academic", "Ceremony"],
      imageUrl: "/images/graduation-2024.jpg" // Image for a completed event
    },
    {
      id: 5,
      title: "Annual Sports Day 2024", // Example of another completed event with an image
      date: "November 5, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Academi Sports Complex",
      description: "A day of competitive sports and fun activities for students and faculty.",
      status: "completed",
      tag: ["Sports", "Campus"],
      imageUrl: "/images/sports-day-2024.jpg" // Image for a completed event
    },
    {
      id: 6,
      title: "Annual Sports Day 2024", // Example of another completed event with an image
      date: "November 5, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Academi Sports Complex",
      description: "A day of competitive sports and fun activities for students and faculty.",
      status: "completed",
      tag: ["Sports", "Campus"],
      imageUrl: "/images/sports-day-2024.jpg" // Image for a completed event
    }
  ];

  // Separate events into upcoming and completed
  const upcomingEvents = events.filter(event => event.status === "upcoming");
  const completedEvents = events.filter(event => event.status === "completed");

  const EventCard = ({ event }: { event: Event }) => {
    const isCompleted = event.status === "completed";
    const statusText = isCompleted ? "Completed Event" : "Upcoming Event";
    const statusIcon = isCompleted ? <CheckCircle size={16} className="mr-1" /> : <Calendar size={16} className="mr-1" />;
    const statusBgColor = isCompleted ? 'bg-gray-200 text-gray-700' : 'bg-teal-600 text-white';

    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col pb-6`}> {/* Added relative and increased padding-bottom */}

        {/* Fixed Status Indicator at the very top */}
        <div className={`absolute top-0 left-0 right-0 py-2 px-4 rounded-t-lg text-center text-sm font-medium ${statusBgColor} z-10`}>
          <span className="flex items-center justify-center">
            {statusIcon}
            {statusText}
          </span>
        </div>

        {/* Optional Image (moved down to account for the fixed status bar) */}
        {event.imageUrl && (
          <div className="relative w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64 mt-10"> {/* Added mt-10 to push image down */}
            <Image
              src={event.imageUrl}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        )}

        {/* Event Content - Adjusted padding-top */}
        <div className={`p-6 flex-grow flex flex-col justify-between ${!event.imageUrl ? 'pt-14' : ''}`}> {/* Added pt-14 if no image to account for fixed status bar */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>

          {/* Details with Icons */}
          <div className="text-gray-600 text-sm space-y-1 mb-4">
            <p className="flex items-center"><Calendar size={14} className="mr-2 text-gray-500" /> {event.date}</p>
            <p className="flex items-center"><Clock size={14} className="mr-2 text-gray-500" /> {event.time}</p>
            <p className="flex items-center"><MapPin size={14} className="mr-2 text-gray-500" /> {event.location}</p>
          </div>

          <p className="text-gray-700 text-base mb-4 flex-grow">{event.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {event.tag.map((t, i) => (
              <span key={i} className="flex items-center text-xs font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                <Tag size={12} className="mr-1" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Academi - Events</title>
        <meta name="description" content="Discover upcoming and past events and activities at Academi." />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">Academi <span className="text-teal-600">Events</span></h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Stay updated on all the exciting events, workshops, and seminars happening at Academi!
          </p>

          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
         
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Events Section */}
          {completedEvents.length > 0 && (
            <div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <p className="text-center text-lg text-gray-600">No events to display at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;