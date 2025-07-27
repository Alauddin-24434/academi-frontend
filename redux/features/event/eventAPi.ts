// redux/features/event/eventApi.ts
import baseApi from '@/redux/api/baseApi';

export enum EventStatus {
    UPCOMING = "UPCOMING",
    CANCELLED="CANCELLED",
    COMPLETED = "COMPLETED",
}

export interface IEvent {
    id: string;
    name: string;
    description: string;
    date: string;         // ISO datetime string
    images: string[];     // array of image URLs or empty
    status: EventStatus; // optional, default PENDING
    createdAt?: string;
    updatedAt?: string;
}

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<IEvent[], void>({
            query: () => '/events',
            providesTags: ['Event'],
        }),

        createEvent: build.mutation<IEvent, Omit<IEvent, 'id' | 'images' | 'createdAt' | 'updatedAt'>>({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,  // send JSON body, no images on create
            }),
            invalidatesTags: ['Event'],
        }),

        updateEventImages: build.mutation<
            IEvent,
            { id: string; images: File[] }>({
                query: ({ id, images }) => {
                    const formData = new FormData();
                    images.forEach((file) => formData.append('images', file));
                    return {
                        url: `/events/${id}/images`,
                        method: 'PUT',
                        body: formData,
                    };
                },
                invalidatesTags: ['Event'],
            }),
    }),
});

export const {
    useGetEventsQuery,
    useCreateEventMutation,
    useUpdateEventImagesMutation,
} = eventApi;

export default eventApi;
