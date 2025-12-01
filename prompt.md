# WhyMail Frontend Specification

> Modern email client frontend for the WhyMail backend platform
> Built with React 18+ | TypeScript | Vite | Tailwind CSS

---

## 1 - High-level Principles

1. **User-first performance**: inbox loads <1s on typical broadband; UI interactions feel instantaneous; code-splitting and lazy loading for optimal bundle size.

2. **Privacy & control**: minimum server-side retention; local-first caching with IndexedDB; end-to-end encryption support (PGP/GPG) for power users.

3. **Predictable UX**: keyboard-centric with clear visual affordances; familiar three-pane layout while allowing custom layouts; command palette for quick navigation.

4. **Extensibility & interoperability**: plugin architecture, REST API integration, WebSocket for real-time updates, browser extensions.

5. **Accessibility & inclusivity**: full keyboard navigation, screen-reader support, WCAG 2.1 AA compliance, ARIA attributes, skip links.

6. **Security-first**: phishing protections, session/device management, strict CSP, XSS prevention, secure-by-default settings.

7. **No dark patterns**: transparent feature gating, clear opt-ins for telemetry, no behavioral ads.

---

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 5+
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Query for server state, Zustand for client state
- **Virtualization**: react-window for efficient list rendering
- **Offline**: Service Worker + IndexedDB for caching
- **WebSocket**: Real-time updates from backend
- **Icons**: Lucide React (no emojis)

---

## Color Theme

| Usage          | Hex Code  | Description       |
|----------------|-----------|-------------------|
| Background     | #E7F0FA   | Light blue-gray   |
| Secondary      | #7BA4D0   | Soft blue         |
| Primary        | #2E5E99   | Deep blue         |
| Dark/Accent    | #0D2440   | Navy blue         |

---

## Backend Integration

The frontend connects to the WhyMail Go backend which provides:

### REST API Endpoints (port 8080)
- **Authentication**: JWT-based sessions
- **Domains**: CRUD operations for email domains
- **Users**: User management with roles
- **Mailboxes**: List, read, manage mailboxes
- **Messages**: CRUD, search, filters, labels
- **Drafts**: Create, update, send drafts
- **Attachments**: Upload, download, delete
- **Rules**: Email filtering rules
- **Notifications**: In-app notifications
- **Search**: Full-text search with filters
- **Settings**: User and system configuration

### WebSocket Events (port 8080/ws)
- `new_message` - New email received
- `message_updated` - Message flags changed
- `notification` - New notification
- `folder_count` - Folder count updated

### Email Protocols
- SMTP: Ports 25, 587, 465 (handled by backend)
- IMAP: Ports 143, 993 (handled by backend)





## 2 - Protocols & Account Setup

### Supported Protocols
- **IMAP** (with IDLE for push notifications)
- **SMTP** (with STARTTLS / SMTPS)
- **OAuth 2.0** for Google, Microsoft (Exchange/Outlook), Yahoo

### Automatic Account Setup
- Detect provider from email address and prefill IMAP/SMTP settings
- Presets for Gmail, Outlook/Office365, Yahoo, Zoho, ProtonMail Bridge, Fastmail
- Manual advanced setup UI for custom domains

### Multiple Accounts & Identity Management
- Add unlimited accounts
- Unified Inbox view (combined) and account-specific inboxes
- Per-account identity (From address, signature, reply-to)
- Per-account sync preferences (frequency, offline cache size)




---

## 3 - User Interface & Experience

### Core Layout Options
- **Default 3-pane**: Sidebar (folders/labels) | Message List | Message Content
- **Split view** (two columns), **Single-column** (mobile-like), **Compact list** (dense)
- Floating compose window / full-screen compose
- Resizable panes with persistent layout per device

### Sidebar & Navigation
- Favorites, System folders (Inbox, Sent, Drafts, Archive, Trash, Starred)
- Smart folders (Unread, Has Attachments), Labels/Folders tree
- Quick Actions: compose, search, calendar, settings
- Filtered views: by account, label, date range, attachment presence

### Message List
- Dense / Comfortable list density settings
- Columns: sender, subject, snippet, labels, timestamp, size, attachment icon
- Multi-select actions (archive, delete, mark read/unread, apply label, move)
- Inline bulk actions toolbar on selection
- Sort by date, sender, subject, size, or custom
- Virtualized rendering for performance (react-window)

### Message View
- HTML rendering with strict sanitization (CSP + safe HTML renderer)
- Threaded conversation view with expand/collapse
- Inline attachments preview (images, PDFs) with download
- Action strip: Reply / Reply All / Forward / Archive / Move / Label / More
- Visual indicators for priority, encryption (PGP/GPG), signed messages, attachments

