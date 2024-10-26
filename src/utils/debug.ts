export const debug = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Debug]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Warning]', ...args);
    }
  },
  group: (label: string, fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`[Debug] ${label}`);
      fn();
      console.groupEnd();
    }
  }
};