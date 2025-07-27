import toast from "react-hot-toast";

// =============Generic higher-order function that takes an async function and returns a new async function=====================
export function catchAsync<T extends (...args: any[]) => Promise<any>>(asyncFn: T): (...args: Parameters<T>) => Promise<void> {
    return async (...args: Parameters<T>): Promise<void> => {
        try {
            await asyncFn(...args);
        } catch (error) {
            const err = error as any;

    
            toast.error(err?.data?.message || err?.message || "Something went wrong!");

            console.log("Error [catch]:", err);
        }
    };
}
