import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className = '',
}: CheckboxProps) {
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  return (
    <label
      className={`
        inline-flex items-center gap-2 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="
          w-4 h-4 rounded border-whymail-300
          text-whymail-primary
          focus:ring-2 focus:ring-whymail-primary focus:ring-offset-0
          disabled:cursor-not-allowed
        "
      />
      {label && (
        <span className="text-sm text-whymail-dark">{label}</span>
      )}
    </label>
  );
}

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function Toggle({
  enabled,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleProps) {
  const sizeStyles = {
    sm: {
      toggle: 'w-8 h-4',
      dot: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      dot: 'w-5 h-5',
      translate: 'translate-x-5',
    },
  };
  
  const s = sizeStyles[size];
  
  return (
    <label
      className={`
        inline-flex items-center gap-2 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex shrink-0 ${s.toggle}
          rounded-full transition-colors duration-200 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-whymail-primary focus-visible:ring-offset-2
          ${enabled ? 'bg-whymail-primary' : 'bg-whymail-200'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${s.dot} rounded-full bg-white shadow
            transform transition-transform duration-200 ease-in-out
            ${enabled ? s.translate : 'translate-x-0.5'}
            mt-0.5
          `}
        />
      </button>
      {label && (
        <span className="text-sm text-whymail-dark">{label}</span>
      )}
    </label>
  );
}
