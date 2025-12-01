1 — High-level Principles

1. User-first performance: inbox loads <1s on typical broadband; UI interactions feel instantaneous.


2. Privacy & control: minimum server-side retention; allow users to choose local-first caching; end-to-end encryption support for power users.


3. Predictable UX: keyboard-centric with clear visual affordances; familiar three-pane layout while allowing custom layouts.


4. Extensibility & interoperability: open plugin architecture, public API, webhooks, browser extensions.


5. Accessibility & inclusivity: full keyboard navigation, screen-reader support, WCAG 2.1 AA compliance.


6. Security-first: phishing protections, session/device management, strict CSP and secure-by-default settings.


7. No dark patterns: transparent feature gating, clear opt-ins for telemetry or extra services.





2 — Protocols & Account Setup

Supported protocols

IMAP (with IDLE for push)

SMTP (with STARTTLS / SMTPS)

POP3 (optional)

OAuth 2.0 for Google, Microsoft (Exchange/Outlook), Yahoo

Optional Exchange Web Services (EWS) / Microsoft Graph for advanced Exchange integration


Automatic account setup

Detect provider from email address and prefill IMAP/SMTP settings if known.

Presets for Gmail, Outlook/Office365, Yahoo, Zoho, ProtonMail Bridge, Fastmail, Yandex.

Manual advanced setup UI for custom domains and port/security options.


Multiple accounts & identity management

Add unlimited accounts.

Unified Inbox view (combined) and account-specific inboxes.

Per-account identity (From: address, signature, reply-to).

Per-account sync preferences (frequency, offline cache size).




---

3 — User Interface & Experience

Core layout options

Default 3-pane: Sidebar (folders/labels) | List | Pane (email content).

Split view (two columns), Single-column (mobile-like) and Compact list (dense).

Floating compose window / full-screen compose.

Resizable panes with persistent layout on each device.


Sidebar & navigation

Favorites, System folders (Inbox, Sent, Drafts), Smart folders (Unread, Starred), Labels/Folders tree.

Quick Actions: compose, search, calendar, tasks, contacts, settings.

Filtered views: by account, label, date range, attachment presence.


Message list

Dense / Comfortable list density settings.

Columns: sender, subject, snippet, labels, timestamp, size, attachment icon.

Multi-select actions (archive, delete, mark read/unread, apply label, move).

Inline bulk actions toolbar appears on selection.

Sort by date, sender, subject, size, or custom.


Message view

HTML rendering with strict sanitization (CSP + safe HTML renderer).

Threaded conversation view with expand/collapse for messages.

Inline attachments preview (images, PDFs) with download and inline viewer.

Action strip: Reply / Reply all / Forward / Archive / Move / Label / More (print, .eml download).

Visual indicators for priority, encryption (PGP/GPG), signed messages, attachments.


Compose

Rich text editor with formatting (bold, italic, lists), inline images, attachments via drag & drop.

Templates / canned responses (non-AI) users create themselves.

Multiple signatures per account; switchable during compose.

Scheduled send (send later, with timezone support).

Spellcheck integration (browser native).

Send confirmations for large attachments, missing recipients, or possible accidental reply-all.

Attachment size warnings and cloud link suggestions.


Themes & personalization

Light/dark/AMOLED presets.

Custom CSS-free theme builder: accent color, font family, compactness, background image.

Accessibility theme: high contrast, large text.


Keyboard-first UX

Global command palette (Ctrl/Cmd+K) — quick jump to labels, compose, search.

Full set of keyboard shortcuts configurable and exportable.

Modal command mode (optional) for power users.




---

4 — Offline & Syncing

Local caching

Selectable offline mode per account: headers-only, headers+body, full mail + attachments.

SQLite / IndexedDB store on client with configurable retention.

Background sync when online: push using IMAP IDLE or periodic sync for POP3.


Conflict resolution

Last-write-wins by default with an explicit conflict UI for edits on both client and server.

Draft autosave locally and cloud sync.


Offline compose & queue

Compose offline, queue sends, and retry automatically when connection resumes.

Clear UI for queued messages and retry/cancel options.




---

5 — Search & Filtering (non-AI)

Fast indexed search

Local full-text index of headers and bodies (optional).

