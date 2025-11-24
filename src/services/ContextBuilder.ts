// src/services/ContextBuilder.ts

import { Project, ProjectContext } from '../types';

export class ContextBuilder {
  buildContext(project: Project, currentDate: Date): ProjectContext {
    return {
      overdueTodos: project.todos.filter(
        (t) => !t.completed && t.dueDate < currentDate
      ).length,
      upcomingTodos: project.todos.filter((t) => {
        const daysUntil = this.getDaysDifference(currentDate, t.dueDate);
        return !t.completed && daysUntil >= 0 && daysUntil <= 7;
      }).length,
      recentNotes: project.notes.filter((n) => {
        const daysSince = this.getDaysDifference(n.date, currentDate);
        return daysSince <= 14;
      }).length,
      upcomingEvents: project.events.filter((e) => {
        const daysUntil = this.getDaysDifference(currentDate, e.date);
        return daysUntil >= 0 && daysUntil <= 7;
      }).length,
      externalMentions: project.externalMentions.length,
    };
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    return Math.floor(
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
