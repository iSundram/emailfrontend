import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MessageList } from '../email/MessageList';
import { MessageView } from '../email/MessageView';
import { ComposeModal } from '../compose/ComposeModal';
import { CommandPalette } from '../search/CommandPalette';
import { SettingsPanel } from '../settings/SettingsPanel';
import { ShortcutsHelp } from './ShortcutsHelp';
import { useUIStore } from '../../stores';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export function MainLayout() {
  const {
    previewPaneOpen,
    isComposeOpen,
    isCommandPaletteOpen,
    isSettingsOpen,
    isShortcutsHelpOpen,
  } = useUIStore();
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();
  
  return (
    <div className="h-screen flex flex-col bg-whymail-lightest overflow-hidden">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main
          id="main-content"
          className="flex-1 flex overflow-hidden"
          role="main"
        >
          {/* Message List */}
          <div
            className={`
              ${previewPaneOpen ? 'w-96' : 'flex-1'}
              flex flex-col bg-white border-r border-whymail-200
              overflow-hidden
            `}
          >
            <MessageList />
          </div>
          
          {/* Message View / Preview Pane */}
          {previewPaneOpen && (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              <MessageView />
            </div>
          )}
        </main>
      </div>
      
      {/* Modals */}
      {isComposeOpen && <ComposeModal />}
      {isCommandPaletteOpen && <CommandPalette />}
      {isSettingsOpen && <SettingsPanel />}
      {isShortcutsHelpOpen && <ShortcutsHelp />}
    </div>
  );
}
