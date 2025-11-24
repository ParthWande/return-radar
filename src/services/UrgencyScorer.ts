// src/services/UrgencyScorer.ts

import { Project, Todo, UrgencyFeatures } from '../types';

export class UrgencyScorer {
  /**
   * Extract features from project for ML model
   */
  extractFeatures(
    project: Project,
    daysSinceLogin: number,
    currentDate: Date
  ): UrgencyFeatures {
    const daysDormant = this.getDaysDifference(project.lastActivity, currentDate);
    
    const overdueTodos = project.todos.filter(
      (t) => !t.completed && t.dueDate < currentDate
    ).length;
    
    const upcomingDeadlines = this.getUpcomingDeadlines(
      project.todos,
      currentDate,
      7
    );
    
    const highPriorityCount = project.todos.filter(
      (t) => !t.completed && t.priority === 'high'
    ).length;
    
    return {
      daysDormant,
      overdueTodos,
      upcomingDeadlines: upcomingDeadlines.length,
      highPriorityCount,
      externalMentions: project.externalMentions.length,
      totalTodos: project.todos.length,
      completionRate: this.calculateCompletionRate(project.todos),
      daysSinceLogin,
    };
  }

  /**
   * Calculate urgency score (0-1 scale)
   * MVP: Rule-based scoring
   * TODO: Replace with ML model (XGBoost/LightGBM)
   */
  calculateUrgencyScore(
    project: Project,
    daysSinceLogin: number,
    currentDate: Date
  ): number {
    const features = this.extractFeatures(project, daysSinceLogin, currentDate);
    
    // Weighted feature combination
    let score = 0;
    
    score += Math.min(features.daysDormant / 10, 0.4); // Max 0.4
    score += Math.min(features.overdueTodos * 0.15, 0.3); // Max 0.3
    score += Math.min(features.upcomingDeadlines * 0.1, 0.2); // Max 0.2
    score += features.externalMentions > 0 ? 0.1 : 0;
    score += Math.min(features.highPriorityCount * 0.05, 0.1); // Max 0.1
    
    return Math.min(score, 1);
  }

  /**
   * ML Prediction Hook (Production)
   * Replace calculateUrgencyScore with this when ML API is ready
   */
  async predictUrgencyML(features: UrgencyFeatures): Promise<number> {
    // TODO: Implement ML API call
    // const response = await fetch('/api/ml/predict-urgency', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ features }),
    // });
    // const data = await response.json();
    // return data.urgencyScore;
    
    throw new Error('ML model not implemented yet');
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    return Math.floor(
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  private getUpcomingDeadlines(
    todos: Todo[],
    currentDate: Date,
    daysAhead: number
  ): Todo[] {
    return todos.filter((t) => {
      const daysUntilDue = this.getDaysDifference(currentDate, t.dueDate);
      return !t.completed && daysUntilDue >= 0 && daysUntilDue <= daysAhead;
    });
  }

  private calculateCompletionRate(todos: Todo[]): number {
    if (todos.length === 0) return 0;
    return todos.filter((t) => t.completed).length / todos.length;
  }
}