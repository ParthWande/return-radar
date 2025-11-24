// src/data/mockProjects.ts

import { Project } from '../types';

export function createMockProjects(): Project[] {
  const now = new Date();

  return [
    {
      id: 'project-1',
      name: 'Product Launch',
      lastActivity: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      todos: [
        {
          id: 'todo-1',
          title: 'Finalize landing page copy',
          completed: false,
          dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Overdue
          priority: 'high',
        },
        {
          id: 'todo-2',
          title: 'Review design mockups',
          completed: false,
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high',
        },
        {
          id: 'todo-3',
          title: 'Schedule beta user interviews',
          completed: true,
          dueDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          priority: 'medium',
        },
      ],
      notes: [
        {
          id: 'note-1',
          title: 'Design Review Feedback',
          content: 'Team suggested changes to color scheme',
          date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
      events: [
        {
          id: 'event-1',
          title: 'Beta Launch Planning',
          date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
        },
      ],
      externalMentions: ['Sarah Chen mentioned this in email yesterday'],
    },
    {
      id: 'project-2',
      name: 'Q1 Planning',
      lastActivity: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      todos: [
        {
          id: 'todo-4',
          title: 'Draft Q1 objectives',
          completed: false,
          dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          priority: 'high',
        },
        {
          id: 'todo-5',
          title: 'Review team capacity',
          completed: false,
          dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // Overdue
          priority: 'medium',
        },
      ],
      notes: [
        {
          id: 'note-2',
          title: 'Strategic Initiatives',
          content: 'Focus on customer retention',
          date: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
        },
      ],
      events: [],
      externalMentions: [],
    },
    {
      id: 'project-3',
      name: 'Mobile App Redesign',
      lastActivity: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      todos: [
        {
          id: 'todo-6',
          title: 'Create wireframes',
          completed: true,
          dueDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          priority: 'high',
        },
        {
          id: 'todo-7',
          title: 'User testing session',
          completed: false,
          dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
          priority: 'medium',
        },
      ],
      notes: [
        {
          id: 'note-3',
          title: 'User Feedback',
          content: 'Users want dark mode',
          date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        },
      ],
      events: [
        {
          id: 'event-2',
          title: 'Design Sprint',
          date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        },
      ],
      externalMentions: ['James mentioned in Slack thread'],
    },
  ];
}
