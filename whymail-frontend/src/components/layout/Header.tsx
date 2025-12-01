import React from 'react';
import {
  Search,
  Menu,
  Bell,
  RefreshCw,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { useUIStore } from '../../stores';
import { Avatar, Dropdown, DropdownItem, DropdownDivider, Tooltip } from '../ui';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const {
    toggleSidebar,
    openSearch,
    openCommandPalette,
    openShortcutsHelp,
    notifications,
    unreadNotificationCount,
  } = useUIStore();
  
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      openSearch();
    }
  };
  
  return (
    <header
      className={`h-14 bg-white border-b border-whymail-200 flex items-center justify-between px-4 gap-4 ${className}`}
    >
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Tooltip content="Toggle sidebar">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-whymail-600 hover:bg-whymail-50 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <img src="/icon.svg" alt="" className="w-8 h-8 md:hidden" />
      </div>
      
      {/* Search bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-2xl"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-whymail-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mail (Ctrl+K)"
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-whymail-50 border border-transparent text-sm text-whymail-dark placeholder:text-whymail-400 focus:bg-white focus:border-whymail-300 focus:outline-none focus:ring-2 focus:ring-whymail-primary/20 transition-colors"
            onFocus={() => openCommandPalette()}
          />
        </div>
      </form>
      
      {/* Right section */}
      <div className="flex items-center gap-1">
        <Tooltip content="Refresh">
          <button
            className="p-2 rounded-lg text-whymail-600 hover:bg-whymail-50 transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Keyboard shortcuts">
          <button
            onClick={() => openShortcutsHelp()}
            className="p-2 rounded-lg text-whymail-600 hover:bg-whymail-50 transition-colors"
            aria-label="Keyboard shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </Tooltip>
        
        {/* Notifications */}
        <Dropdown
          trigger={
            <button
              className="p-2 rounded-lg text-whymail-600 hover:bg-whymail-50 transition-colors relative"
              aria-label={`Notifications${unreadNotificationCount > 0 ? ` (${unreadNotificationCount} unread)` : ''}`}
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                </span>
              )}
            </button>
          }
          align="right"
        >
          <div className="w-80">
            <div className="px-4 py-3 border-b border-whymail-100">
              <h3 className="font-semibold text-whymail-dark">Notifications</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-whymail-400 text-sm">
                No notifications
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-whymail-50 cursor-pointer ${
                      !notification.isRead ? 'bg-whymail-50/50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-whymail-dark">
                      {notification.title}
                    </p>
                    <p className="text-xs text-whymail-500 mt-0.5">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Dropdown>
        
        {/* User menu */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-whymail-50 transition-colors">
              <Avatar
                name="John Doe"
                email="john@example.com"
                size="sm"
              />
              <ChevronDown className="w-4 h-4 text-whymail-400 hidden sm:block" />
            </button>
          }
          align="right"
        >
          <div className="px-4 py-3 border-b border-whymail-100">
            <p className="font-medium text-whymail-dark">John Doe</p>
            <p className="text-sm text-whymail-500">john@example.com</p>
          </div>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Account settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Help & Support</DropdownItem>
          <DropdownItem danger>Sign out</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
