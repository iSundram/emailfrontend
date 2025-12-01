export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function parseEmailAddresses(input: string): string[] {
  if (!input.trim()) return [];
  
  return input
    .split(/[,;]/)
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
}

export function validateEmailAddresses(input: string): { valid: string[]; invalid: string[] } {
  const addresses = parseEmailAddresses(input);
  const valid: string[] = [];
  const invalid: string[] = [];
  
  addresses.forEach((addr) => {
    if (isValidEmail(addr)) {
      valid.push(addr);
    } else {
      invalid.push(addr);
    }
  });
  
  return { valid, invalid };
}

export function isValidSubject(subject: string): boolean {
  return subject.trim().length > 0 && subject.length <= 998;
}

export function validateAttachmentSize(size: number, maxSizeMB: number = 25): boolean {
  return size <= maxSizeMB * 1024 * 1024;
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

export function isAllowedFileType(filename: string, allowedTypes: string[]): boolean {
  const ext = getFileExtension(filename);
  return allowedTypes.includes(ext);
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}
