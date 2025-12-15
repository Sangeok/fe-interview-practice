import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserMessage from '../UserMessage';

describe('UserMessage Component', () => {
  describe('Basic Rendering', () => {
    it('should render user message with content', () => {
      render(<UserMessage content="Hello, this is my answer" />);
      expect(screen.getByText('Hello, this is my answer')).toBeInTheDocument();
    });

    it('should render with correct structure', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageContainer = container.querySelector('.flex.items-start.gap-3.justify-end');
      expect(messageContainer).toBeInTheDocument();
    });

    it('should render user avatar', () => {
      const { container } = render(<UserMessage content="Test" />);
      const avatar = container.querySelector('.w-8.h-8.rounded-lg');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display simple text content', () => {
      render(<UserMessage content="Simple message" />);
      expect(screen.getByText('Simple message')).toBeInTheDocument();
    });

    it('should display multiline content with whitespace preserved', () => {
      const multilineContent = 'Line 1\nLine 2\nLine 3';
      const { container } = render(<UserMessage content={multilineContent} />);
      const paragraph = container.querySelector('.whitespace-pre-wrap');
      expect(paragraph).toHaveTextContent(/Line 1\s*Line 2\s*Line 3/);
    });

    it('should handle empty string content', () => {
      const { container } = render(<UserMessage content="" />);
      const paragraph = container.querySelector('p');
      expect(paragraph).toHaveTextContent('');
    });

    it('should handle long content', () => {
      const longContent = 'A'.repeat(1000);
      render(<UserMessage content={longContent} />);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply correct background color', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.bg-gradient-to-br.from-cyan-500.to-cyan-600');
      expect(messageBox).toBeInTheDocument();
    });

    it('should apply correct text color', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.text-white');
      expect(messageBox).toBeInTheDocument();
    });

    it('should have rounded corners', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.rounded-lg');
      expect(messageBox).toBeInTheDocument();
    });

    it('should have max-width constraint', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.max-w-lg');
      expect(messageBox).toBeInTheDocument();
    });

    it('should have padding', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.px-4.py-3');
      expect(messageBox).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should align content to the right', () => {
      const { container } = render(<UserMessage content="Test" />);
      const outerContainer = container.querySelector('.justify-end');
      expect(outerContainer).toBeInTheDocument();
    });

    it('should have gap between avatar and message', () => {
      const { container } = render(<UserMessage content="Test" />);
      const outerContainer = container.querySelector('.gap-3');
      expect(outerContainer).toBeInTheDocument();
    });

    it('should align items at start', () => {
      const { container } = render(<UserMessage content="Test" />);
      const outerContainer = container.querySelector('.items-start');
      expect(outerContainer).toBeInTheDocument();
    });
  });

  describe('Avatar', () => {
    it('should render avatar with correct size', () => {
      const { container } = render(<UserMessage content="Test" />);
      const avatar = container.querySelector('.w-8.h-8');
      expect(avatar).toBeInTheDocument();
    });

    it('should render avatar as circle', () => {
      const { container } = render(<UserMessage content="Test" />);
      const avatar = container.querySelector('.rounded-lg');
      expect(avatar).toBeInTheDocument();
    });

    it('should render User icon in avatar', () => {
      const { container } = render(<UserMessage content="Test" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have correct avatar background', () => {
      const { container } = render(<UserMessage content="Test" />);
      const avatar = container.querySelector('.bg-gradient-to-br.from-cyan-500.to-cyan-600');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Content Types', () => {
    it('should handle single word', () => {
      render(<UserMessage content="Hello" />);
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should handle sentence', () => {
      render(<UserMessage content="This is a complete sentence." />);
      expect(screen.getByText('This is a complete sentence.')).toBeInTheDocument();
    });

    it('should handle paragraph', () => {
      const paragraph = 'This is a longer paragraph with multiple sentences. It contains more detailed information.';
      render(<UserMessage content={paragraph} />);
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      const specialContent = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<UserMessage content={specialContent} />);
      expect(screen.getByText(specialContent)).toBeInTheDocument();
    });

    it('should handle numbers', () => {
      render(<UserMessage content="12345" />);
      expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('should handle mixed content', () => {
      const mixed = 'Answer: 42, Status: ✓, Code: `const x = 1;`';
      render(<UserMessage content={mixed} />);
      expect(screen.getByText(mixed)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very short content', () => {
      render(<UserMessage content="A" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('should handle content with tabs', () => {
      const tabContent = 'Line1\tTabbed\tContent';
      render(<UserMessage content={tabContent} />);
      expect(screen.getByText(/Line1\s*Tabbed\s*Content/)).toBeInTheDocument();
    });

    it('should handle content with multiple spaces', () => {
      const spacedContent = 'Multiple     spaces     here';
      render(<UserMessage content={spacedContent} />);
      expect(screen.getByText(/Multiple\s+spaces\s+here/)).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      const unicode = '안녕하세요 👋 こんにちは 你好';
      render(<UserMessage content={unicode} />);
      expect(screen.getByText(unicode)).toBeInTheDocument();
    });

    it('should handle emojis', () => {
      const emojis = '😀 🎉 🚀 ✨';
      render(<UserMessage content={emojis} />);
      expect(screen.getByText(emojis)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML', () => {
      const { container } = render(<UserMessage content="Test" />);
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
    });

    it('should have readable text contrast', () => {
      const { container } = render(<UserMessage content="Test" />);
      const messageBox = container.querySelector('.text-white.bg-gradient-to-br');
      expect(messageBox).toBeInTheDocument();
    });
  });

  describe('Rendering Performance', () => {
    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <UserMessage content="Message 1" />
          <UserMessage content="Message 2" />
          <UserMessage content="Message 3" />
        </>
      );

      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
      expect(screen.getByText('Message 3')).toBeInTheDocument();
    });

    it('should update content when props change', () => {
      const { rerender } = render(<UserMessage content="Original" />);
      expect(screen.getByText('Original')).toBeInTheDocument();

      rerender(<UserMessage content="Updated" />);
      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.queryByText('Original')).not.toBeInTheDocument();
    });
  });

  describe('Text Formatting', () => {
    it('should preserve line breaks with whitespace-pre-wrap', () => {
      const multiline = 'First line\nSecond line\nThird line';
      const { container } = render(<UserMessage content={multiline} />);
      const paragraph = container.querySelector('.whitespace-pre-wrap');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent(/First line\s*Second line\s*Third line/);
    });

    it('should apply small text size', () => {
      const { container } = render(<UserMessage content="Test" />);
      const paragraph = container.querySelector('.text-sm');
      expect(paragraph).toBeInTheDocument();
    });

    it('should handle code-like content', () => {
      const code = 'const x = 1;\nfunction foo() {\n  return x;\n}';
      render(<UserMessage content={code} />);
      expect(screen.getByText(/const x = 1;\s*function foo\(\) \{\s*\s*return x;\s*\}/)).toBeInTheDocument();
    });
  });
});
