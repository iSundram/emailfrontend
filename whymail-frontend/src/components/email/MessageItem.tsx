import { Star, Paperclip } from 'lucide-react';
import type { Email } from '../../types';
import { Avatar, Checkbox, Tag } from '../ui';
import { formatEmailDate, formatEmailAddress, truncateText } from '../../utils';

interface MessageItemProps {
  email: Email;
  isSelected: boolean;
  isActive: boolean;
  onSelect: () => void;
  onToggleSelect: (checked: boolean) => void;
  onToggleStar: () => void;
}

export function MessageItem({
  email,
  isSelected,
  isActive,
  onSelect,
  onToggleSelect,
  onToggleStar,
}: MessageItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer
        border-b border-whymail-100 transition-colors
        ${isActive ? 'bg-whymail-100' : 'hover:bg-whymail-50'}
        ${!email.isRead ? 'bg-whymail-50/50' : ''}
      `}
      role="row"
      aria-selected={isActive}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Checkbox */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-shrink-0 pt-0.5"
      >
        <Checkbox
          checked={isSelected}
          onChange={onToggleSelect}
        />
      </div>
      
      {/* Star */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStar();
        }}
        className={`
          flex-shrink-0 pt-0.5 focus:outline-none
          ${email.isStarred ? 'text-yellow-500' : 'text-whymail-300 hover:text-whymail-400'}
        `}
        aria-label={email.isStarred ? 'Unstar' : 'Star'}
      >
        <Star
          className="w-4 h-4"
          fill={email.isStarred ? 'currentColor' : 'none'}
        />
      </button>
      
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar
          name={email.from.name}
          email={email.from.email}
          size="md"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`
              text-sm truncate
              ${!email.isRead ? 'font-semibold text-whymail-dark' : 'text-whymail-700'}
            `}
          >
            {formatEmailAddress(email.from)}
          </span>
          <span className="text-xs text-whymail-500 flex-shrink-0">
            {formatEmailDate(email.date)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`
              text-sm truncate
              ${!email.isRead ? 'font-medium text-whymail-dark' : 'text-whymail-600'}
            `}
          >
            {email.subject || '(no subject)'}
          </span>
          {email.hasAttachments && (
            <Paperclip className="w-3.5 h-3.5 text-whymail-400 flex-shrink-0" />
          )}
        </div>
        
        <p className="text-sm text-whymail-500 truncate mt-0.5">
          {truncateText(email.snippet, 80)}
        </p>
        
        {/* Labels */}
        {email.labels.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            {email.labels.slice(0, 3).map((label) => (
              <Tag key={label.id} color={label.color}>
                {label.name}
              </Tag>
            ))}
            {email.labels.length > 3 && (
              <span className="text-xs text-whymail-400">
                +{email.labels.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
