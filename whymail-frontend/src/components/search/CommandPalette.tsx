import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Inbox,
  Mail,
  Send,
  FileText,
  Archive,
  Trash2,
  Star,
  Settings,
  PenSquare,
  Tag,
  Clock,
  User,
} from 'lucide-react';
import { useUIStore, useEmailStore } from '../../stores';

interface Command {
  id: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  shortcut?: string[];
  action: () => void;
}

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, openCompose, openSettings } = useUIStore();
  const { setCurrentFolder } = useEmailStore();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commands: Command[] = [
    {
      id: 'compose',
      icon: <PenSquare className="w-4 h-4" />,
      label: 'Compose new email',
      shortcut: ['C'],
      action: () => {
        closeCommandPalette();
        openCompose();
      },
    },
    {
      id: 'inbox',
      icon: <Inbox className="w-4 h-4" />,
      label: 'Go to Inbox',
      shortcut: ['G', 'I'],
      action: () => {
        closeCommandPalette();
        setCurrentFolder('inbox');
      },
    },
    {
      id: 'starred',
      icon: <Star className="w-4 h-4" />,
      label: 'Go to Starred',
      shortcut: ['G', 'S'],
      action: () => {
        closeCommandPalette();
        setCurrentFolder('starred');
      },
    },
    {
      id: 'sent',
      icon: <Send className="w-4 h-4" />,
      label: 'Go to Sent',
      shortcut: ['G', 'T'],
      action: () => {
        closeCommandPalette();
        setCurrentFolder('sent');
      },
    },
    {
      id: 'drafts',
      icon: <FileText className="w-4 h-4" />,
      label: 'Go to Drafts',
      shortcut: ['G', 'D'],
      action: () => {
        closeCommandPalette();
        setCurrentFolder('drafts');
      },
    },
    {
      id: 'archive',
      icon: <Archive className="w-4 h-4" />,
      label: 'Go to Archive',
      action: () => {
        closeCommandPalette();
        setCurrentFolder('archive');
      },
    },
    {
      id: 'trash',
      icon: <Trash2 className="w-4 h-4" />,
      label: 'Go to Trash',
      action: () => {
        closeCommandPalette();
        setCurrentFolder('trash');
      },
    },
    {
      id: 'settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Open Settings',
      action: () => {
        closeCommandPalette();
        openSettings();
      },
    },
  ];
  
  const searchCommands: Command[] = [
    {
      id: 'search-unread',
      icon: <Mail className="w-4 h-4" />,
      label: 'Search: Unread emails',
      description: 'is:unread',
      action: () => closeCommandPalette(),
    },
    {
      id: 'search-attachments',
      icon: <Tag className="w-4 h-4" />,
      label: 'Search: Has attachments',
      description: 'has:attachment',
      action: () => closeCommandPalette(),
    },
    {
      id: 'search-recent',
      icon: <Clock className="w-4 h-4" />,
      label: 'Search: Last 7 days',
      description: 'newer_than:7d',
      action: () => closeCommandPalette(),
    },
    {
      id: 'search-from',
      icon: <User className="w-4 h-4" />,
      label: 'Search: From...',
      description: 'from:',
      action: () => closeCommandPalette(),
    },
  ];
  
  const filteredCommands = query
    ? [...commands, ...searchCommands].filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;
  
  useEffect(() => {
    if (isCommandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandPaletteOpen]);
  
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };
  
  if (!isCommandPaletteOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={closeCommandPalette}
    >
      <div
        className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-whymail-200">
          <Search className="w-5 h-5 text-whymail-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 text-lg text-whymail-dark outline-none placeholder:text-whymail-400"
          />
          <button
            onClick={closeCommandPalette}
            className="p-1 rounded hover:bg-whymail-100 text-whymail-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Commands list */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-whymail-500">
              No results found
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-left transition-colors
                  ${index === selectedIndex
                    ? 'bg-whymail-100 text-whymail-primary'
                    : 'text-whymail-700 hover:bg-whymail-50'
                  }
                `}
              >
                <span className="flex-shrink-0">{cmd.icon}</span>
                <span className="flex-1">{cmd.label}</span>
                {cmd.description && (
                  <span className="text-sm text-whymail-400 font-mono">
                    {cmd.description}
                  </span>
                )}
                {cmd.shortcut && (
                  <span className="flex items-center gap-1">
                    {cmd.shortcut.map((key, i) => (
                      <kbd
                        key={i}
                        className="px-1.5 py-0.5 text-xs font-mono bg-whymail-200 text-whymail-600 rounded"
                      >
                        {key}
                      </kbd>
                    ))}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-whymail-200 bg-whymail-50 text-xs text-whymail-500">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="px-1 py-0.5 font-mono bg-whymail-200 rounded">Enter</kbd> to select
            </span>
            <span>
              <kbd className="px-1 py-0.5 font-mono bg-whymail-200 rounded">Esc</kbd> to close
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 font-mono bg-whymail-200 rounded">Ctrl</kbd>+
            <kbd className="px-1 py-0.5 font-mono bg-whymail-200 rounded">K</kbd> to toggle
          </span>
        </div>
      </div>
    </div>
  );
}
