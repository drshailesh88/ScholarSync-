/**
 * Offline save queue for ScholarSync editor.
 *
 * Queues saves when offline and replays them when connection returns.
 * Only the latest save for each document is kept in the queue.
 */

export interface QueuedSave {
  id: string;
  documentId: number;
  title: string;
  editor_content: unknown;
  plain_text_content: string;
  word_count: number;
  sectionId: number;
  timestamp: number;
}

const STORAGE_KEY = "scholarsync_save_queue";

/**
 * Get the current queue from localStorage.
 */
function getStoredQueue(): QueuedSave[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse offline save queue:", error);
  }
  return [];
}

/**
 * Save the queue to localStorage.
 */
function setStoredQueue(queue: QueuedSave[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error("Failed to save offline queue to localStorage:", error);
  }
}

/**
 * Enqueue a save operation.
 * Replaces any existing save for the same document (only latest matters).
 */
export function enqueueSave(
  data: Omit<QueuedSave, "id" | "timestamp">
): void {
  const queue = getStoredQueue();

  // Remove any existing save for this document
  const filtered = queue.filter((item) => item.documentId !== data.documentId);

  // Add the new save at the end
  const newSave: QueuedSave = {
    ...data,
    id: `${data.documentId}-${Date.now()}`,
    timestamp: Date.now(),
  };

  filtered.push(newSave);
  setStoredQueue(filtered);
}

/**
 * Get all queued saves.
 */
export function getQueue(): QueuedSave[] {
  return getStoredQueue();
}

/**
 * Clear the entire queue.
 */
export function clearQueue(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Remove a specific save from the queue by ID.
 */
export function removeFromQueue(saveId: string): void {
  const queue = getStoredQueue();
  const filtered = queue.filter((item) => item.id !== saveId);
  setStoredQueue(filtered);
}

/**
 * Process all queued saves.
 *
 * Sorts by timestamp (oldest first), processes in order, removes successful items,
 * leaves failed ones in the queue for retry.
 *
 * @param saveFn - Function to save a single document to the server
 * @returns Object with counts of processed and failed saves
 */
export async function processQueue(
  saveFn: (data: Omit<QueuedSave, "id" | "timestamp">) => Promise<unknown>
): Promise<{ processed: number; failed: number }> {
  const queue = getStoredQueue();

  if (queue.length === 0) {
    return { processed: 0, failed: 0 };
  }

  // Sort by timestamp (oldest first)
  const sorted = [...queue].sort((a, b) => a.timestamp - b.timestamp);

  let processed = 0;
  let failed = 0;

  for (const save of sorted) {
    try {
      await saveFn({
        documentId: save.documentId,
        title: save.title,
        editor_content: save.editor_content,
        plain_text_content: save.plain_text_content,
        word_count: save.word_count,
        sectionId: save.sectionId,
      });

      // Success - remove from queue
      removeFromQueue(save.id);
      processed++;
    } catch (error) {
      // Failure - leave in queue for next retry
      console.error(`Failed to process queued save ${save.id}:`, error);
      failed++;
    }
  }

  return { processed, failed };
}
