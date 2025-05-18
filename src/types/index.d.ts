interface Emoji {
  code: string[];
  emoji: string;
  name: string;
  skinToneVariants?: Emoji[];
  hasSkinTones?: boolean;
}
interface EmojiSubCategory {
  [subCategoryName: string]: Emoji[];
}
interface EmojiCategory {
  [categoryName: string]: EmojiSubCategory;
}
interface EmojiData {
  emojis: EmojiCategory;
}

// ==============================

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

// ==============================

// EmojiInputPicker.tsx

// Styles interfaces
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

// =================================

type ListItem =
  | { type: "category"; name: string }
  | { type: "emoji-row"; emojis: Emoji[] };

type EmojiPickerSizes = {
  pickerWidth?: number;
  pickerHeight?: number;
  emojiItemSize?: number;
  listHeight?: number;
  emojisPerRow?: number;
};
