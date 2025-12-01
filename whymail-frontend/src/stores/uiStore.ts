import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPreferences, Notification } from '../types';

interface UIState {
  // Layout
  sidebarOpen: boolean;
  sidebarWidth: number;
  previewPaneOpen: boolean;
  previewPaneWidth: number;
  
  // Modals
  isComposeOpen: boolean;
  isSearchOpen: boolean;
  isSettingsOpen: boolean;
  isCommandPaletteOpen: boolean;
  isShortcutsHelpOpen: boolean;
  
  // Compose
  composeData: {
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
    attachmentIds: string[];
    replyToId?: string;
    isReply?: boolean;
    isForward?: boolean;
  } | null;
  
  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  
  // Preferences
  preferences: UserPreferences;
  
  // Toast messages
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  togglePreviewPane: () => void;
  setPreviewPaneWidth: (width: number) => void;
  
  openCompose: (data?: UIState['composeData']) => void;
  closeCompose: () => void;
  setComposeData: (data: Partial<NonNullable<UIState['composeData']>>) => void;
  
  openSearch: () => void;
  closeSearch: () => void;
  
  openSettings: () => void;
  closeSettings: () => void;
  
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  
  openShortcutsHelp: () => void;
  closeShortcutsHelp: () => void;
  
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  
  addToast: (toast: Omit<UIState['toasts'][0], 'id'>) => void;
  removeToast: (id: string) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  density: 'comfortable',
  layout: 'three-pane',
  previewPane: 'right',
  fontSize: 'medium',
  keyboardShortcuts: true,
  notificationSounds: true,
  desktopNotifications: false,
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const defaultComposeData = {
  to: '',
  cc: '',
  bcc: '',
  subject: '',
  body: '',
  attachmentIds: [],
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarWidth: 240,
      previewPaneOpen: true,
      previewPaneWidth: 400,
      
      isComposeOpen: false,
      isSearchOpen: false,
      isSettingsOpen: false,
      isCommandPaletteOpen: false,
      isShortcutsHelpOpen: false,
      
      composeData: null,
      
      notifications: [],
      unreadNotificationCount: 0,
      
      preferences: defaultPreferences,
      
      toasts: [],
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      togglePreviewPane: () => set((state) => ({ previewPaneOpen: !state.previewPaneOpen })),
      setPreviewPaneWidth: (width) => set({ previewPaneWidth: width }),
      
      openCompose: (data) => set({ 
        isComposeOpen: true, 
        composeData: data || { ...defaultComposeData },
      }),
      closeCompose: () => set({ isComposeOpen: false, composeData: null }),
      setComposeData: (data) => set((state) => ({
        composeData: state.composeData 
          ? { ...state.composeData, ...data }
          : { ...defaultComposeData, ...data },
      })),
      
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      
      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),
      
      openCommandPalette: () => set({ isCommandPaletteOpen: true }),
      closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
      
      openShortcutsHelp: () => set({ isShortcutsHelpOpen: true }),
      closeShortcutsHelp: () => set({ isShortcutsHelpOpen: false }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadNotificationCount: state.unreadNotificationCount + 1,
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1),
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadNotificationCount: 0,
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
      
      setPreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs },
      })),
      
      addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
      })),
      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),
    }),
    {
      name: 'whymail-ui-storage',
      partialize: (state) => ({
        sidebarWidth: state.sidebarWidth,
        previewPaneWidth: state.previewPaneWidth,
        preferences: state.preferences,
      }),
    }
  )
);