### Compose
- Rich text editor with formatting (bold, italic, lists), inline images, attachments via drag & drop
- Templates / canned responses users create themselves
- Multiple signatures per account; switchable during compose
- Scheduled send (send later, with timezone support)
- Spellcheck integration (browser native)
- Send confirmations for large attachments, missing recipients
- Attachment size warnings and cloud link suggestions

### Themes & Personalization
- Light/dark/AMOLED presets
- Custom theme builder: accent color, font family, compactness, background
- Accessibility theme: high contrast, large text
- Default colors: #E7F0FA (bg), #7BA4D0 (secondary), #2E5E99 (primary), #0D2440 (dark)

### Keyboard-first UX
- Global command palette (Ctrl/Cmd+K) - quick jump to labels, compose, search
- Full set of configurable keyboard shortcuts
- Modal command mode (optional) for power users




---

## 4 - Offline & Syncing

### Local Caching
- Selectable offline mode per account: headers-only, headers+body, full mail + attachments
- IndexedDB store on client with configurable retention
- Background sync when online: push using WebSocket or periodic sync

### Conflict Resolution
- Last-write-wins by default with conflict UI for edits on both client and server
- Draft autosave locally and cloud sync

### Offline Compose & Queue
- Compose offline, queue sends, retry automatically when connection resumes
- Clear UI for queued messages with retry/cancel options




---

## 5 - Search & Filtering

### Fast Indexed Search
- Local full-text index of headers and bodies (optional)
- Search syntax: `from:`, `to:`, `subject:`, `label:`, `has:attachment`, `before:`, `after:`, `is:unread`, `size:>10MB`
- Boolean operations, phrase search with quotes, date ranges

### Saved Searches & Filters
- User-defined saved searches (one-click access)
- Server-side and client-side filters
- Auto-apply labels on incoming mail (user-created rules)

### Advanced Filters
- Bulk actions from search results
- Filter test runner to preview matched messages




---

## 6 - Organization & Automation

### Labels & Folders
- Multi-label support, nested labels/folders
- Color-coded labels
- Apply/remove labels via drag & drop or quick actions

### Rules & Automations (user-defined)
- If/Then rule builder: conditions (from, subject contains, has attachment, size, recipient)
- Actions (label, move, mark read, forward, star, archive, delete)
- Schedule-based rules (e.g., archive messages older than 6 months)

### Snooze, Pin, and Follow-up
- Snooze messages to reappear at chosen time/date
- Pin important threads to top of inbox
- Manual follow-up reminders

### Smart Categories
- Rule-based grouping for receipts, newsletters, social updates
- User can edit group rules




---

## 7 - Collaboration & Team Features

### Shared Mailboxes
- Add team mailbox accounts
- Assignment mechanics: claim/unclaim messages, add internal notes, change status

### Internal Comments
- Add internal comments to threads (not sent to external recipients)
- Mentions: @username to notify other teammates

### Shared Labels & Rules
- Team-shared labels and rules (admin-configurable)
- Audit log of actions performed on shared mailbox items

### Delegation
- Delegate mailbox access with role-based permissions (read-only, respond-as, admin)




---

## 8 - Security & Privacy

### Authentication
- OAuth2 for provider accounts
- JWT-based session management
- Device/session management with remote logout
- Two-factor authentication (2FA) support

### Encryption
- Optional PGP/GPG integration for end-to-end encryption
- Key management UI (import/export keys, key trust model)
- Transport security: TLS for all connections

### Phishing & Malware Protections
- URL hover reveal and domain highlighting
- Display origin details and visual warnings for suspicious headers (SPF/DKIM/DMARC failures)
- Block remote image auto-loading by default

### Privacy & Telemetry
- Default: telemetry off
- GDPR/Data subject request support: export user data, delete account

### Audit & Logging
- Local audit trail for sensitive actions
- Admin logs for teams




---

## 9 - Integrations & Extensions

### Calendars & Contacts
- Calendar integration (Google Calendar, Microsoft Exchange/Outlook, CalDAV)
- Contacts: CardDAV support and provider sync
- In-email calendar insertion: create event from email

### Cloud Storage
- Attach from cloud (Google Drive, OneDrive, Dropbox)
- Save attachments to cloud with one click

### Third-party Connectors
- Slack, Microsoft Teams integration
- Zapier / Make integration via webhooks

### Plugins & Extensions
- Secure plugin API with permission manifest
- Plugins run isolated (sandboxed) in browser environment

### Developer API & Webhooks
- REST API integration with backend
- WebSocket subscriptions for real-time events




---

## 10 - Performance & Scaling

### Frontend Optimization
- Code-splitting, lazy loading components
- Minimal initial payload; static assets served via CDN
- Service Worker for offline assets and caching
- React Query for efficient data fetching and caching
- Virtualized lists (react-window) for 60fps scrolling

### Benchmarks
- Inbox hydrate (first 50 messages) under 1s on 50ms RTT, 20Mbps
- Scroll and list rendering at 60fps with virtualization




