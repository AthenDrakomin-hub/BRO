
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, height = 'h-2.5' }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} dark:bg-gray-700`}>
      <div
        className="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${safePercentage}%` }}
      >
      </div>
    </div>
  );
};

export default ProgressBar;
