import type { Dispatch } from "react";
import type { ThemeConfig } from "../types";

const emojiList = [
  "😀",
  "😎",
  "🥳",
  "😍",
  "🤩",
  "😐",
  "😫",
  "😓",
  "🙂‍↔️",
  "🙂‍↕️",
  "🥹",
  "😖",
  "😞",
  "😵",
  "😰",
  "😭",
  "😂",
  "🥰",
  "😵‍💫",
  "🤣",
  "🤐",
  "🤑",
  "🥵",
  "😡",
  "🤯",
  "😬",
];

const handleMouseEnter = ({
  setCurrentEmoji,
  showEmojiPicker,
}: {
  setCurrentEmoji: Dispatch<React.SetStateAction<string>>;
  showEmojiPicker: boolean;
}) => {
  if (!showEmojiPicker) {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    setCurrentEmoji(emojiList[randomIndex]);
  }
};

export type PickerPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

const getPickerPositionStyle = ({
  position,
  pickerWidth,
  pickerHeight,
}: {
  position: PickerPosition;
  pickerHeight: number;
  pickerWidth: number;
}) => {
  console.log(position, pickerWidth, pickerHeight);

  switch (position) {
    case "top-right":
      return {
        bottom: `calc(100% + ${pickerHeight}px)`,
        right: `-calc(100% + ${pickerWidth}px)`,
      };
    case "top-left":
      return {
        bottom: `calc(100% + ${pickerHeight}px)`,
        right: `calc(100% + ${pickerWidth}px)`,
      };
    case "bottom-right":
      return { top: "100%", right: `-calc(100% + ${pickerWidth}px)` };
    case "bottom-left":
      return { top: "100%", right: `calc(100% + ${pickerWidth}px)` };
    default:
      return { top: "100%", left: "50%", transform: "translateX(-50%)" };
  }
};

// ======================================

const defaultThemeConfig: ThemeConfig = {
  light: {
    backgroundColor: "#fff",
    textColor: "#222",
    borderColor: "#ccc",
    tabActiveBackgroundColor: "#eee",
    tabActiveBorderColor: "#ccc",
    tabHoverBackgroundColor: "#f5f5f5",
    scrollbarThumbColor: "#c1c1c1",
    scrollbarThumbHoverColor: "#a8a8a8",
    inputBorderColor: "#eee",
    boxShadowColor: "rgba(0,0,0,0.1)",
    noResultsTextColor: "#777",
  },
  dark: {
    backgroundColor: "#222",
    textColor: "#f5f5f5",
    borderColor: "#444",
    tabActiveBackgroundColor: "#444",
    tabActiveBorderColor: "#555",
    tabHoverBackgroundColor: "#333",
    scrollbarThumbColor: "#555",
    scrollbarThumbHoverColor: "#666",
    inputBorderColor: "#444",
    boxShadowColor: "rgba(0,0,0,0.3)",
    noResultsTextColor: "#aaa",
  },
};

// ======================================

const insertTextAtCursor = (
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  text: string
) => {
  if (!inputElement) return;
  const start = inputElement.selectionStart || 0;
  const end = inputElement.selectionEnd || 0;
  const value = inputElement.value;
  inputElement.value = value.substring(0, start) + text + value.substring(end);
  inputElement.focus();
  inputElement.setSelectionRange(start + text.length, start + text.length);
  const event = new Event("input", { bubbles: true, cancelable: true });
  inputElement.dispatchEvent(event);
};

const defaultFontFamily =
  '"Twemoji Country Flags", "Helvetica", "Comic Sans", serif';
const defaultEmojisPerRow = 6;
const defaultEmojiItemSize = 40;
const defaultPickerWidth = 320;
const defaultPickerHeight = 420;
const defaultListHeight = 330;

const defaultBadEmojisList = [
  "🖕",
  "🖕🏻",
  "🖕🏼",
  "🖕🏽",
  "🖕🏾",
  "🖕🏿",
  "🫃",
  "🫃🏻",
  "🫃🏼",
  "🫃🏽",
  "🫃🏾",
  "🫃🏿",
  "🫄",
  "🫄🏻",
  "🫄🏼",
  "🫄🏽",
  "🫄🏾",
  "🫄🏿",
  "✡️",
  "⚧️",
  "🇮🇱",
  "🏳️‍🌈",
  "🏳️‍⚧️",
];

const sizeConfig = {
  sm: {
    emojiItemSize: 28,
    pickerWidth: 260,
    pickerHeight: 320,
    listHeight: 220,
  },
  md: {
    emojiItemSize: 36,
    pickerWidth: 320,
    pickerHeight: 380,
    listHeight: 280,
  },
  lg: {
    emojiItemSize: 44,
    pickerWidth: 400,
    pickerHeight: 480,
    listHeight: 370,
  },
};

// =======================================

const categoryEmojiMap: Record<string, string> = {
  "Recent Emojis": "🕒",
  "Smileys & Emotion": "😂",
  "People & Body": "👋",
  Component: "🏽",
  "Animals & Nature": "🐄",
  "Food & Drink": "🍹",
  "Travel & Places": "🚃",
  Activities: "⚽",
  Objects: "🛠️",
  Symbols: "🔅",
  Flags: "🚩",
};

export {
  emojiList,
  handleMouseEnter,
  getPickerPositionStyle,
  defaultThemeConfig,
  insertTextAtCursor,
  defaultFontFamily,
  defaultEmojisPerRow,
  defaultEmojiItemSize,
  defaultPickerWidth,
  defaultPickerHeight,
  defaultListHeight,
  sizeConfig,
  categoryEmojiMap,
  defaultBadEmojisList,
};
