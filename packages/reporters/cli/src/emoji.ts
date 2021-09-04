const supportsEmoji =
  process.platform !== 'win32' || process.env.TERM === 'xterm-256color';

// Fallback symbols for Windows from https://en.wikipedia.org/wiki/Code_page_437
export const progress: string = supportsEmoji ? '⏳' : '∞';
export const success: string = supportsEmoji ? '✨' : '√';
export const error: string = supportsEmoji ? '🚨' : '×';
export const warning: string = supportsEmoji ? '⚠️' : '‼';
export const info: string = supportsEmoji ? 'ℹ️' : 'ℹ';
export const hint: string = supportsEmoji ? '💡' : 'ℹ';
export const docs: string = supportsEmoji ? '📝' : 'ℹ';
