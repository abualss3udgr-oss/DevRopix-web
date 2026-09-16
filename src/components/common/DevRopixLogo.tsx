import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  isLight?: boolean;
}

export const DevRopixLogo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  isLight = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Visual Icon based on modern geometric "D" monogram */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-[#36366F] shadow-sm shadow-indigo-500/20 text-white ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main "D" glyph architecture */}
          <path
            d="M11 9H21C26.5228 9 31 13.4772 31 19C31 24.5228 26.5228 29 21 29H11V9Z"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner digital software core */}
          <path
            d="M17 15H21C23.2091 15 25 16.7909 25 19C25 21.2091 23.2091 23 21 23H17V15Z"
            fill="currentColor"
          />
          {/* Cyan precision accent dot */}
          <circle cx="28" cy="11" r="2.5" fill="#38BDF8" />
        </svg>
      </div>

      {showWordmark && (
        <span className={`${textSizes[size]} font-extrabold tracking-tight transition-colors ${
          isLight ? 'text-white' : 'text-slate-900'
        }`}>
          Dev<span className="text-indigo-600">Ropix</span>
        </span>
      )}
    </div>
  );
};
