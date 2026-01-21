import React from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface ProgressBarProps {
  total: number;
  completed: number;
  lang: Language;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed, lang }) => {
  const percentage = Math.round((completed / total) * 100);
  const t = UI_TEXT[lang];

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.progress}</span>
        <span className="text-sm font-medium text-togaf-600 dark:text-togaf-400">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div 
          className="bg-togaf-600 dark:bg-togaf-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-slate-400 dark:text-slate-500 text-right">
        {completed} / {total} {t.daysCompleted}
      </div>
    </div>
  );
};

export default ProgressBar;