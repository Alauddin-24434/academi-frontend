import toast from "react-hot-toast";
import { IApiError } from "@/types/errorType";

// =============Generic higher-order function that takes an async function and returns a new async function=====================
export function catchAsync<T extends (...args: any[]) => Promise<any>>(asyncFn: T): (...args: Parameters<T>) => Promise<void> {
    // Return a new async function that wraps the original async function with error handling
    return async (...args: Parameters<T>): Promise<void> => {
        try {
            // Call the original async function with its arguments and wait for it to finish
            await asyncFn(...args);
        } catch (error) {

            const err = error as IApiError;

            console.log("Error [catch]", err)



        }
    };
}
