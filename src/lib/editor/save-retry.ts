export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * Wraps an async function with exponential backoff retry logic.
 *
 * @param fn - The async function to retry
 * @param options - Retry configuration options
 * @returns Promise that resolves with the result or throws after max retries
 *
 * @example
 * ```ts
 * await withRetry(
 *   () => saveDocumentContent(data),
 *   {
 *     maxRetries: 3,
 *     initialDelay: 1000,
 *     maxDelay: 10000,
 *     onRetry: (attempt, error) => console.log(`Retry ${attempt}:`, error)
 *   }
 * )
 * ```
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    onRetry,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Calculate delay with exponential backoff and jitter
      const exponentialDelay = initialDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 500; // Random jitter 0-500ms
      const delay = Math.min(exponentialDelay + jitter, maxDelay);

      // Call onRetry callback if provided
      onRetry?.(attempt + 1, lastError);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}
