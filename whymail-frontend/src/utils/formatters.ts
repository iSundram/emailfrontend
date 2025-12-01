import { format, formatDistanceToNow, parseISO, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';

export function formatEmailDate(dateString: string): string {
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return format(date, 'h:mm a');
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  if (isThisWeek(date)) {
    return format(date, 'EEEE');
  }
  
  if (isThisYear(date)) {
    return format(date, 'MMM d');
  }
  
  return format(date, 'MMM d, yyyy');
}

export function formatFullDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "MMMM d, yyyy 'at' h:mm a");
}

export function formatRelativeDate(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatEmailAddress(email: { name?: string; email: string }): string {
  if (email.name) {
    return email.name;
  }
  return email.email;
}

export function formatEmailAddressFull(email: { name?: string; email: string }): string {
  if (email.name) {
    return `${email.name} <${email.email}>`;
  }
  return email.email;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
