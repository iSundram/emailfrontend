import React from 'react';
import { Modal } from '../ui';
import { useUIStore } from '../../stores';

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['G', 'I'], description: 'Go to Inbox' },
    { keys: ['G', 'S'], description: 'Go to Starred' },
    { keys: ['G', 'T'], description: 'Go to Sent' },
    { keys: ['G', 'D'], description: 'Go to Drafts' },
  ]},
  { category: 'Actions', items: [
    { keys: ['C'], description: 'Compose new email' },
    { keys: ['R'], description: 'Reply' },
    { keys: ['A'], description: 'Reply all' },
    { keys: ['F'], description: 'Forward' },
  ]},
  { category: 'Message Actions', items: [
    { keys: ['E'], description: 'Archive' },
    { keys: ['#'], description: 'Delete' },
    { keys: ['S'], description: 'Star/Unstar' },
    { keys: ['Shift', 'U'], description: 'Mark as unread' },
  ]},
  { category: 'Selection', items: [
    { keys: ['X'], description: 'Select conversation' },
    { keys: ['Shift', 'X'], description: 'Select all' },
    { keys: ['Esc'], description: 'Deselect all' },
  ]},
  { category: 'Application', items: [
    { keys: ['Ctrl/Cmd', 'K'], description: 'Open command palette' },
    { keys: ['Ctrl/Cmd', 'Enter'], description: 'Send email' },
    { keys: ['Shift', 'Esc'], description: 'Focus search' },
    { keys: ['?'], description: 'Show keyboard shortcuts' },
  ]},
];

export function ShortcutsHelp() {
  const { isShortcutsHelpOpen, closeShortcutsHelp } = useUIStore();
  
  return (
    <Modal
      isOpen={isShortcutsHelpOpen}
      onClose={closeShortcutsHelp}
      title="Keyboard Shortcuts"
      size="lg"
    >
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-semibold text-whymail-500 uppercase tracking-wider mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-whymail-700">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-mono bg-whymail-100 text-whymail-700 rounded border border-whymail-200">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-whymail-400 text-xs">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-whymail-200">
          <p className="text-sm text-whymail-500">
            All shortcuts can be customized in Settings. Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-whymail-100 rounded">Esc</kbd> to close.
          </p>
        </div>
      </div>
    </Modal>
  );
}
