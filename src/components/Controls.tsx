// src/components/Controls.tsx

import React from 'react';

interface ControlsProps {
  onSimulate: (days: number) => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onSimulate, isLoading }) => {
  return (
    <div className="controls">
      <h2>🔬 Simulation Controls</h2>
      <div className="button-group">
        <button 
          onClick={() => onSimulate(3)}
          disabled={isLoading}
        >
          📅 Simulate 3-Day Absence
        </button>
        <button 
          onClick={() => onSimulate(7)}
          disabled={isLoading}
        >
          📅 Simulate 1-Week Absence
        </button>
        <button 
          onClick={() => onSimulate(14)}
          disabled={isLoading}
        >
          📅 Simulate 2-Week Absence
        </button>
      </div>
    </div>
  );
};
