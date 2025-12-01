import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-whymail-100 text-whymail-600',
    primary: 'bg-whymail-primary text-white',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

interface TagProps {
  children: React.ReactNode;
  color?: string;
  onRemove?: () => void;
  className?: string;
}

export function Tag({
  children,
  color = '#7BA4D0',
  onRemove,
  className = '',
}: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded
        ${className}
      `}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {children}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 focus:outline-none"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3.707 3.293a1 1 0 00-1.414 1.414L4.586 7l-2.293 2.293a1 1 0 101.414 1.414L6 8.414l2.293 2.293a1 1 0 001.414-1.414L7.414 7l2.293-2.293a1 1 0 00-1.414-1.414L6 5.586 3.707 3.293z" />
          </svg>
        </button>
      )}
    </span>
  );
}
