export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'owner' | 'user';
  enabled: boolean;
  quota: number;
  usedStorage: number;
  createdAt: string;
}

export interface Account {
  id: string;
  email: string;
  name: string;
  provider: EmailProvider;
  isConnected: boolean;
  isSyncing: boolean;
  lastSyncAt?: string;
  settings: AccountSettings;
}

export type EmailProvider = 
  | 'gmail' 
  | 'outlook' 
  | 'yahoo' 
  | 'zoho' 
  | 'protonmail' 
  | 'fastmail'
  | 'imap';

export interface AccountSettings {
  syncFrequency: number; // minutes
  offlineMode: 'headers' | 'headers-body' | 'full';
  cacheSize: number; // MB
  signature?: string;
  defaultReplyTo?: string;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  deviceName: string;
  ipAddress: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  icon?: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType = 
  | 'new_email'
  | 'email_sent'
  | 'email_failed'
  | 'email_retry'
  | 'quota_warning'
  | 'system_alert';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  density: 'comfortable' | 'compact';
  layout: 'three-pane' | 'split' | 'single';
  previewPane: 'right' | 'bottom' | 'off';
  fontSize: 'small' | 'medium' | 'large';
  keyboardShortcuts: boolean;
  notificationSounds: boolean;
  desktopNotifications: boolean;
  language: string;
  timezone: string;
}
