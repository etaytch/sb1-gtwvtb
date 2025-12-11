import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { randomMessages, getRandomMessage, randomLog, randomLogWithChance } from './logger.js';

describe('Random Console Log', () => {
  describe('randomMessages', () => {
    it('should have at least 10 messages', () => {
      expect(randomMessages.length).toBeGreaterThanOrEqual(10);
    });

    it('should contain only strings', () => {
      randomMessages.forEach((message) => {
        expect(typeof message).toBe('string');
      });
    });

    it('should have non-empty messages', () => {
      randomMessages.forEach((message) => {
        expect(message.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getRandomMessage', () => {
    it('should return a string', () => {
      const message = getRandomMessage();
      expect(typeof message).toBe('string');
    });

    it('should return a message from the randomMessages array', () => {
      const message = getRandomMessage();
      expect(randomMessages).toContain(message);
    });

    it('should return different messages over multiple calls', () => {
      const messages = new Set();
      for (let i = 0; i < 50; i++) {
        messages.add(getRandomMessage());
      }
      expect(messages.size).toBeGreaterThan(1);
    });
  });

  describe('randomLog', () => {
    let infoSpy;

    beforeEach(() => {
      infoSpy = vi.fn();
      vi.doMock('./logger.js', async (importOriginal) => {
        const original = await importOriginal();
        return {
          ...original,
          default: { info: infoSpy },
        };
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should be a function', () => {
      expect(typeof randomLog).toBe('function');
    });

    it('should accept an optional context parameter', () => {
      expect(() => randomLog()).not.toThrow();
      expect(() => randomLog('TestContext')).not.toThrow();
    });
  });

  describe('randomLogWithChance', () => {
    it('should be a function', () => {
      expect(typeof randomLogWithChance).toBe('function');
    });

    it('should accept probability and context parameters', () => {
      expect(() => randomLogWithChance()).not.toThrow();
      expect(() => randomLogWithChance(0.5)).not.toThrow();
      expect(() => randomLogWithChance(0.5, 'TestContext')).not.toThrow();
    });

    it('should respect probability of 0 (never log)', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      for (let i = 0; i < 100; i++) {
        randomLogWithChance(0, 'Test');
      }
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
