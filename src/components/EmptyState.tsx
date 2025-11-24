// src/components/EmptyState.tsx

import React from 'react';

interface EmptyStateProps {
  daysSinceLogin: number;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ daysSinceLogin }) => {
  return (
    <div className="empty-state">
      <h3>✅ All caught up!</h3>
      <p>
        No urgent items detected after your {daysSinceLogin}-day absence.
      </p>
    </div>
  );
};
