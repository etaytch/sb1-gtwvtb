const randomMessages = [
  'Hello from the other side of the code!',
  'Just checking in... everything looks fine here.',
  'Random fact: A group of flamingos is called a "flamboyance".',
  'Did you know? The first computer bug was an actual bug!',
  'Coffee break? This code is running smoothly.',
  'Debugging is like being a detective in a crime movie where you are also the murderer.',
  'Works on my machine!',
  'There are only 10 types of people: those who understand binary and those who don\'t.',
  'Keep calm and clear your cache.',
  'Code never lies, comments sometimes do.',
  'It\'s not a bug, it\'s a feature!',
  'Have you tried turning it off and on again?',
  'This log message will self-destruct in 5... 4... 3... just kidding.',
  'Remember: a clean console is a happy console.',
  'Pro tip: The best code is no code at all.',
];

const getRandomMessage = (): string => {
  const index = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[index];
};

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
  },
  random: (context?: string) => {
    if (process.env.NODE_ENV === 'development') {
      const message = getRandomMessage();
      const prefix = context ? `[Random - ${context}]` : '[Random]';
      console.log(prefix, message);
    }
  },
  randomWithChance: (probability: number = 0.1, context?: string) => {
    if (process.env.NODE_ENV === 'development' && Math.random() < probability) {
      const message = getRandomMessage();
      const prefix = context ? `[Random - ${context}]` : '[Random]';
      console.log(prefix, message);
    }
  }
};

export { randomMessages, getRandomMessage };