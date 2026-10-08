/**
 * Result<T, E> — Typed error handling for server actions and route handlers.
 * Never throw raw errors to the UI; always return a Result.
 */

export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

export function err<E = string>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Wraps an async operation in a Result, catching any thrown errors.
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  fallbackError = "An unexpected error occurred"
): Promise<Result<T, string>> {
  try {
    const data = await fn();
    return ok(data);
  } catch (error) {
    if (error instanceof Error) {
      return err(error.message);
    }
    return err(fallbackError);
  }
}
