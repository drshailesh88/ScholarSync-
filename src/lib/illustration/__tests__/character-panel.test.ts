import { describe, expect, it } from 'vitest';
import {
  applyCharacterProperty,
  readCharacterPanelState,
  toggleCharacterBold,
  type CharacterTextLike,
} from '@/components/illustration/CharacterPanel';

class MockTextbox implements CharacterTextLike {
  fontFamily?: string = 'Arial';
  fontSize?: number = 16;
  fontWeight?: string | number = 'normal';
  fontStyle?: string = 'normal';
  underline?: boolean = false;
  linethrough?: boolean = false;
  textAlign?: 'left' | 'center' | 'right' | 'justify' = 'left';
  lineHeight?: number = 1.16;
  charSpacing?: number = 0;
  fill?: unknown = '#000000';
  stroke?: unknown = '#000000';
  strokeWidth?: number = 0;

  constructor(overrides: Partial<MockTextbox> = {}) {
    Object.assign(this, overrides);
  }

  set(keyOrValues: string | Record<string, unknown>, value?: unknown) {
    if (typeof keyOrValues === 'string') {
      (this as unknown as Record<string, unknown>)[keyOrValues] = value;
      return this;
    }

    Object.entries(keyOrValues).forEach(([key, nextValue]) => {
      (this as unknown as Record<string, unknown>)[key] = nextValue;
    });

    return this;
  }
}

describe('Character panel helpers', () => {
  it('Setting fontFamily to "Georgia" updates the textbox', () => {
    const textbox = new MockTextbox();

    applyCharacterProperty(textbox, 'fontFamily', 'Georgia');

    expect(textbox.fontFamily).toBe('Georgia');
  });

  it('Setting fontSize to 24 updates the textbox', () => {
    const textbox = new MockTextbox();

    applyCharacterProperty(textbox, 'fontSize', 24);

    expect(textbox.fontSize).toBe(24);
  });

  it('Toggling bold sets fontWeight to "bold" and then "normal"', () => {
    const textbox = new MockTextbox({ fontWeight: 'normal' });

    const firstToggle = toggleCharacterBold(textbox);
    const secondToggle = toggleCharacterBold(textbox);

    expect(firstToggle).toBe('bold');
    expect(secondToggle).toBe('normal');
    expect(textbox.fontWeight).toBe('normal');
  });

  it('Text align center sets textAlign to center', () => {
    const textbox = new MockTextbox({ textAlign: 'left' });

    applyCharacterProperty(textbox, 'textAlign', 'center');

    expect(textbox.textAlign).toBe('center');
  });

  it('Character spacing 100 sets charSpacing to 100', () => {
    const textbox = new MockTextbox({ charSpacing: 0 });

    applyCharacterProperty(textbox, 'charSpacing', 100);

    expect(textbox.charSpacing).toBe(100);
  });

  it('Line height 1.5 sets lineHeight to 1.5', () => {
    const textbox = new MockTextbox({ lineHeight: 1.16 });

    applyCharacterProperty(textbox, 'lineHeight', 1.5);

    expect(textbox.lineHeight).toBe(1.5);
  });

  it('Selecting a bold, italic textbox shows bold+italic toggles as active', () => {
    const textbox = new MockTextbox({ fontWeight: 'bold', fontStyle: 'italic' });

    const panelState = readCharacterPanelState(textbox);

    expect(panelState.isBold).toBe(true);
    expect(panelState.isItalic).toBe(true);
  });
});
