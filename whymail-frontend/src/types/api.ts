export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface SendEmailRequest {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  attachmentIds?: string[];
  scheduledAt?: string;
  replyToMessageId?: string;
}

export interface SearchRequest {
  query: string;
  folder?: string;
  from?: string;
  to?: string;
  dateAfter?: string;
  dateBefore?: string;
  hasAttachment?: boolean;
  isUnread?: boolean;
  page?: number;
  perPage?: number;
}

export interface WebSocketMessage {
  type: WebSocketEventType;
  payload: unknown;
}

export type WebSocketEventType = 
  | 'connected'
  | 'new_message'
  | 'message_updated'
  | 'message_deleted'
  | 'notification'
  | 'folder_count'
  | 'sync_status';
