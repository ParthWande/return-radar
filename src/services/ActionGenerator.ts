// src/services/ActionGenerator.ts

import { Project, ProjectContext } from '../types';

export class ActionGenerator {
  generateActions(
    project: Project,
    context: ProjectContext,
    currentDate: Date
  ): string[] {
    const actions: string[] = [];

    if (context.overdueTodos > 0) {
      actions.push(
        `Review ${context.overdueTodos} overdue task${
          context.overdueTodos > 1 ? 's' : ''
        }`
      );
    }

    if (context.upcomingTodos > 0) {
      actions.push(
        `Check ${context.upcomingTodos} upcoming deadline${
          context.upcomingTodos > 1 ? 's' : ''
        } this week`
      );
    }

    if (context.recentNotes > 0) {
      actions.push('Review recent notes for progress updates');
    }

    if (context.upcomingEvents > 0) {
      actions.push(
        `Prepare for ${context.upcomingEvents} upcoming meeting${
          context.upcomingEvents > 1 ? 's' : ''
        }`
      );
    }

    if (context.externalMentions > 0) {
      actions.push('Respond to external mentions in emails/calendar');
    }

    if (actions.length === 0) {
      actions.push('Review project status and plan next steps');
    }

    return actions;
  }
}
