// src/components/WelcomeBanner.tsx

import React from 'react';

interface WelcomeBannerProps {
  daysSinceLogin: number;
  projectCount: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  daysSinceLogin,
  projectCount,
}) => {
  return (
    <div className="welcome-banner">
      <h2>
        🔔 Welcome back! You've been away for {daysSinceLogin} day
        {daysSinceLogin > 1 ? 's' : ''}.
      </h2>
      <p>
        {projectCount} project{projectCount > 1 ? 's need' : ' needs'} your
        attention.
      </p>
    </div>
  );
};
