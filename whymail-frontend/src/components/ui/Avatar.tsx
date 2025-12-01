import { getInitials } from '../../utils';

interface AvatarProps {
  name?: string;
  email: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({
  name,
  email,
  src,
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizeStyles = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };
  
  const initials = getInitials(name || email.split('@')[0]);
  
  // Generate a consistent color based on email
  const colorHash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
  ];
  const bgColor = colors[colorHash % colors.length];
  
  if (src) {
    return (
      <img
        src={src}
        alt={name || email}
        className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
      />
    );
  }
  
  return (
    <div
      className={`
        ${sizeStyles[size]} ${bgColor}
        rounded-full flex items-center justify-center
        text-white font-medium
        ${className}
      `}
      aria-label={name || email}
    >
      {initials}
    </div>
  );
}
