
export type Language = 'en' | 'zh';

export enum LearningStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export interface User {
  username: string;
  name?: string;
  avatar?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  phase: string; // e.g., "Phase A: Core Concepts"
  keyConcepts: string[];
}

export interface FlashcardData {
  id: string;
  front: string; // Question or Concept
  back: string; // Answer or Definition
  tag: string; // Category tag
}

export interface UserProgress {
  completedDays: number[]; // Array of day numbers
  currentDay: number;
}

export interface GlossaryItem {
  id: string;
  termEn: string;
  termZh: string;
  defEn: string;
  defZh: string;
}