Search syntax: from:, to:, subject:, label:, has:attachment, before:, after:, is:unread, size:>10MB.

Boolean operations, phrase search with quotes, date ranges.


Saved searches & filters

User-defined saved searches (one-click access).

Server-side and client-side filters:

Server-side where possible (when using provider rules).

Client-side local filters that apply after sync (e.g., for providers without server filters).



Advanced filters

Bulk actions from search results.

Auto-apply labels on incoming mail (user-created rules).

Filter test runner to preview matched messages.




---

6 — Organization & Automation (No AI)

Labels & folders

Multi-label support, nested labels/folders.

Color-coded labels.

Apply/remove labels via drag & drop or quick actions.


Rules & automations (user-defined)

If/Then rule builder: conditions (from, subject contains, has attachment, size, recipient), actions (label, move, mark read, forward, star, archive, delete).

Schedule-based rules (e.g., archive messages older than 6 months).

Rate-limited bulk actions to avoid server throttling.


Snooze, Pin, and Follow-up

Snooze messages to reappear at chosen time/date.

Pin important threads to top of inbox.

Manual follow-up reminders (user sets a date/time to resurface a message).


Smart categories (non-AI)

Rule-based grouping for receipts, newsletters, social updates using deterministic patterns (senders, common headers).

User can edit group rules.




---

7 — Collaboration & Team Features

Shared mailboxes

Add team mailbox accounts (IMAP-backed or provider shared mailbox).

Assignment mechanics: claim/unclaim messages, add internal notes (visible to team), change status (open, pending, resolved).


Internal comments

Add internal comments to threads (not sent to external recipients).

Mentions: @username to notify other teammates (internal notification system, not email).


Shared labels & rules

Team-shared labels and rules (admin-configurable).

Audit log of actions performed on shared mailbox items.


Delegation

Delegate mailbox access with role-based permissions (read-only, respond-as, admin manage).




---

8 — Security & Privacy (Detailed)

Authentication

OAuth2 for provider accounts.

Support for App Passwords for accounts that need them.

Device/session management with remote logout.

Two-factor authentication (2FA) for app account (if user account exists on service).


Encryption

Optional PGP/GPG integration for end-to-end encryption.

Key management UI (import/export keys, key trust model, sign/verify, key discovery for contacts).


Transport security: TLS for all connections, strict certificate validation and pinning options (advanced setting).

Encrypted local storage optional with passphrase.


Phishing & malware protections

URL hover reveal and domain highlighting.

Display origin details (full email headers view) and visual warnings for suspicious headers (e.g., SPF/DKIM/DMARC failures).

Attachment sandboxing: view attachments in a sandboxed viewer; block certain file types.

Block remote image auto-loading by default; option to allow remote images per sender.


Privacy & telemetry

Default: telemetry off. If enabled, show exactly what is collected and allow fine-grained toggles.

No behavioral ads; no data selling.

GDPR/Data subject request support: export user data, delete account.


Audit & logging

Local audit trail for sensitive actions (deletes, downloads).

Admin logs for teams (who performed which actions).




---

9 — Integrations & Extensions (No AI)

Calendars & Contacts

Calendar integration (Google Calendar, Microsoft Exchange/Outlook, CalDAV).

Contacts: CardDAV support and provider sync.

In-email calendar insertion: create event from email, add suggested attendees (from To/Cc).


Cloud storage

Attach from cloud (Google Drive, OneDrive, Dropbox, Box, WebDAV).

Save attachments to cloud with one click.


Third-party connectors

Slack, Microsoft Teams: send message or create a task from email link.

Zapier / Make integration via webhooks and app connectors.


Browser extensions

Save webpage to email (send-link-to-self), quick compose from anywhere, link to selected text.


Plugins & App Store

Secure plugin API with permission manifest.

Plugins run isolated (sandboxed) in the browser environment.

Example plugins: CRM integration, email templates manager, invoice extractor (non-AI), S/MIME support plugin.


Developer API & Webhooks

REST API for mail search, send, label manipulation, and webhook subscriptions (new message, label change).

OAuth client credentials for apps; scope-based access controls.

Rate limiting and per-app API keys.




---

10 — Performance & Scaling

