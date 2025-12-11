import winston from 'winston';
import { config } from '../config/config.js';

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

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

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[index];
};

export const randomLog = (context) => {
  if (config.env === 'development') {
    const message = getRandomMessage();
    const prefix = context ? `[Random - ${context}]` : '[Random]';
    logger.info(`${prefix} ${message}`);
  }
};

export const randomLogWithChance = (probability = 0.1, context) => {
  if (config.env === 'development' && Math.random() < probability) {
    const message = getRandomMessage();
    const prefix = context ? `[Random - ${context}]` : '[Random]';
    logger.info(`${prefix} ${message}`);
  }
};

export { randomMessages, getRandomMessage };
export default logger;