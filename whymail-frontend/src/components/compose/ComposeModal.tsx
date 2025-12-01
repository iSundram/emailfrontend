import React, { useState, useRef } from 'react';
import {
  X,
  Minus,
  Maximize2,
  Paperclip,
  Image,
  Link,
  Bold,
  Italic,
  List,
  ListOrdered,
  Send,
  Clock,
  Trash2,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import { useUIStore } from '../../stores';
import { Button, Dropdown, DropdownItem, DropdownDivider } from '../ui';
import { validateEmailAddresses } from '../../utils';

export function ComposeModal() {
  const { 
    isComposeOpen, 
    closeCompose, 
    composeData, 
    setComposeData,
    addToast,
  } = useUIStore();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCc, setShowCc] = useState(!!composeData?.cc);
  const [showBcc, setShowBcc] = useState(!!composeData?.bcc);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const bodyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!isComposeOpen || !composeData) return null;
  
  const handleSend = async () => {
    // Validate
    const newErrors: Record<string, string> = {};
    
    const { valid, invalid } = validateEmailAddresses(composeData.to);
    if (valid.length === 0) {
      newErrors.to = 'Please enter at least one recipient';
    } else if (invalid.length > 0) {
      newErrors.to = `Invalid email addresses: ${invalid.join(', ')}`;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    addToast({
      type: 'success',
      message: 'Email sent successfully',
      duration: 3000,
    });
    
    closeCompose();
    setIsSending(false);
  };
  
  const handleAttachment = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addToast({
        type: 'info',
        message: `${files.length} file(s) attached`,
        duration: 2000,
      });
    }
  };
  
  const getTitle = () => {
    if (composeData.isReply) return 'Reply';
    if (composeData.isForward) return 'Forward';
    return 'New Message';
  };
  
  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-4 z-50">
        <div
          className="w-72 bg-whymail-dark rounded-t-lg shadow-lg cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between px-4 py-2 text-white">
            <span className="text-sm font-medium truncate">
              {composeData.subject || getTitle()}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="p-1 hover:bg-whymail-700 rounded"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeCompose();
                }}
                className="p-1 hover:bg-whymail-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const modalClasses = isFullscreen
    ? 'fixed inset-4 z-50'
    : 'fixed bottom-0 right-4 z-50 w-full max-w-xl';
  
  return (
    <div className={modalClasses}>
      <div className={`
        bg-white rounded-t-lg shadow-2xl border border-whymail-200 flex flex-col
        ${isFullscreen ? 'h-full rounded-lg' : 'h-[600px]'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-whymail-dark text-white rounded-t-lg">
          <span className="font-medium">{getTitle()}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-whymail-700 rounded"
              aria-label="Minimize"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-whymail-700 rounded"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeCompose}
              className="p-1 hover:bg-whymail-700 rounded"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Recipients */}
        <div className="border-b border-whymail-200">
          <div className="flex items-center px-4 py-2">
            <label className="w-12 text-sm text-whymail-500">To</label>
            <input
              type="text"
              value={composeData.to}
              onChange={(e) => {
                setComposeData({ to: e.target.value });
                setErrors({ ...errors, to: '' });
              }}
              className="flex-1 text-sm text-whymail-dark outline-none"
              placeholder="Recipients"
            />
            <button
              onClick={() => {
                setShowCc(!showCc);
                setShowBcc(!showBcc);
              }}
              className="text-sm text-whymail-500 hover:text-whymail-700"
            >
              Cc/Bcc
            </button>
          </div>
          {errors.to && (
            <p className="px-4 pb-2 text-sm text-error">{errors.to}</p>
          )}
          
          {showCc && (
            <div className="flex items-center px-4 py-2 border-t border-whymail-100">
              <label className="w-12 text-sm text-whymail-500">Cc</label>
              <input
                type="text"
                value={composeData.cc}
                onChange={(e) => setComposeData({ cc: e.target.value })}
                className="flex-1 text-sm text-whymail-dark outline-none"
                placeholder="Carbon copy"
              />
            </div>
          )}
          
          {showBcc && (
            <div className="flex items-center px-4 py-2 border-t border-whymail-100">
              <label className="w-12 text-sm text-whymail-500">Bcc</label>
              <input
                type="text"
                value={composeData.bcc}
                onChange={(e) => setComposeData({ bcc: e.target.value })}
                className="flex-1 text-sm text-whymail-dark outline-none"
                placeholder="Blind carbon copy"
              />
            </div>
          )}
        </div>
        
        {/* Subject */}
        <div className="flex items-center px-4 py-2 border-b border-whymail-200">
          <label className="w-12 text-sm text-whymail-500">Subject</label>
          <input
            type="text"
            value={composeData.subject}
            onChange={(e) => setComposeData({ subject: e.target.value })}
            className="flex-1 text-sm text-whymail-dark outline-none"
            placeholder="Subject"
          />
        </div>
        
        {/* Formatting toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-whymail-200">
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <Bold className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <Italic className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-whymail-200 mx-1" />
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <List className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <ListOrdered className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-whymail-200 mx-1" />
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <Link className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-whymail-100 text-whymail-600">
            <Image className="w-4 h-4" />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <div
            ref={bodyRef}
            contentEditable
            className="h-full outline-none text-sm text-whymail-dark"
            onInput={(e) => setComposeData({ body: e.currentTarget.textContent || '' })}
            suppressContentEditableWarning
          >
            {composeData.body}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-whymail-200 bg-whymail-50">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSend}
              isLoading={isSending}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
            
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              }
            >
              <DropdownItem icon={<Clock className="w-4 h-4" />}>
                Schedule send
              </DropdownItem>
            </Dropdown>
          </div>
          
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleAttachment}
              className="p-2 rounded hover:bg-whymail-200 text-whymail-600"
              aria-label="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            
            <Dropdown
              trigger={
                <button className="p-2 rounded hover:bg-whymail-200 text-whymail-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              }
              align="right"
            >
              <DropdownItem>Insert signature</DropdownItem>
              <DropdownItem>Insert template</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Print</DropdownItem>
            </Dropdown>
            
            <button
              onClick={closeCompose}
              className="p-2 rounded hover:bg-whymail-200 text-whymail-600"
              aria-label="Discard draft"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