Frontend

Code-splitting, lazy loading components.

Minimal initial payload; static assets served via CDN.

Caching strategies with ETags and service-worker for offline assets.


Backend (if hosting sync)

Optional sync service for advanced features (search indexing, push notifications, caching).

Horizontal scaling with stateless app servers, Redis for transient state, and a document store for queued items if needed.

Monitoring and autoscaling policies.


Benchmarks

Inbox hydrate (first 50 messages) under 1s on 50ms RTT, 20Mbps.

Scroll and list rendering must remain 60fps on modern devices with virtualization for long lists.




---

11 — Privacy-first Analytics & Instrumentation

Event tracking minimal

Only performance & crash telemetry by default (opt-in for usage analytics).

Aggregate and anonymize: no PII in telemetry.

Provide users with UI to view and delete telemetry.


Error monitoring

Client-side error capture (sourcemap-enabled) with secure storage.

Server alerts for delivery failures, bounce spikes, and provider sync errors.




---

12 — Migration Tools

Import assistants

One-click import from Gmail: labels mapping, folder structure, filters (where provider allows).

Standard IMAP migration wizard for full mailbox copy.

Export facility: export to MBOX or EMLs per folder.


Provider limit handling

Throttling for large migrations with retry/backoff.

Resumeable migrations with progress UI and logs.




---

13 — Settings & Admin Controls

User settings

Account-level settings: sync frequency, storage quotas, signatures, vacation autoresponder, forwarding rules (if server supports).

Global settings: theme, keyboard customizations, privacy toggles, notification preferences.


Team admin

Domain-level policies (shared labels, retention policies, delegation settings).

User provisioning via SCIM (for teams).

Audit logs and export.


Retention & archival

Per-account retention rules: auto-archive or delete older than X days.

Exportable archived bundles for compliance.




---

14 — Compliance & Legal

Data residency

Allow customers to choose hosting region for any hosted backend services.


Regulatory

Support for GDPR, CCPA compliance tools (data export, delete).

Optional HIPAA-facing hosting model with BAAs (if offering hosted service).


Terms & privacy

Transparent privacy policy; clear service agreements.




---

15 — Accessibility & Internationalization

Accessibility

WCAG 2.1 AA compliance checklist implemented.

Keyboard navigation for all UI flows.

ARIA attributes on controls; skip links and semantic HTML.

VoiceOver/JAWS compatibility testing.


Internationalization

Multi-language UI; right-to-left support.

Localized date/time handling and timezones.

Unicode normalization for headers and subjects.




---

16 — Testing Strategy

Automated testing

Unit tests for UI components and sync logic.

Integration tests for IMAP/SMTP operations using test mail servers and mocks.

End-to-end tests across major browsers with Puppeteer or Playwright.

Accessibility automated checks (axe).


Manual QA

Cross-provider scenarios (Gmail, Exchange, IMAP custom).

Migration, offline, and conflict resolution edge cases.

Security penetration testing and bug bounty program.




---

17 — Observability & Operations

Monitoring

Uptime checks, delivery success metrics, outgoing mail queue metrics.

Alert rules for sync errors, high bounce rates, or service degradation.


Support

In-app help center, searchable docs, and email + ticket support.

Admin support portal for enterprise customers with SLA tracking.




---

18 — Monetization & Pricing Ideas

Freemium model

Free tier: core features, limited connected accounts (e.g., 2), limited offline cache.

Premium (monthly/yearly): unlimited accounts, larger offline storage, priority support, custom domain handling, shared mailboxes.

Business / Team plans: shared mailboxes, SCIM provisioning, domain policies, audit logs, SSO, admin controls.


Add-ons

Additional storage packs for caches and attachments.

Hosted search indexing (for users who want server-side indexing).

White-label / self-hosted enterprise bundles.


Self-hosted / On-prem

Offer dockerized or cloud-deployable packages for companies wanting to host entirely inside their VPC.




---

19 — Roadmap (Suggested Phases)

Phase 0 — MVP (3–4 months)

IMAP/SMTP connect; Gmail/OAuth quick setup, 3-pane UI, compose, search, offline headers-only caching, basic filters, themes, keyboard shortcuts, basic account management.


