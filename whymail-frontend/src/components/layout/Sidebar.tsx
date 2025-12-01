import React from 'react';
import {
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  Star,
  Tag,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  PenSquare,
} from 'lucide-react';
import { useEmailStore, useUIStore } from '../../stores';
import type { Folder, Label } from '../../types';
import { Tooltip } from '../ui';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { folders, labels, currentFolder, setCurrentFolder } = useEmailStore();
  const { sidebarOpen, openCompose, openSettings } = useUIStore();
  
  const [labelsExpanded, setLabelsExpanded] = React.useState(true);
  
  // Default folders if none loaded
  const defaultFolders: Folder[] = [
    { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 12, totalCount: 156 },
    { id: 'starred', name: 'Starred', type: 'starred', unreadCount: 0, totalCount: 8 },
    { id: 'sent', name: 'Sent', type: 'sent', unreadCount: 0, totalCount: 89 },
    { id: 'drafts', name: 'Drafts', type: 'drafts', unreadCount: 2, totalCount: 3 },
    { id: 'archive', name: 'Archive', type: 'archive', unreadCount: 0, totalCount: 234 },
    { id: 'trash', name: 'Trash', type: 'trash', unreadCount: 0, totalCount: 12 },
  ];
  
  const defaultLabels: Label[] = [
    { id: 'work', name: 'Work', color: '#2E5E99' },
    { id: 'personal', name: 'Personal', color: '#22c55e' },
    { id: 'important', name: 'Important', color: '#ef4444' },
    { id: 'newsletters', name: 'Newsletters', color: '#f59e0b' },
  ];
  
  const displayFolders = folders.length > 0 ? folders : defaultFolders;
  const displayLabels = labels.length > 0 ? labels : defaultLabels;
  
  const getFolderIcon = (type: Folder['type']) => {
    const icons: Record<Folder['type'], React.ReactNode> = {
      inbox: <Inbox className="w-4 h-4" />,
      sent: <Send className="w-4 h-4" />,
      drafts: <FileText className="w-4 h-4" />,
      archive: <Archive className="w-4 h-4" />,
      trash: <Trash2 className="w-4 h-4" />,
      starred: <Star className="w-4 h-4" />,
      spam: <Trash2 className="w-4 h-4" />,
      custom: <Inbox className="w-4 h-4" />,
    };
    return icons[type];
  };
  
  if (!sidebarOpen) {
    return (
      <aside className={`w-16 bg-white border-r border-whymail-200 flex flex-col ${className}`}>
        <div className="p-2">
          <Tooltip content="Compose" position="right">
            <button
              onClick={() => openCompose()}
              className="w-full p-3 rounded-lg bg-whymail-primary text-white hover:bg-whymail-700 transition-colors"
              aria-label="Compose new email"
            >
              <PenSquare className="w-5 h-5 mx-auto" />
            </button>
          </Tooltip>
        </div>
        
        <nav className="flex-1 p-2 space-y-1">
          {displayFolders.map((folder) => (
            <Tooltip key={folder.id} content={folder.name} position="right">
              <button
                onClick={() => setCurrentFolder(folder.id)}
                className={`
                  w-full p-3 rounded-lg flex items-center justify-center
                  transition-colors relative
                  ${currentFolder === folder.id
                    ? 'bg-whymail-100 text-whymail-primary'
                    : 'text-whymail-600 hover:bg-whymail-50'
                  }
                `}
                aria-label={folder.name}
              >
                {getFolderIcon(folder.type)}
                {folder.unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-whymail-primary rounded-full" />
                )}
              </button>
            </Tooltip>
          ))}
        </nav>
        
        <div className="p-2 border-t border-whymail-200">
          <Tooltip content="Settings" position="right">
            <button
              onClick={() => openSettings()}
              className="w-full p-3 rounded-lg text-whymail-600 hover:bg-whymail-50 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 mx-auto" />
            </button>
          </Tooltip>
        </div>
      </aside>
    );
  }
  
  return (
    <aside className={`w-60 bg-white border-r border-whymail-200 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-4 border-b border-whymail-200">
        <img src="/logo.svg" alt="WhyMail" className="h-8" />
      </div>
      
      {/* Compose Button */}
      <div className="p-3">
        <button
          onClick={() => openCompose()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-whymail-primary text-white hover:bg-whymail-700 transition-colors font-medium"
        >
          <PenSquare className="w-4 h-4" />
          <span>Compose</span>
        </button>
      </div>
      
      {/* Folders */}
      <nav className="flex-1 overflow-y-auto px-2">
        <div className="space-y-0.5">
          {displayFolders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                text-sm transition-colors
                ${currentFolder === folder.id
                  ? 'bg-whymail-100 text-whymail-primary font-medium'
                  : 'text-whymail-700 hover:bg-whymail-50'
                }
              `}
            >
              <span className="flex-shrink-0">{getFolderIcon(folder.type)}</span>
              <span className="flex-1 text-left">{folder.name}</span>
              {folder.unreadCount > 0 && (
                <span className="text-xs font-medium bg-whymail-primary text-white px-1.5 py-0.5 rounded-full">
                  {folder.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Labels */}
        <div className="mt-6">
          <button
            onClick={() => setLabelsExpanded(!labelsExpanded)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-whymail-500 uppercase tracking-wider hover:text-whymail-700"
          >
            {labelsExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            Labels
          </button>
          
          {labelsExpanded && (
            <div className="space-y-0.5">
              {displayLabels.map((label) => (
                <button
                  key={label.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-whymail-700 hover:bg-whymail-50 transition-colors"
                >
                  <Tag className="w-4 h-4" style={{ color: label.color }} />
                  <span className="flex-1 text-left">{label.name}</span>
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-whymail-400 hover:bg-whymail-50 hover:text-whymail-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create label</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-2 border-t border-whymail-200">
        <button
          onClick={() => openSettings()}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-whymail-600 hover:bg-whymail-50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
