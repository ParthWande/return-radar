export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  priority: Priority;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
}

export interface Project {
  id: string;
  name: string;
  lastActivity: Date;
  todos: Todo[];
  notes: Note[];
  events: CalendarEvent[];
  externalMentions: string[];
}

export interface ProjectContext {
  overdueTodos: number;
  upcomingTodos: number;
  recentNotes: number;
  upcomingEvents: number;
  externalMentions: number;
}

export interface DormantProject extends Project {
  urgencyScore: number;
  daysDormant: number;
  context: ProjectContext;
  suggestedActions: string[];
}

export interface UrgencyFeatures {
  daysDormant: number;
  overdueTodos: number;
  upcomingDeadlines: number;
  highPriorityCount: number;
  externalMentions: number;
  totalTodos: number;
  completionRate: number;
  daysSinceLogin: number;
}