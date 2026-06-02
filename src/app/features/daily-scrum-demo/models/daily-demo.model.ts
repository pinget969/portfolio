export type DailyTab = 'daily' | 'historial';
export type DailyView = 'setup' | 'active' | 'summary';

export interface IceProject {
  id: number;
  pkey: string;
  name: string;
}

export interface IceUser {
  id: number;
  nombre: string;
  projects: { pkey: string; sprintId: number }[];
}

export interface Task {
  name: string;
  projectKey?: string;
  state: 0 | 1 | 2;
  blocked?: boolean;
  doneDate?: string | null;
  inProgressDate?: string | null;
  responsible?: { id: number };
  parentStory?: { id?: number; name: string };
}

export interface DemoStory {
  code: string;
  name: string;
  effort: number;
  progress: number;
  status: 'Completado' | 'En progreso' | 'Pendiente';
}

export interface Participant {
  id: string;
  name: string;
  iceScrumUserId?: number;
  isLate: boolean;
  isDelayed: boolean;
  excludeFromRotation: boolean;
  isParkingLot?: boolean;
}

export interface SpeakerResult {
  name: string;
  time: number;
  pauseTime: number;
  isLate: boolean;
  isDelayed: boolean;
  skipped: boolean;
  isParkingLot: boolean;
}

export interface MockHistorySession {
  id: string;
  date: number;
  globalTimer: number;
  participantsCount: number;
  pauseCount: number;
  totalPauseSeconds: number;
  delaySeconds: number;
  projectKeys: string[];
  results: SpeakerResult[];
}

export interface ResultClassification {
  emoji: string;
  text: string;
}
