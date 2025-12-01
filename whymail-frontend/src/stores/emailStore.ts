import { create } from 'zustand';
import type { Email, Folder, Label, Thread, Draft, EmailFilter } from '../types';

interface EmailState {
  // Data
  emails: Email[];
  selectedEmail: Email | null;
  selectedThread: Thread | null;
  folders: Folder[];
  labels: Label[];
  drafts: Draft[];
  
  // UI State
  currentFolder: string;
  filter: EmailFilter;
  selectedIds: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setEmails: (emails: Email[]) => void;
  addEmail: (email: Email) => void;
  updateEmail: (id: string, updates: Partial<Email>) => void;
  deleteEmail: (id: string) => void;
  setSelectedEmail: (email: Email | null) => void;
  setSelectedThread: (thread: Thread | null) => void;
  setFolders: (folders: Folder[]) => void;
  setLabels: (labels: Label[]) => void;
  setCurrentFolder: (folder: string) => void;
  setFilter: (filter: EmailFilter) => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelectedId: (id: string) => void;
  clearSelection: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Bulk actions
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  toggleStar: (ids: string[]) => void;
  moveToFolder: (ids: string[], folder: string) => void;
  applyLabel: (ids: string[], labelId: string) => void;
  removeLabel: (ids: string[], labelId: string) => void;
  deleteEmails: (ids: string[]) => void;
}

export const useEmailStore = create<EmailState>((set, get) => ({
  emails: [],
  selectedEmail: null,
  selectedThread: null,
  folders: [],
  labels: [],
  drafts: [],
  currentFolder: 'inbox',
  filter: {},
  selectedIds: [],
  isLoading: false,
  error: null,
  
  setEmails: (emails) => set({ emails }),
  addEmail: (email) => set((state) => ({ emails: [email, ...state.emails] })),
  updateEmail: (id, updates) => set((state) => ({
    emails: state.emails.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    selectedEmail: state.selectedEmail?.id === id 
      ? { ...state.selectedEmail, ...updates } 
      : state.selectedEmail,
  })),
  deleteEmail: (id) => set((state) => ({
    emails: state.emails.filter((e) => e.id !== id),
    selectedEmail: state.selectedEmail?.id === id ? null : state.selectedEmail,
    selectedIds: state.selectedIds.filter((i) => i !== id),
  })),
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  setSelectedThread: (thread) => set({ selectedThread: thread }),
  setFolders: (folders) => set({ folders }),
  setLabels: (labels) => set({ labels }),
  setCurrentFolder: (folder) => set({ currentFolder: folder, selectedEmail: null, selectedIds: [] }),
  setFilter: (filter) => set({ filter }),
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  toggleSelectedId: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter((i) => i !== id)
      : [...state.selectedIds, id],
  })),
  clearSelection: () => set({ selectedIds: [] }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  markAsRead: (ids) => set((state) => ({
    emails: state.emails.map((e) => 
      ids.includes(e.id) ? { ...e, isRead: true } : e
    ),
  })),
  markAsUnread: (ids) => set((state) => ({
    emails: state.emails.map((e) => 
      ids.includes(e.id) ? { ...e, isRead: false } : e
    ),
  })),
  toggleStar: (ids) => set((state) => ({
    emails: state.emails.map((e) => 
      ids.includes(e.id) ? { ...e, isStarred: !e.isStarred } : e
    ),
  })),
  moveToFolder: (ids, folderId) => {
    const { folders } = get();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      set((state) => ({
        emails: state.emails.map((e) => 
          ids.includes(e.id) ? { ...e, folder } : e
        ),
      }));
    }
  },
  applyLabel: (ids, labelId) => {
    const { labels } = get();
    const label = labels.find(l => l.id === labelId);
    if (label) {
      set((state) => ({
        emails: state.emails.map((e) => 
          ids.includes(e.id) && !e.labels.find(l => l.id === labelId)
            ? { ...e, labels: [...e.labels, label] }
            : e
        ),
      }));
    }
  },
  removeLabel: (ids, labelId) => set((state) => ({
    emails: state.emails.map((e) => 
      ids.includes(e.id)
        ? { ...e, labels: e.labels.filter(l => l.id !== labelId) }
        : e
    ),
  })),
  deleteEmails: (ids) => set((state) => ({
    emails: state.emails.filter((e) => !ids.includes(e.id)),
    selectedEmail: state.selectedEmail && ids.includes(state.selectedEmail.id) 
      ? null 
      : state.selectedEmail,
    selectedIds: state.selectedIds.filter((i) => !ids.includes(i)),
  })),
}));
