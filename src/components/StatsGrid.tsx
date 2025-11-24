// src/components/StatsGrid.tsx

import React from 'react';

interface StatsGridProps {
  daysSinceLogin: number;
  dormantProjectsCount: number;
  urgentItems: number;
  mlConfidence: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  daysSinceLogin,
  dormantProjectsCount,
  urgentItems,
  mlConfidence,
}) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Days Since Login</div>
        <div className="stat-value">{daysSinceLogin}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Dormant Projects</div>
        <div className="stat-value">{dormantProjectsCount}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Urgent Items</div>
        <div className="stat-value">{urgentItems}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">ML Confidence</div>
        <div className="stat-value">{mlConfidence}%</div>
      </div>
    </div>
  );
};