---

## 11 - Analytics & Instrumentation

### Privacy-first Analytics
- Only performance & crash telemetry by default (opt-in for usage analytics)
- Aggregate and anonymize: no PII in telemetry
- User UI to view and delete telemetry data

### Error Monitoring
- Client-side error capture with sourcemap-enabled debugging
- Performance monitoring for Core Web Vitals




---

## 12 - Migration Tools

### Import Assistants
- One-click import from Gmail: labels mapping, folder structure
- Standard IMAP migration wizard for full mailbox copy
- Export facility: export to MBOX or EMLs per folder

### Provider Limit Handling
- Throttling for large migrations with retry/backoff
- Resumable migrations with progress UI and logs




---

## 13 - Settings & Admin Controls

### User Settings
- Account-level: sync frequency, storage quotas, signatures, vacation autoresponder
- Global: theme, keyboard customizations, privacy toggles, notifications

### Team Admin
- Domain-level policies (shared labels, retention policies)
- User provisioning and management
- Audit logs and export

### Retention & Archival
- Per-account retention rules
- Exportable archived bundles for compliance




---

## 14 - Accessibility & Internationalization

### Accessibility (WCAG 2.1 AA)
- Keyboard navigation for all UI flows
- ARIA attributes on controls; skip links and semantic HTML
- Screen reader compatibility (VoiceOver/JAWS)
- High contrast and large text themes

### Internationalization
- Multi-language UI; right-to-left support
- Localized date/time handling and timezones
- Unicode normalization for headers and subjects




---

## 15 - Testing Strategy

### Automated Testing
- Unit tests for UI components (Vitest + React Testing Library)
- Integration tests for API operations
- End-to-end tests with Playwright
- Accessibility automated checks (axe-core)

### Manual QA
- Cross-provider scenarios (Gmail, Exchange, IMAP custom)
- Offline and conflict resolution edge cases


---

## 16 - Keyboard Shortcuts (Default)

| Shortcut        | Action           |
|-----------------|------------------|
| G then I        | Go to Inbox      |
| C               | Compose          |
| R               | Reply            |
| A               | Reply all        |
| F               | Forward          |
| E               | Archive          |
| #               | Delete           |
| S               | Star             |
| Shift+U         | Mark unread      |
| Cmd/Ctrl+K      | Command palette  |
| Cmd/Ctrl+Enter  | Send             |
| Shift+Esc       | Focus search     |
| ?               | Show shortcuts   |

All shortcuts are configurable in Settings.

---

## 17 - UI Copy Guidelines

- Be explicit: "Permanently delete?" instead of "Are you sure?"
- Show contextual help with tooltips
- Error messaging: avoid raw stack traces; provide actionable steps

---

## 18 - Component Library

### Core Components
- `Sidebar` - Folder/label navigation
- `MessageList` - Virtualized email list
- `MessageView` - Email content with thread
- `ComposeModal` - Rich text email composer
- `SearchBar` - Advanced search with filters
- `CommandPalette` - Quick navigation (Cmd+K)
- `NotificationCenter` - In-app notifications
- `SettingsPanel` - User preferences

### UI Primitives
- `Button`, `Input`, `Select`, `Checkbox`, `Toggle`
- `Modal`, `Dropdown`, `Tooltip`, `Toast`
- `Avatar`, `Badge`, `Tag`, `Spinner`
- `Table`, `Tabs`, `Accordion`

---

## Assets

- **Logo**: https://raw.githubusercontent.com/iSundram/share/refs/heads/main/580cde50-45cd-4ce5-bd23-94217f19f504.svg
- **Icon**: https://raw.githubusercontent.com/iSundram/share/refs/heads/main/1c590f51-d076-4139-8aa4-cb4320567215.svg

---

## Project Structure

```
src/
  components/
    layout/
      Sidebar.tsx
      Header.tsx
      MainLayout.tsx
    email/
      MessageList.tsx
      MessageItem.tsx
      MessageView.tsx
      ThreadView.tsx
    compose/
      ComposeModal.tsx
      Editor.tsx
      AttachmentPicker.tsx
    search/
      SearchBar.tsx
      SearchFilters.tsx
      SavedSearches.tsx
    settings/
      SettingsPanel.tsx
      AccountSettings.tsx
      ThemeSettings.tsx
    ui/
      Button.tsx
      Input.tsx
      Modal.tsx
      ...primitives
  hooks/
    useMessages.ts
    useSearch.ts
    useWebSocket.ts
    useKeyboardShortcuts.ts
  services/
    api.ts
    auth.ts
    websocket.ts
  stores/
    emailStore.ts
    uiStore.ts
  types/
    email.ts
    user.ts
    api.ts
  utils/
    formatters.ts
    validators.ts
  App.tsx
  main.tsx
```

---

Built for the WhyMail backend platform - A modern, privacy-focused email experience.
