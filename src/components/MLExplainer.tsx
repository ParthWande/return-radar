// src/components/MLExplainer.tsx

import React from 'react';

export const MLExplainer: React.FC = () => {
  return (
    <div className="ml-explainer">
      <h3>🧠 ML Integration Points</h3>
      <p>
        This prototype demonstrates how machine learning enhances urgency
        detection. The current implementation uses rule-based scoring, but
        includes hooks for:
      </p>
      <p style={{ marginTop: '8px' }}>
        <strong>1. XGBoost Urgency Predictor</strong> - Trained on task
        completion patterns to predict which dormant projects need immediate
        attention
      </p>
      <p>
        <strong>2. LLM Context Summarization</strong> - Fine-tuned model to
        generate "mental state snapshots" from notes and todos
      </p>
      <p>
        <strong>3. LSTM Anomaly Detection</strong> - Detects unusual absence
        patterns that might indicate disengagement
      </p>
    </div>
  );
};
