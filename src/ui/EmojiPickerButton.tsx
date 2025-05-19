import EmojiInputPicker from "./EmojiInputPicker";
import { type RefObject } from "react";
// import emojiData from "../data/categories.with.modifiers.json";
import {
  defaultBadEmojisList,
  defaultThemeConfig,
  getPickerPositionStyle,
  sizeConfig,
  type PickerPosition,
} from "../utils/constants";
import useCountryFlagEmojiPolyfill from "../hooks/useCountryFlagEmojiPolyfill";
import usePickerSize from "../hooks/usePickerSize";
import Button from "./Button";
import useEmojiData from "../hooks/useEmojiData";
import useInputPlaceholderAndDir from "../hooks/useInputPlaceholderAndDir";
import useEmojiPickerButtonState from "../hooks/useEmojiPickerButtonState";
import type {
  EmojiPickerClassNames,
  EmojiPickerConfig,
  EmojiPickerSizes,
  EmojiPickerStyles,
  ThemeConfig,
} from "../types";
import GlobalStyles from "./GlobalStyles";

interface IProps {
  textInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  classNames?: EmojiPickerClassNames;
  config?: EmojiPickerConfig;
  initialCategory?: string;
  onEmojiSelect?: (emoji: string) => void;
  styles?: EmojiPickerStyles;
  position?: PickerPosition;
  theme?: "dark" | "light";
  themeConfig?: ThemeConfig;
  lang?: "ar" | "en";
  enableRecentEmojis?: boolean;
  sizes?: EmojiPickerSizes;
  size?: "sm" | "md" | "lg";
  enableTabsTitleEmoji?: boolean;
  preventBadEmojis?: boolean;
  badEmojiList?: string[];
}

const EmojiPickerButton = ({
  textInputRef,
  classNames,
  config,
  initialCategory,
  onEmojiSelect,
  styles,
  position = "top-left",
  theme = "light",
  themeConfig = defaultThemeConfig,
  lang = "en",
  enableRecentEmojis = true,
  sizes = {},
  size = "md",
  enableTabsTitleEmoji = true,
  preventBadEmojis = true,
  badEmojiList = defaultBadEmojisList,
}: IProps) => {
  const {
    currentEmoji,
    pickerRef,
    setCurrentEmoji,
    setShowEmojiPicker,
    showEmojiPicker,
  } = useEmojiPickerButtonState();

  useCountryFlagEmojiPolyfill();

  const { pickerSize } = usePickerSize({ pickerRef, showEmojiPicker });
  const mergedConfig: EmojiPickerConfig = {
    ...config,
    themeConfig,
    enableRecentEmojis,
    ...sizes,
    ...sizeConfig[size],
  };

  const { emojiData, isLoading } = useEmojiData({ lang, showEmojiPicker });

  console.log("isLoading", isLoading);

  useInputPlaceholderAndDir({ lang, textInputRef });

  return (
    <>
      <GlobalStyles />
      <div
        className={`emoji-picker-container emoji-picker-theme-${theme}`}
        style={{
          fontFamily:
            '"Twemoji Country Flags", "Helvetica", "Comic Sans", serif',
        }}
        data-theme={theme}
      >
        <Button
          currentEmoji={currentEmoji}
          setCurrentEmoji={setCurrentEmoji}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          theme={theme}
        />
        {showEmojiPicker && (
          <div
            className={`emoji-picker-wrapper emoji-picker-position-${position} emoji-picker-theme-${theme}`}
            style={{
              position: "absolute",
              ...getPickerPositionStyle({
                position,
                pickerHeight: pickerSize.height,
                pickerWidth: pickerSize.width,
              }),
            }}
            data-theme={theme}
          >
            <EmojiInputPicker
              isLoading={isLoading}
              classNames={classNames}
              config={mergedConfig}
              initialCategory={initialCategory}
              onEmojiSelect={onEmojiSelect}
              styles={styles}
              inputRef={
                textInputRef as RefObject<
                  HTMLInputElement | HTMLTextAreaElement
                >
              }
              emojiJsonData={emojiData}
              onClose={() => setShowEmojiPicker(false)}
              pickerRef={pickerRef}
              theme={theme}
              lang={lang}
              enableTabsTitleEmoji={enableTabsTitleEmoji}
              preventBadEmojis={preventBadEmojis}
              badEmojiList={badEmojiList}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EmojiPickerButton;
