import React from 'react';
import { Link } from '@/packages/i18n';

const Logo = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-1">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          className="fill-primary"
        />

        <path
          d="M6 6L18 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 6L6 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="12" cy="12" r="2.5" fill="#F59E0B" />
      </svg>

      <div className="text-2xl font-bold font-display">
        <span className="text-primary">Next</span>
        <span>Client</span>
      </div>
    </Link>
  );
};

export default Logo;
