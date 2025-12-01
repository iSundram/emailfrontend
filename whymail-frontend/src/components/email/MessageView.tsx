import React from 'react';
import DOMPurify from 'dompurify';
import {
  Reply,
  ReplyAll,
  Forward,
  Archive,
  Trash2,
  MoreHorizontal,
  Star,
  Paperclip,
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Printer,
  Tag,
  Clock,
  Shield,
} from 'lucide-react';
import { useEmailStore, useUIStore } from '../../stores';
import { Avatar, Button, Dropdown, DropdownItem, DropdownDivider, Tooltip, Tag as LabelTag } from '../ui';
import { formatFullDate, formatEmailAddressFull, formatFileSize } from '../../utils';

export function MessageView() {
  const { selectedEmail, toggleStar, deleteEmails } = useEmailStore();
  const { openCompose, togglePreviewPane } = useUIStore();
  
  const [showDetails, setShowDetails] = React.useState(false);
  
  if (!selectedEmail) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-whymail-500 p-8">
        <div className="w-24 h-24 mb-6 rounded-full bg-whymail-100 flex items-center justify-center">
          <img src="/icon.svg" alt="" className="w-12 h-12 opacity-50" />
        </div>
        <p className="text-lg font-medium text-whymail-600">Select an email to read</p>
        <p className="text-sm mt-1">Choose from your messages on the left</p>
      </div>
    );
  }
  
  const handleReply = () => {
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
  };
  
  const handleReplyAll = () => {
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
  };
  
  const handleForward = () => {
    openCompose({
      to: '',
      cc: '',
      bcc: '',
      subject: `Fwd: ${selectedEmail.subject}`,
      body: `\n\n---------- Forwarded message ----------\nFrom: ${formatEmailAddressFull(selectedEmail.from)}\nDate: ${formatFullDate(selectedEmail.date)}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.bodyText || selectedEmail.snippet}`,
      attachmentIds: selectedEmail.attachments?.map(a => a.id) || [],
      isForward: true,
    });
  };
  
  const sanitizedHtml = selectedEmail.bodyHtml 
    ? DOMPurify.sanitize(selectedEmail.bodyHtml, {
        ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'span', 'div', 'img'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'style', 'class'],
      })
    : null;
  
  return (
    <div className="flex flex-col h-full">
      {/* Action bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-whymail-200 bg-white">
        <div className="flex items-center gap-1">
          <Tooltip content="Reply">
            <Button variant="ghost" size="sm" onClick={handleReply}>
              <Reply className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Reply</span>
            </Button>
          </Tooltip>
          
          <Tooltip content="Reply all">
            <Button variant="ghost" size="sm" onClick={handleReplyAll}>
              <ReplyAll className="w-4 h-4" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Forward">
            <Button variant="ghost" size="sm" onClick={handleForward}>
              <Forward className="w-4 h-4" />
            </Button>
          </Tooltip>
          
          <div className="h-4 w-px bg-whymail-200 mx-1" />
          
          <Tooltip content="Archive">
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Delete">
            <Button variant="ghost" size="sm" onClick={() => deleteEmails([selectedEmail.id])}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
          
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            }
          >
            <DropdownItem icon={<Star className="w-4 h-4" />}>
              {selectedEmail.isStarred ? 'Unstar' : 'Star'}
            </DropdownItem>
            <DropdownItem icon={<Tag className="w-4 h-4" />}>
              Add label
            </DropdownItem>
            <DropdownItem icon={<Clock className="w-4 h-4" />}>
              Snooze
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={<Printer className="w-4 h-4" />}>
              Print
            </DropdownItem>
            <DropdownItem icon={<Download className="w-4 h-4" />}>
              Download as .eml
            </DropdownItem>
            <DropdownItem icon={<ExternalLink className="w-4 h-4" />}>
              Open in new window
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={<Shield className="w-4 h-4" />}>
              Show original
            </DropdownItem>
          </Dropdown>
        </div>
        
        <Button variant="ghost" size="sm" onClick={togglePreviewPane}>
          Close
        </Button>
      </div>
      
      {/* Email content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Subject */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-xl font-semibold text-whymail-dark">
              {selectedEmail.subject || '(no subject)'}
            </h1>
            <button
              onClick={() => toggleStar([selectedEmail.id])}
              className={`flex-shrink-0 ${
                selectedEmail.isStarred ? 'text-yellow-500' : 'text-whymail-300 hover:text-whymail-400'
              }`}
            >
              <Star
                className="w-5 h-5"
                fill={selectedEmail.isStarred ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          
          {/* Labels */}
          {selectedEmail.labels.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {selectedEmail.labels.map((label) => (
                <LabelTag key={label.id} color={label.color}>
                  {label.name}
                </LabelTag>
              ))}
            </div>
          )}
          
          {/* Sender info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar
              name={selectedEmail.from.name}
              email={selectedEmail.from.email}
              size="lg"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-medium text-whymail-dark">
                    {selectedEmail.from.name || selectedEmail.from.email}
                  </span>
                  {selectedEmail.from.name && (
                    <span className="text-sm text-whymail-500 ml-2">
                      &lt;{selectedEmail.from.email}&gt;
                    </span>
                  )}
                </div>
                <span className="text-sm text-whymail-500 flex-shrink-0">
                  {formatFullDate(selectedEmail.date)}
                </span>
              </div>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-sm text-whymail-500 hover:text-whymail-700 mt-1"
              >
                <span>to me</span>
                {showDetails ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-whymail-50 rounded-lg text-sm">
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    <span className="text-whymail-500">From:</span>
                    <span className="text-whymail-700">
                      {formatEmailAddressFull(selectedEmail.from)}
                    </span>
                    
                    <span className="text-whymail-500">To:</span>
                    <span className="text-whymail-700">
                      {selectedEmail.to.map(t => formatEmailAddressFull(t)).join(', ')}
                    </span>
                    
                    {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                      <>
                        <span className="text-whymail-500">Cc:</span>
                        <span className="text-whymail-700">
                          {selectedEmail.cc.map(c => formatEmailAddressFull(c)).join(', ')}
                        </span>
                      </>
                    )}
                    
                    <span className="text-whymail-500">Date:</span>
                    <span className="text-whymail-700">
                      {formatFullDate(selectedEmail.date)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Security indicators */}
          {(selectedEmail.isEncrypted || selectedEmail.isSigned) && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                {selectedEmail.isEncrypted && selectedEmail.isSigned
                  ? 'This message is encrypted and signed'
                  : selectedEmail.isEncrypted
                    ? 'This message is encrypted'
                    : 'This message is signed'}
              </span>
            </div>
          )}
          
          {/* Email body */}
          <div className="prose prose-sm max-w-none text-whymail-700">
            {sanitizedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            ) : (
              <div className="whitespace-pre-wrap">
                {selectedEmail.bodyText || selectedEmail.snippet}
              </div>
            )}
          </div>
          
          {/* Attachments */}
          {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-whymail-200">
              <h3 className="flex items-center gap-2 text-sm font-medium text-whymail-700 mb-3">
                <Paperclip className="w-4 h-4" />
                {selectedEmail.attachments.length} Attachment{selectedEmail.attachments.length !== 1 ? 's' : ''}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedEmail.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.downloadUrl || '#'}
                    className="flex items-center gap-3 p-3 bg-whymail-50 rounded-lg hover:bg-whymail-100 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-whymail-200 rounded flex items-center justify-center">
                      <Paperclip className="w-5 h-5 text-whymail-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-whymail-700 truncate">
                        {attachment.filename}
                      </p>
                      <p className="text-xs text-whymail-500">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-whymail-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick reply */}
      <div className="p-4 border-t border-whymail-200 bg-white">
        <button
          onClick={handleReply}
          className="w-full p-3 text-left text-sm text-whymail-500 bg-whymail-50 rounded-lg hover:bg-whymail-100 transition-colors"
        >
          Click here to reply...
        </button>
      </div>
    </div>
  );
}
