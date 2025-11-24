// src/services/DormancyDetector.ts

import { Project, DormantProject } from '../types';
import { UrgencyScorer } from './UrgencyScorer';
import { ContextBuilder } from './ContextBuilder';
import { ActionGenerator } from './ActionGenerator';

export class DormancyDetector {
  private urgencyScorer: UrgencyScorer;
  private contextBuilder: ContextBuilder;
  private actionGenerator: ActionGenerator;

  constructor() {
    this.urgencyScorer = new UrgencyScorer();
    this.contextBuilder = new ContextBuilder();
    this.actionGenerator = new ActionGenerator();
  }

  detectDormantProjects(
    projects: Project[],
    lastLoginDate: Date,
    currentDate: Date
  ): DormantProject[] {
    const daysSinceLogin = this.getDaysDifference(lastLoginDate, currentDate);

    // Skip if user was only away briefly
    if (daysSinceLogin < 2) return [];

    return projects
      .map((project) =>
        this.analyzeDormancy(project, daysSinceLogin, currentDate)
      )
      .filter((p) => p.urgencyScore > 0.3) // Threshold for showing
      .sort((a, b) => b.urgencyScore - a.urgencyScore);
  }

  private analyzeDormancy(
    project: Project,
    daysSinceLogin: number,
    currentDate: Date
  ): DormantProject {
    const urgencyScore = this.urgencyScorer.calculateUrgencyScore(
      project,
      daysSinceLogin,
      currentDate
    );

    const context = this.contextBuilder.buildContext(project, currentDate);

    const suggestedActions = this.actionGenerator.generateActions(
      project,
      context,
      currentDate
    );

    const daysDormant = this.getDaysDifference(
      project.lastActivity,
      currentDate
    );

    return {
      ...project,
      urgencyScore,
      daysDormant,
      context,
      suggestedActions,
    };
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    return Math.floor(
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
