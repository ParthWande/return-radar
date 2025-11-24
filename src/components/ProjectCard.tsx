// src/components/ProjectCard.tsx

import React from 'react';
import { DormantProject } from '../types';

interface ProjectCardProps {
  project: DormantProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getUrgencyLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 0.7) return 'high';
    if (score >= 0.5) return 'medium';
    return 'low';
  };

  const urgencyLevel = getUrgencyLevel(project.urgencyScore);
  const urgencyText = urgencyLevel.toUpperCase();

  return (
    <div className="project-card">
      <div className="project-header">
        <div>
          <div className="project-title">{project.name}</div>
          <div className="project-meta">
            <span>📅 Last activity: {project.daysDormant} days ago</span>
            <span>🎯 Urgency: {Math.round(project.urgencyScore * 100)}%</span>
          </div>
        </div>
        <div className={`urgency-badge urgency-${urgencyLevel}`}>
          {urgencyText}
        </div>
      </div>

      <div className="context-summary">
        <h4>📊 Context Summary</h4>
        <div className="context-items">
          <div className="context-item">
            <strong>{project.context.overdueTodos}</strong> overdue tasks
          </div>
          <div className="context-item">
            <strong>{project.context.upcomingTodos}</strong> upcoming deadlines
          </div>
          <div className="context-item">
            <strong>{project.context.recentNotes}</strong> recent notes
          </div>
          <div className="context-item">
            <strong>{project.context.upcomingEvents}</strong> upcoming events
          </div>
        </div>
      </div>

      {project.externalMentions.length > 0 && (
        <div
          style={{
            marginBottom: '16px',
            padding: '12px',
            background: 'rgba(245, 158, 11, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <strong style={{ fontSize: '13px' }}>⚠️ External Signal:</strong>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
            }}
          >
            {project.externalMentions[0]}
          </p>
        </div>
      )}

      <div className="actions-section">
        <h4>💡 Suggested Actions</h4>
        <ul className="action-list">
          {project.suggestedActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