Phase 1 — Core polish (4–6 months)

Full message caching, attachments, scheduled send, snooze, templates, unified inbox, mobile responsive UI, PGP integration basics, plugin API v1.


Phase 2 — Team & scaling (6–9 months)

Shared mailboxes, delegations, team labels, SCIM, admin panel, enterprise features, hosted migration tools.


Phase 3 — Enterprise & self-hosting (9–12 months)

On-prem package, advanced security features (HSM for keys), audit exports, SLAs, HIPAA-ready infra.



---

20 — Sample User Flows (Detailed)

Flow: Add Gmail account

1. User clicks Add Account → enters user@gmail.com.


2. App auto-detects Gmail → shows OAuth button.


3. User authorizes via Google OAuth popup.


4. App confirms permissions and shows sync options (headers-only / full download).


5. Inbox populates; unified inbox includes this account.



Flow: Schedule send

1. Compose modal → user writes message → clicks ► with clock icon → chooses preset (tomorrow 9:00) or custom date/time (with timezone selector).


2. Message displays queued status in Outbox with cancel/edit options.



Flow: Create rule to label receipts automatically

1. Settings → Rules → New rule → Condition: From contains "receipt" OR subject contains "invoice" OR has:attachment AND from contains "store".


2. Action: Apply label "Receipts", move to folder Receipts, mark as read.


3. Preview runner shows sample messages that match → Save and enable.



Flow: Offline compose & send

1. User composes while offline → clicks Send → message stored in local queue → UI shows queued badge.


2. When online, client retries send using SMTP and shows delivered or failed status.




---

21 — Edge Cases & Error Handling

IMAP throttling: exponential backoff and user-visible explanation.

Authentication failures: clear, provider-specific remediation instructions (reconnect OAuth, reset app password).

Attachment upload failures: retry logic and fallbacks (switch to chunked upload where possible).

Large mailbox imports: provide resumable migration, detailed progress, and pause/resume.

Conflicting local edits: show conflict compare UI with options to keep local/server/both.



---

22 — Sample Settings / Keyboard Shortcuts (Suggested Defaults)

G then I — go to Inbox

C — compose

R — reply

A — reply all

F — forward

E — archive

# — delete

S — star

Shift+U — mark unread

Cmd/Ctrl+K — command palette

Cmd/Ctrl+Enter — send

Shift+Esc — focus search


(Settings panel: toggles for keyboard scheme, enable vim-like command mode, customize each shortcut, import/export shortcut bindings.)


---

23 — UI Copy & Microcopy Guidelines

Be explicit: “Permanently delete?” instead of “Are you sure?”

Show contextual help: “This account will sync every X minutes. Increase to keep inbox fresher but may use more battery/data.”

Error messaging: avoid raw stack traces; provide actionable steps.



---

24 — Branding & Name Considerations (quick)

Names that convey speed, privacy, control: Posta, Mailboxr, SwiftMail, AnchorMail, PaneMail. (Optional: use user’s preferred branding later.)



---

25 — Deliverables & Artifacts for Teams

High-fidelity Figma designs for desktop and mobile responsive states.

Component library (React + TypeScript + Tailwind).

Detailed API spec (OpenAPI/Swagger).

Migration scripts and documentation.

Security & compliance playbook.

Onboarding checklist and admin guides.



---

26 — Appendix — Technical Implementation Notes

Frontend stack (recommended): React + TypeScript, Vite, Tailwind CSS, React Query for data sync, Virtualized list (react-window or equivalent), Service Worker for offline assets, IndexedDB for message caching.

Backend (optional sync services): Node.js or Go microservices, Redis for queues, PostgreSQL for metadata, optional Elastic/Meilisearch for server-side search, MinIO for attachments.

Deployment: Docker + Kubernetes, CI/CD pipelines, immutable releases.

Security: CSP, SRI for static assets, strict cookie flags, use WebAuthn for 2FA options.



---

Final Notes — What this Spec Enables

A non-AI, modern alternative to Gmail that focuses on speed, privacy, control, and extensibility.

Suitable for both power users and teams who need shared workflows and on-prem/self-hosted options.

Designed to be modular so features (like PGP, team inboxes, search indexing) can be toggled by user or admin.

.

