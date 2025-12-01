import React from 'react';
import {
  Archive,
  Trash2,
  Mail,
  MailOpen,
  Tag,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { useEmailStore, useUIStore } from '../../stores';
import { MessageItem } from './MessageItem';
import { Checkbox, Dropdown, DropdownItem, DropdownDivider, Tooltip } from '../ui';
import type { Email } from '../../types';

// Sample data for demonstration
const sampleEmails: Email[] = [
  {
    id: '1',
    messageId: 'msg-1',
    from: { name: 'Alice Johnson', email: 'alice@company.com' },
    to: [{ email: 'you@example.com' }],
    subject: 'Q4 Project Update - Action Required',
    snippet: 'Hi team, I wanted to share the latest updates on our Q4 project. Please review the attached documents and provide your feedback by Friday...',
    date: new Date().toISOString(),
    receivedAt: new Date().toISOString(),
    isRead: false,
    isStarred: true,
    isPinned: false,
    hasAttachments: true,
    labels: [{ id: 'work', name: 'Work', color: '#2E5E99' }],
    folder: { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 0, totalCount: 0 },
  },
  {
    id: '2',
    messageId: 'msg-2',
    from: { name: 'Marketing Team', email: 'marketing@newsletter.com' },
    to: [{ email: 'you@example.com' }],
    subject: 'Weekly Newsletter - Industry Insights',
    snippet: 'This week in tech: New developments in AI, cloud computing trends, and more insights from industry leaders...',
    date: new Date(Date.now() - 3600000).toISOString(),
    receivedAt: new Date(Date.now() - 3600000).toISOString(),
    isRead: true,
    isStarred: false,
    isPinned: false,
    hasAttachments: false,
    labels: [{ id: 'newsletters', name: 'Newsletters', color: '#f59e0b' }],
    folder: { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 0, totalCount: 0 },
  },
  {
    id: '3',
    messageId: 'msg-3',
    from: { name: 'Bob Smith', email: 'bob.smith@partner.org' },
    to: [{ email: 'you@example.com' }],
    subject: 'Meeting Tomorrow at 2 PM',
    snippet: 'Hi, just a reminder about our meeting tomorrow. I have prepared the presentation slides and would like to go through them with you...',
    date: new Date(Date.now() - 7200000).toISOString(),
    receivedAt: new Date(Date.now() - 7200000).toISOString(),
    isRead: false,
    isStarred: false,
    isPinned: false,
    hasAttachments: true,
    labels: [{ id: 'important', name: 'Important', color: '#ef4444' }],
    folder: { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 0, totalCount: 0 },
  },
  {
    id: '4',
    messageId: 'msg-4',
    from: { name: 'GitHub', email: 'notifications@github.com' },
    to: [{ email: 'you@example.com' }],
    subject: '[repo/project] New pull request: Feature implementation',
    snippet: 'A new pull request has been opened by developer. Review the changes and provide feedback. The PR includes 15 commits with 342 additions...',
    date: new Date(Date.now() - 86400000).toISOString(),
    receivedAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    isStarred: false,
    isPinned: false,
    hasAttachments: false,
    labels: [{ id: 'work', name: 'Work', color: '#2E5E99' }],
    folder: { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 0, totalCount: 0 },
  },
  {
    id: '5',
    messageId: 'msg-5',
    from: { name: 'Sarah Wilson', email: 'sarah@personal.com' },
    to: [{ email: 'you@example.com' }],
    subject: 'Weekend Plans',
    snippet: 'Hey! Are you free this weekend? We are planning a small gathering at our place and would love for you to join us...',
    date: new Date(Date.now() - 172800000).toISOString(),
    receivedAt: new Date(Date.now() - 172800000).toISOString(),
    isRead: true,
    isStarred: true,
    isPinned: false,
    hasAttachments: false,
    labels: [{ id: 'personal', name: 'Personal', color: '#22c55e' }],
    folder: { id: 'inbox', name: 'Inbox', type: 'inbox', unreadCount: 0, totalCount: 0 },
  },
];

export function MessageList() {
  const {
    emails,
    selectedEmail,
    selectedIds,
    currentFolder,
    setSelectedEmail,
    setSelectedIds,
    clearSelection,
    markAsRead,
    markAsUnread,
    toggleStar,
    deleteEmails,
    setEmails,
  } = useEmailStore();
  
  useUIStore();
  
  // Initialize with sample data if empty
  React.useEffect(() => {
    if (emails.length === 0) {
      setEmails(sampleEmails);
    }
  }, [emails.length, setEmails]);
  
  const displayEmails = emails.length > 0 ? emails : sampleEmails;
  
  const allSelected = displayEmails.length > 0 && selectedIds.length === displayEmails.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < displayEmails.length;
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(displayEmails.map((e) => e.id));
    } else {
      clearSelection();
    }
  };
  
  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markAsRead([email.id]);
    }
  };
  
  const getFolderTitle = (folder: string) => {
    const titles: Record<string, string> = {
      inbox: 'Inbox',
      starred: 'Starred',
      sent: 'Sent',
      drafts: 'Drafts',
      archive: 'Archive',
      trash: 'Trash',
    };
    return titles[folder] || folder;
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-whymail-200 bg-white">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleSelectAll}
          />
          
          {selectedIds.length > 0 ? (
            <>
              <span className="text-sm text-whymail-600 ml-2">
                {selectedIds.length} selected
              </span>
              
              <div className="h-4 w-px bg-whymail-200 mx-2" />
              
              <Tooltip content="Archive">
                <button
                  onClick={() => {}}
                  className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100"
                >
                  <Archive className="w-4 h-4" />
                </button>
              </Tooltip>
              
              <Tooltip content="Delete">
                <button
                  onClick={() => deleteEmails(selectedIds)}
                  className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Tooltip>
              
              <Tooltip content="Mark as read">
                <button
                  onClick={() => markAsRead(selectedIds)}
                  className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100"
                >
                  <MailOpen className="w-4 h-4" />
                </button>
              </Tooltip>
              
              <Tooltip content="Mark as unread">
                <button
                  onClick={() => markAsUnread(selectedIds)}
                  className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </Tooltip>
              
              <Dropdown
                trigger={
                  <button className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100">
                    <Tag className="w-4 h-4" />
                  </button>
                }
              >
                <DropdownItem>Work</DropdownItem>
                <DropdownItem>Personal</DropdownItem>
                <DropdownItem>Important</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Create new label</DropdownItem>
              </Dropdown>
              
              <Dropdown
                trigger={
                  <button className="p-1.5 rounded text-whymail-600 hover:bg-whymail-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                }
              >
                <DropdownItem>Move to</DropdownItem>
                <DropdownItem>Snooze</DropdownItem>
                <DropdownItem>Mark as spam</DropdownItem>
              </Dropdown>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-whymail-dark ml-2">
                {getFolderTitle(currentFolder)}
              </h1>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Dropdown
            trigger={
              <button className="flex items-center gap-1 px-2 py-1 text-sm text-whymail-600 hover:bg-whymail-100 rounded">
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">Sort</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            }
            align="right"
          >
            <DropdownItem>Date (newest)</DropdownItem>
            <DropdownItem>Date (oldest)</DropdownItem>
            <DropdownItem>Sender</DropdownItem>
            <DropdownItem>Subject</DropdownItem>
            <DropdownItem>Size</DropdownItem>
          </Dropdown>
          
          <Dropdown
            trigger={
              <button className="flex items-center gap-1 px-2 py-1 text-sm text-whymail-600 hover:bg-whymail-100 rounded">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            }
            align="right"
          >
            <DropdownItem>Unread</DropdownItem>
            <DropdownItem>Starred</DropdownItem>
            <DropdownItem>With attachments</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Clear filters</DropdownItem>
          </Dropdown>
        </div>
      </div>
      
      {/* Message List */}
      <div className="flex-1 overflow-y-auto" role="listbox" aria-label="Email messages">
        {displayEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-whymail-500">
            <Mail className="w-12 h-12 mb-4 text-whymail-300" />
            <p className="text-lg font-medium">No messages</p>
            <p className="text-sm">Your inbox is empty</p>
          </div>
        ) : (
          displayEmails.map((email) => (
            <MessageItem
              key={email.id}
              email={email}
              isSelected={selectedIds.includes(email.id)}
              isActive={selectedEmail?.id === email.id}
              onSelect={() => handleEmailClick(email)}
              onToggleSelect={(checked) => {
                if (checked) {
                  setSelectedIds([...selectedIds, email.id]);
                } else {
                  setSelectedIds(selectedIds.filter((id) => id !== email.id));
                }
              }}
              onToggleStar={() => toggleStar([email.id])}
            />
          ))
        )}
      </div>
      
      {/* Status bar */}
      <div className="px-4 py-2 border-t border-whymail-200 bg-white">
        <p className="text-xs text-whymail-500">
          {displayEmails.length} {displayEmails.length === 1 ? 'message' : 'messages'}
          {selectedIds.length > 0 && ` | ${selectedIds.length} selected`}
        </p>
      </div>
    </div>
  );
}
