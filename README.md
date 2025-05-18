Here's a professional and comprehensive documentation update for your `README.md`, including a detailed table of all `EmojiPickerButton` props, their types, descriptions, and default values.

---

## Live Demo

You can try the Emoji Picker Button live here: [Demo](https://mahmoud-walid.github.io/react-emoji-picker-button/)

---

## EmojiPickerButton Props

The `EmojiPickerButton` component is highly customizable. Below is a table describing all available props, their types, default values, and descriptions:

| Prop Name              | Type                                                           | Default Value          | Description                                                                  |
| ---------------------- | -------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `textInputRef`         | `RefObject<HTMLInputElement \| HTMLTextAreaElement \| null>`   | **Required**           | Reference to the input or textarea element where the emoji will be inserted. |
| `classNames`           | `EmojiPickerClassNames`                                        | `{}`                   | Custom CSS class names for different parts of the picker.                    |
| `config`               | `EmojiPickerConfig`                                            | `{}`                   | Advanced configuration options for the picker (see below for details).       |
| `initialCategory`      | `string`                                                       | `undefined`            | The category to be active initially when the picker opens.                   |
| `onEmojiSelect`        | `(emoji: string) => void`                                      | `undefined`            | Callback function triggered when an emoji is selected.                       |
| `styles`               | `EmojiPickerStyles`                                            | `{}`                   | Custom inline styles for different parts of the picker.                      |
| `position`             | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"top-left"`           | Position of the emoji picker relative to the button.                         |
| `theme`                | `"light" \| "dark"`                                            | `"light"`              | Theme of the picker (light or dark).                                         |
| `themeConfig`          | `ThemeConfig`                                                  | `defaultThemeConfig`   | Custom theme configuration for light, dark, or custom themes.                |
| `lang`                 | `"en" \| "ar"`                                                 | `"en"`                 | Language for the picker UI (English or Arabic).                              |
| `enableRecentEmojis`   | `boolean`                                                      | `true`                 | Enable or disable tracking and showing recent emojis.                        |
| `sizes`                | `EmojiPickerSizes`                                             | `{}`                   | Custom size configuration for the picker (overrides default sizes).          |
| `size`                 | `"sm" \| "md" \| "lg"`                                         | `"md"`                 | Predefined size for the picker (small, medium, large).                       |
| `enableTabsTitleEmoji` | `boolean`                                                      | `true`                 | Show emoji icons in the category tabs.                                       |
| `preventBadEmojis`     | `boolean`                                                      | `true`                 | Filter out a predefined list of unwanted emojis.                             |
| `badEmojiList`         | `string[]`                                                     | `defaultBadEmojisList` | Custom list of emojis to filter out (overrides the default list).            |

### Types Reference

- **EmojiPickerClassNames**: Custom class names for styling (see below for structure).
- **EmojiPickerConfig**: Advanced configuration options for the picker (see below for structure).
- **EmojiPickerStyles**: Custom inline styles for different picker parts (see below for structure).
- **ThemeConfig**: Theme color configuration for light, dark, and custom themes.
- **EmojiPickerSizes**: Size configuration for the picker.

#### EmojiPickerClassNames

```typescript
interface EmojiPickerClassNames {
  container?: string;
  tabs?: string;
  tabButton?: string;
  activeTabButton?: string;
  searchInput?: string;
  emojiList?: string;
  emojiButton?: string;
  noResultsMessage?: string;
  emojiRow?: string;
}
```

#### EmojiPickerStyles

```typescript
interface EmojiPickerStyles {
  container?: CSSProperties;
  tabs?: CSSProperties;
  tabButton?: CSSProperties;
  activeTabButton?: CSSProperties;
  searchInput?: CSSProperties;
  emojiList?: CSSProperties;
  emojiButton?: CSSProperties;
  noResultsMessage?: CSSProperties;
}
```

#### EmojiPickerConfig

```typescript
interface EmojiPickerConfig {
  emojisPerRow?: number;
  emojiItemSize?: number;
  pickerWidth?: number | string;
  pickerHeight?: number | string;
  listHeight?: number;
  fontFamily?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  applyEmojiFont?: boolean;
  themeConfig?: ThemeConfig;
  enableRecentEmojis?: boolean;
  recentEmojisLabel?: string;
}
```

#### EmojiPickerSizes

```typescript
type EmojiPickerSizes = {
  pickerWidth?: number;
  pickerHeight?: number;
  emojiItemSize?: number;
  listHeight?: number;
  emojisPerRow?: number;
};
```

#### ThemeConfig

```typescript
interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  tabActiveBackgroundColor: string;
  tabActiveBorderColor: string;
  tabHoverBackgroundColor: string;
  scrollbarThumbColor: string;
  scrollbarThumbHoverColor: string;
  inputBorderColor: string;
  boxShadowColor: string;
  noResultsTextColor: string;
}

interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  custom?: Record<string, ThemeColors>;
}
```

## License

MIT
