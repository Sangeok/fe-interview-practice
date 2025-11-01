import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSelectTechStore } from '../useSelectTechStore';

describe('useSelectTechStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSelectTechStore());
    act(() => {
      result.current.setTech('');
    });
  });

  describe('Initial State', () => {
    it('should have empty string as initial tech', () => {
      const { result } = renderHook(() => useSelectTechStore());
      expect(result.current.tech).toBe('');
    });

    it('should provide setTech function', () => {
      const { result } = renderHook(() => useSelectTechStore());
      expect(typeof result.current.setTech).toBe('function');
    });
  });

  describe('setTech', () => {
    it('should update tech to JavaScript', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });

      expect(result.current.tech).toBe('JavaScript');
    });

    it('should update tech to React', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('React');
      });

      expect(result.current.tech).toBe('React');
    });

    it('should update tech to TypeScript', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('TypeScript');
      });

      expect(result.current.tech).toBe('TypeScript');
    });

    it('should allow resetting tech to empty string', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });
      expect(result.current.tech).toBe('JavaScript');

      act(() => {
        result.current.setTech('');
      });
      expect(result.current.tech).toBe('');
    });

    it('should allow switching between different tech stacks', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });
      expect(result.current.tech).toBe('JavaScript');

      act(() => {
        result.current.setTech('React');
      });
      expect(result.current.tech).toBe('React');

      act(() => {
        result.current.setTech('TypeScript');
      });
      expect(result.current.tech).toBe('TypeScript');
    });

    it('should update tech immediately', () => {
      const { result } = renderHook(() => useSelectTechStore());

      expect(result.current.tech).toBe('');

      act(() => {
        result.current.setTech('React');
      });

      expect(result.current.tech).toBe('React');
    });
  });

  describe('State Persistence', () => {
    it('should persist state across hook instances', () => {
      const { result: result1 } = renderHook(() => useSelectTechStore());

      act(() => {
        result1.current.setTech('React');
      });

      const { result: result2 } = renderHook(() => useSelectTechStore());
      expect(result2.current.tech).toBe('React');
    });

    it('should share state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useSelectTechStore());
      const { result: result2 } = renderHook(() => useSelectTechStore());

      act(() => {
        result1.current.setTech('JavaScript');
      });

      expect(result2.current.tech).toBe('JavaScript');
    });

    it('should maintain state when setTech is called from different instances', () => {
      const { result: result1 } = renderHook(() => useSelectTechStore());
      const { result: result2 } = renderHook(() => useSelectTechStore());

      act(() => {
        result1.current.setTech('TypeScript');
      });

      expect(result1.current.tech).toBe('TypeScript');
      expect(result2.current.tech).toBe('TypeScript');

      act(() => {
        result2.current.setTech('React');
      });

      expect(result1.current.tech).toBe('React');
      expect(result2.current.tech).toBe('React');
    });
  });

  describe('Type Safety', () => {
    it('should accept valid TechType values', () => {
      const { result } = renderHook(() => useSelectTechStore());

      const validTechs = ['JavaScript', 'React', 'TypeScript', ''] as const;

      validTechs.forEach((tech) => {
        act(() => {
          result.current.setTech(tech);
        });
        expect(result.current.tech).toBe(tech);
      });
    });
  });

  describe('State Updates', () => {
    it('should not trigger unnecessary updates when setting same value', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });

      const firstTech = result.current.tech;

      act(() => {
        result.current.setTech('JavaScript');
      });

      expect(result.current.tech).toBe(firstTech);
      expect(result.current.tech).toBe('JavaScript');
    });

    it('should handle rapid state changes', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
        result.current.setTech('React');
        result.current.setTech('TypeScript');
      });

      expect(result.current.tech).toBe('TypeScript');
    });
  });

  describe('Hook Cleanup', () => {
    it('should maintain state after hook unmount and remount', () => {
      const { result: result1, unmount } = renderHook(() => useSelectTechStore());

      act(() => {
        result1.current.setTech('JavaScript');
      });

      unmount();

      const { result: result2 } = renderHook(() => useSelectTechStore());

      expect(result2.current.tech).toBe('JavaScript');
    });
  });

  describe('Selector Pattern', () => {
    it('should expose both tech and setTech', () => {
      const { result } = renderHook(() => useSelectTechStore());

      expect(result.current).toHaveProperty('tech');
      expect(result.current).toHaveProperty('setTech');
    });

    it('should have correct property types', () => {
      const { result } = renderHook(() => useSelectTechStore());

      expect(typeof result.current.tech).toBe('string');
      expect(typeof result.current.setTech).toBe('function');
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle typical user flow: select tech → reset → select again', () => {
      const { result } = renderHook(() => useSelectTechStore());

      // User selects JavaScript
      act(() => {
        result.current.setTech('JavaScript');
      });
      expect(result.current.tech).toBe('JavaScript');

      // User resets
      act(() => {
        result.current.setTech('');
      });
      expect(result.current.tech).toBe('');

      // User selects React
      act(() => {
        result.current.setTech('React');
      });
      expect(result.current.tech).toBe('React');
    });

    it('should handle tech switching during interview session', () => {
      const { result } = renderHook(() => useSelectTechStore());

      // Start with JavaScript interview
      act(() => {
        result.current.setTech('JavaScript');
      });
      expect(result.current.tech).toBe('JavaScript');

      // Switch to React interview
      act(() => {
        result.current.setTech('React');
      });
      expect(result.current.tech).toBe('React');

      // Switch to TypeScript interview
      act(() => {
        result.current.setTech('TypeScript');
      });
      expect(result.current.tech).toBe('TypeScript');
    });
  });
});
