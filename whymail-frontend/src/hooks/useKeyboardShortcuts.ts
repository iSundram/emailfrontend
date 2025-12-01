import { useEffect, useCallback, useRef } from 'react';
import { useUIStore, useEmailStore } from '../stores';

export function useKeyboardShortcuts() {
  const { 
    preferences,
    openCompose, 
    openCommandPalette,
    closeCommandPalette,
    isCommandPaletteOpen,
    openShortcutsHelp,
    closeShortcutsHelp,
    isShortcutsHelpOpen,
    isComposeOpen,
    isSettingsOpen,
  } = useUIStore();
  
  const { 
    selectedEmail, 
    setCurrentFolder,
    markAsUnread,
    toggleStar,
    deleteEmails,
  } = useEmailStore();
  
  const keySequence = useRef<string[]>([]);
  const sequenceTimeout = useRef<number | null>(null);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Skip if shortcuts are disabled
    if (!preferences.keyboardShortcuts) return;
    
    // Skip if typing in an input field
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }
    
    // Skip if modal is open (except for escape)
    if ((isComposeOpen || isSettingsOpen) && event.key !== 'Escape') {
      return;
    }
    
    const key = event.key;
    const isMeta = event.metaKey || event.ctrlKey;
    
    // Command palette - Ctrl/Cmd + K
    if (isMeta && key === 'k') {
      event.preventDefault();
      if (isCommandPaletteOpen) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }
    
    // Close command palette with Escape
    if (key === 'Escape') {
      if (isCommandPaletteOpen) {
        closeCommandPalette();
        return;
      }
      if (isShortcutsHelpOpen) {
        closeShortcutsHelp();
        return;
      }
    }
    
    // Show shortcuts help
    if (key === '?') {
      event.preventDefault();
      openShortcutsHelp();
      return;
    }
    
    // Handle key sequences (like G then I for inbox)
    if (sequenceTimeout.current) {
      clearTimeout(sequenceTimeout.current);
    }
    
    keySequence.current.push(key.toLowerCase());
    
    // Check for sequence matches
    const sequence = keySequence.current.join('');
    
    // Go to Inbox
    if (sequence === 'gi') {
      setCurrentFolder('inbox');
      keySequence.current = [];
      return;
    }
    
    // Go to Starred
    if (sequence === 'gs') {
      setCurrentFolder('starred');
      keySequence.current = [];
      return;
    }
    
    // Go to Sent
    if (sequence === 'gt') {
      setCurrentFolder('sent');
      keySequence.current = [];
      return;
    }
    
    // Go to Drafts
    if (sequence === 'gd') {
      setCurrentFolder('drafts');
      keySequence.current = [];
      return;
    }
    
    // Reset sequence after timeout
    sequenceTimeout.current = window.setTimeout(() => {
      keySequence.current = [];
    }, 1000);
    
    // Single key shortcuts (only if not in a sequence)
    if (keySequence.current.length === 1) {
      // Compose
      if (key === 'c') {
        event.preventDefault();
        openCompose();
        keySequence.current = [];
        return;
      }
      
      // Star
      if (key === 's' && selectedEmail) {
        event.preventDefault();
        toggleStar([selectedEmail.id]);
        keySequence.current = [];
        return;
      }
      
      // Archive (e)
      if (key === 'e' && selectedEmail) {
        // Archive action
        keySequence.current = [];
        return;
      }
      
      // Delete (#)
      if (key === '#' && selectedEmail) {
        event.preventDefault();
        deleteEmails([selectedEmail.id]);
        keySequence.current = [];
        return;
      }
      
      // Reply (r)
      if (key === 'r' && selectedEmail) {
        event.preventDefault();
        openCompose({
          to: selectedEmail.from.email,
          cc: '',
          bcc: '',
          subject: `Re: ${selectedEmail.subject}`,
          body: '',
          attachmentIds: [],
          replyToId: selectedEmail.id,
          isReply: true,
        });
        keySequence.current = [];
        return;
      }
      
      // Reply all (a)
      if (key === 'a' && selectedEmail) {
        event.preventDefault();
        const recipients = [
          selectedEmail.from.email,
          ...(selectedEmail.cc?.map(c => c.email) || []),
        ].join(', ');
        
        openCompose({
          to: recipients,
          cc: '',
          bcc: '',
          subject: `Re: ${selectedEmail.subject}`,
          body: '',
          attachmentIds: [],
          replyToId: selectedEmail.id,
          isReply: true,
        });
        keySequence.current = [];
        return;
      }
      
      // Forward (f)
      if (key === 'f' && selectedEmail) {
        event.preventDefault();
        openCompose({
          to: '',
          cc: '',
          bcc: '',
          subject: `Fwd: ${selectedEmail.subject}`,
          body: '',
          attachmentIds: [],
          isForward: true,
        });
        keySequence.current = [];
        return;
      }
    }
    
    // Mark as unread (Shift + U)
    if (event.shiftKey && key === 'U' && selectedEmail) {
      event.preventDefault();
      markAsUnread([selectedEmail.id]);
      keySequence.current = [];
      return;
    }
  }, [
    preferences.keyboardShortcuts,
    isComposeOpen,
    isSettingsOpen,
    isCommandPaletteOpen,
    isShortcutsHelpOpen,
    selectedEmail,
    openCompose,
    openCommandPalette,
    closeCommandPalette,
    openShortcutsHelp,
    closeShortcutsHelp,
    setCurrentFolder,
    markAsUnread,
    toggleStar,
    deleteEmails,
  ]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (sequenceTimeout.current) {
        clearTimeout(sequenceTimeout.current);
      }
    };
  }, [handleKeyDown]);
}
