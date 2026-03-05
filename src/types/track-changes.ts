/**
 * Track Changes Types for LaTeX Editor
 * Implements suggestion mode with inline diff visualization
 */

export interface TrackChange {
  id: string;
  type: "insert" | "delete" | "replace";
  from: number;
  to: number;
  insertedText?: string;
  deletedText?: string;
  author: {
    id: string;
    name: string;
    color: string;
  };
  timestamp: number;
  status: "pending" | "accepted" | "rejected";
}

export interface TrackChangeAuthor {
  id: string;
  name: string;
  color: string;
}

export interface DiffResult {
  changes: TrackChange[];
  newContent: string;
}
