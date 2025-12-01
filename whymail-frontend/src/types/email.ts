export interface Email {
  id: string;
  messageId: string;
  threadId?: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  subject: string;
  snippet: string;
  bodyText?: string;
  bodyHtml?: string;
  date: string;
  receivedAt: string;
  isRead: boolean;
  isStarred: boolean;
  isPinned: boolean;
  hasAttachments: boolean;
  attachments?: Attachment[];
  labels: Label[];
  folder: Folder;
  priority?: 'low' | 'normal' | 'high';
  isEncrypted?: boolean;
  isSigned?: boolean;
}

export interface EmailAddress {
  name?: string;
  email: string;
}

export interface Attachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  downloadUrl?: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export type FolderType = 
  | 'inbox' 
  | 'sent' 
  | 'drafts' 
  | 'archive' 
  | 'trash' 
  | 'starred' 
  | 'spam'
  | 'custom';

export interface Folder {
  id: string;
  name: string;
  type: FolderType;
  icon?: string;
  unreadCount: number;
  totalCount: number;
  children?: Folder[];
}

export interface Thread {
  id: string;
  messages: Email[];
  subject: string;
  participants: EmailAddress[];
  latestDate: string;
  unreadCount: number;
}

export interface Draft {
  id: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface EmailFilter {
  folder?: string;
  label?: string;
  isUnread?: boolean;
  isStarred?: boolean;
  hasAttachment?: boolean;
  from?: string;
  to?: string;
  subject?: string;
  dateAfter?: string;
  dateBefore?: string;
  searchQuery?: string;
}

export interface EmailRule {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  matchAll: boolean;
  stopProcessing: boolean;
}

export interface RuleCondition {
  field: 'from' | 'to' | 'subject' | 'body' | 'hasAttachment' | 'size';
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'matches' | 'greaterThan' | 'lessThan';
  value: string;
}

export interface RuleAction {
  type: 'label' | 'move' | 'markRead' | 'star' | 'archive' | 'delete' | 'forward';
  value?: string;
}

export interface Signature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters?: EmailFilter;
  useCount: number;
  lastUsedAt?: string;
}
