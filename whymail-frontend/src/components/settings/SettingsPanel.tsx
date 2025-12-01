import React, { useState } from 'react';
import {
  User,
  Palette,
  Keyboard,
  Bell,
  Shield,
  Mail,
  Tag,
  Filter,
  X,
} from 'lucide-react';
import { useUIStore } from '../../stores';
import { Modal, Button, Toggle } from '../ui';

type SettingsTab = 'general' | 'appearance' | 'notifications' | 'shortcuts' | 'accounts' | 'labels' | 'filters' | 'privacy';

export function SettingsPanel() {
  const { isSettingsOpen, closeSettings, preferences, setPreferences } = useUIStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  
  const tabs: Array<{ id: SettingsTab; label: string; icon: React.ReactNode }> = [
    { id: 'general', label: 'General', icon: <User className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'shortcuts', label: 'Shortcuts', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'accounts', label: 'Accounts', icon: <Mail className="w-4 h-4" /> },
    { id: 'labels', label: 'Labels', icon: <Tag className="w-4 h-4" /> },
    { id: 'filters', label: 'Filters & Rules', icon: <Filter className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-4 h-4" /> },
  ];
  
  return (
    <Modal
      isOpen={isSettingsOpen}
      onClose={closeSettings}
      size="xl"
      showCloseButton={false}
    >
      <div className="flex h-[70vh]">
        {/* Sidebar */}
        <div className="w-56 bg-whymail-50 border-r border-whymail-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-whymail-dark">Settings</h2>
            <button
              onClick={closeSettings}
              className="p-1 rounded hover:bg-whymail-200 text-whymail-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                  transition-colors
                  ${activeTab === tab.id
                    ? 'bg-whymail-primary text-white'
                    : 'text-whymail-700 hover:bg-whymail-100'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-whymail-dark">General Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Language</p>
                    <p className="text-sm text-whymail-500">Select your preferred language</p>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ language: e.target.value })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Timezone</p>
                    <p className="text-sm text-whymail-500">Set your local timezone</p>
                  </div>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ timezone: e.target.value })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Layout</p>
                    <p className="text-sm text-whymail-500">Choose your preferred layout</p>
                  </div>
                  <select
                    value={preferences.layout}
                    onChange={(e) => setPreferences({ layout: e.target.value as any })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="three-pane">Three pane (default)</option>
                    <option value="split">Split view</option>
                    <option value="single">Single column</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Density</p>
                    <p className="text-sm text-whymail-500">Adjust message list spacing</p>
                  </div>
                  <select
                    value={preferences.density}
                    onChange={(e) => setPreferences({ density: e.target.value as any })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-whymail-dark">Appearance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Theme</p>
                    <p className="text-sm text-whymail-500">Choose light or dark mode</p>
                  </div>
                  <select
                    value={preferences.theme}
                    onChange={(e) => setPreferences({ theme: e.target.value as any })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Font size</p>
                    <p className="text-sm text-whymail-500">Adjust text size</p>
                  </div>
                  <select
                    value={preferences.fontSize}
                    onChange={(e) => setPreferences({ fontSize: e.target.value as any })}
                    className="px-3 py-2 border border-whymail-200 rounded-lg text-sm"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                
                {/* Color swatches */}
                <div>
                  <p className="font-medium text-whymail-dark mb-2">Theme Colors</p>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-whymail-lightest border border-whymail-200" />
                      <p className="text-xs text-whymail-500 mt-1">#E7F0FA</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-whymail-light" />
                      <p className="text-xs text-whymail-500 mt-1">#7BA4D0</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-whymail-primary" />
                      <p className="text-xs text-whymail-500 mt-1">#2E5E99</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-whymail-dark" />
                      <p className="text-xs text-whymail-500 mt-1">#0D2440</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-whymail-dark">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Desktop notifications</p>
                    <p className="text-sm text-whymail-500">Show browser notifications for new emails</p>
                  </div>
                  <Toggle
                    enabled={preferences.desktopNotifications}
                    onChange={(enabled) => setPreferences({ desktopNotifications: enabled })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Notification sounds</p>
                    <p className="text-sm text-whymail-500">Play sounds for new emails</p>
                  </div>
                  <Toggle
                    enabled={preferences.notificationSounds}
                    onChange={(enabled) => setPreferences({ notificationSounds: enabled })}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'shortcuts' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-whymail-dark">Keyboard Shortcuts</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-whymail-dark">Enable keyboard shortcuts</p>
                  <p className="text-sm text-whymail-500">Use keyboard shortcuts to navigate</p>
                </div>
                <Toggle
                  enabled={preferences.keyboardShortcuts}
                  onChange={(enabled) => setPreferences({ keyboardShortcuts: enabled })}
                />
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-whymail-500">
                  Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-whymail-100 rounded">?</kbd> to view all available shortcuts
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-whymail-dark">Email Accounts</h3>
                <Button size="sm">Add Account</Button>
              </div>
              
              <div className="border border-whymail-200 rounded-lg divide-y divide-whymail-200">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-whymail-primary rounded-full flex items-center justify-center text-white font-medium">
                      J
                    </div>
                    <div>
                      <p className="font-medium text-whymail-dark">john@example.com</p>
                      <p className="text-sm text-whymail-500">Primary account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'labels' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-whymail-dark">Labels</h3>
                <Button size="sm">Create Label</Button>
              </div>
              
              <div className="border border-whymail-200 rounded-lg divide-y divide-whymail-200">
                {[
                  { name: 'Work', color: '#2E5E99' },
                  { name: 'Personal', color: '#22c55e' },
                  { name: 'Important', color: '#ef4444' },
                  { name: 'Newsletters', color: '#f59e0b' },
                ].map((label) => (
                  <div key={label.name} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4" style={{ color: label.color }} />
                      <span className="font-medium text-whymail-dark">{label.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'filters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-whymail-dark">Filters & Rules</h3>
                <Button size="sm">Create Rule</Button>
              </div>
              
              <div className="text-center py-12 text-whymail-500">
                <Filter className="w-12 h-12 mx-auto mb-4 text-whymail-300" />
                <p className="font-medium">No filters configured</p>
                <p className="text-sm mt-1">Create rules to automatically organize your emails</p>
              </div>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-whymail-dark">Privacy & Security</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Block remote images</p>
                    <p className="text-sm text-whymail-500">Prevent tracking pixels and remote images</p>
                  </div>
                  <Toggle enabled={true} onChange={() => {}} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-whymail-dark">Send read receipts</p>
                    <p className="text-sm text-whymail-500">Notify senders when you read their emails</p>
                  </div>
                  <Toggle enabled={false} onChange={() => {}} />
                </div>
                
                <div className="pt-4 border-t border-whymail-200">
                  <Button variant="outline">Export my data</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
