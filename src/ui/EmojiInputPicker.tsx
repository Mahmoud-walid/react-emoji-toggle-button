import { useState, useMemo } from "react";
import type { CSSProperties, RefObject } from "react";
import { FixedSizeList as List } from "react-window";
import useCountryFlagEmojiPolyfill from "../hooks/useCountryFlagEmojiPolyfill";
import {
  categoryEmojiMap,
  defaultEmojiItemSize,
  defaultEmojisPerRow,
  defaultFontFamily,
  defaultListHeight,
  defaultPickerHeight,
  defaultPickerWidth,
  defaultThemeConfig,
  insertTextAtCursor,
} from "../utils/constants";
import Spinner from "./Spinner";
import useHorizontalSmoothScroll from "../hooks/useHorizontalSmoothScroll";
import useEmojiSearch from "../hooks/useEmojiSearch";
import useSkinToneVariants from "../hooks/useSkinToneVariants";
import useClickOutsideSkinToneVariants from "../hooks/useClickOutsideSkinToneVariants";
import useClickOutsidePicker from "../hooks/useClickOutsidePicker";
import useInitialActiveCategory from "../hooks/useInitialActiveCategory";
import useResetLongPressEmoji from "../hooks/useResetLongPressEmoji";
import EmojiInputPickerRow from "./EmojiInputPickerRow";
import useRecentEmojis from "../hooks/useRecentEmojis";

interface IProps {
  isLoading: boolean;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  pickerRef: RefObject<HTMLDivElement | null>;
  emojiJsonData: EmojiData;
  onClose?: () => void;
  onEmojiSelect?: (emoji: string) => void;
  styles?: EmojiPickerStyles;
  classNames?: EmojiPickerClassNames;
  config?: EmojiPickerConfig;
  initialCategory?: string;
  theme?: "dark" | "light";
  lang?: "ar" | "en";
  enableTabsTitleEmoji?: boolean;
  preventBadEmojis?: boolean;
  badEmojiList?: string[];
}

const EmojiInputPicker = ({
  inputRef,
  isLoading,
  pickerRef,
  emojiJsonData,
  onClose,
  onEmojiSelect,
  styles = {},
  classNames = {},
  config = {},
  initialCategory,
  theme = "light",
  lang = "en",
  enableTabsTitleEmoji = true,
  preventBadEmojis = true,
  badEmojiList = [],
}: IProps) => {
  // Configuration with defaults
  const {
    emojisPerRow = defaultEmojisPerRow,
    emojiItemSize = defaultEmojiItemSize,
    pickerWidth = defaultPickerWidth,
    pickerHeight = defaultPickerHeight,
    listHeight = defaultListHeight,
    fontFamily = defaultFontFamily,
    searchPlaceholder = lang === "en"
      ? "Search emojis..."
      : "إبحث عن ايموجي...",
    noResultsMessage = lang === "en" ? "No emojis found." : "لا يوجد ايموجي",
    applyEmojiFont = true,
    themeConfig = defaultThemeConfig,
    enableRecentEmojis = true,
    recentEmojisLabel = lang === "en" ? "Recent Emojis" : "ايموجي حديثا",
  } = config;

  const { addRecentEmoji, recentEmojis } = useRecentEmojis(enableRecentEmojis);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || ""
  );

  const [skinToneMenuPos, setSkinToneMenuPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleEmojiButtonLongPress = (rect: DOMRect) => {
    // Adjust for scroll and picker offset if needed
    setSkinToneMenuPos({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const {
    handleEmojiMouseDown,
    handleEmojiMouseLeave,
    handleEmojiMouseUp,
    longPressEmoji,
    setLongPressEmoji,
    setShowSkinToneVariants,
    showSkinToneVariants,
    skinToneVariantsRef,
  } = useSkinToneVariants();

  useClickOutsideSkinToneVariants({
    onClose,
    pickerRef,
    setLongPressEmoji,
    setShowSkinToneVariants,
    showSkinToneVariants,
    skinToneVariantsRef,
  });

  useResetLongPressEmoji({
    pickerRef,
    setLongPressEmoji,
    showSkinToneVariants,
  });

  console.log("picker width: ", pickerRef.current?.offsetWidth);
  console.log("picker height: ", pickerRef.current?.offsetHeight);

  const filteredEmojiJsonData = useMemo(() => {
    if (!preventBadEmojis) return emojiJsonData;
    const filtered = { ...emojiJsonData };
    filtered.emojis = Object.fromEntries(
      Object.entries(emojiJsonData.emojis || {}).map(([cat, subCategories]) => [
        cat,
        Object.fromEntries(
          Object.entries(subCategories).map(([subCat, emojis]) => [
            subCat,
            (emojis as Emoji[]).filter(
              (emoji: Emoji) => !badEmojiList.includes(emoji.emoji)
            ),
          ])
        ),
      ])
    );
    return filtered;
  }, [emojiJsonData, preventBadEmojis, badEmojiList]);

  const allCategories = useMemo(() => {
    const categories = Object.keys(filteredEmojiJsonData.emojis || {});
    return enableRecentEmojis && recentEmojis.length > 0
      ? [recentEmojisLabel, ...categories]
      : categories;
  }, [
    filteredEmojiJsonData,
    enableRecentEmojis,
    recentEmojis.length,
    recentEmojisLabel,
  ]);

  useCountryFlagEmojiPolyfill();

  const { containerRef } = useHorizontalSmoothScroll();

  useInitialActiveCategory({
    activeCategory,
    allCategories,
    setActiveCategory,
  });

  const { groupedAndFilteredEmojis } = useEmojiSearch({
    activeCategory,
    emojiJsonData: preventBadEmojis ? filteredEmojiJsonData : emojiJsonData,
    emojisPerRow,
    searchTerm,
    recentEmojis,
    recentEmojisLabel: lang === "en" ? "Recent Emojis" : "ايموجي حديثا",
  });

  const handleEmojiClick = (emoji: string, emojiObj?: Emoji) => {
    if (onEmojiSelect) {
      onEmojiSelect(emoji);
    }

    if (inputRef.current) {
      insertTextAtCursor(inputRef.current, emoji);
      if (applyEmojiFont) {
        inputRef.current.style.fontFamily = fontFamily;
      }
    }

    if (enableRecentEmojis && emojiObj) {
      addRecentEmoji(emojiObj);
    }

    // if (onClose) {
    //   onClose();
    // }
  };

  useClickOutsidePicker({ onClose, pickerRef });

  const RowRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const item = groupedAndFilteredEmojis[index];
    return (
      <EmojiInputPickerRow
        classNames={classNames}
        emojiItemSize={emojiItemSize}
        emojisPerRow={emojisPerRow}
        fontFamily={fontFamily}
        handleEmojiClick={handleEmojiClick}
        handleEmojiMouseDown={handleEmojiMouseDown}
        handleEmojiMouseLeave={handleEmojiMouseLeave}
        handleEmojiMouseUp={handleEmojiMouseUp}
        onEmojiButtonLongPress={handleEmojiButtonLongPress}
        item={item}
        style={style}
        styles={styles}
      />
    );
  };

  const getThemeColors = (): ThemeColors => {
    if (theme === "light" || theme === "dark") {
      return themeConfig[theme];
    } else if (themeConfig.custom && themeConfig.custom[theme]) {
      return themeConfig.custom[theme];
    }
    return themeConfig.light; // Default fallback
  };

  const themeColors = getThemeColors();

  // Default container styles
  const containerStyles: CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    width: pickerWidth,
    height: pickerHeight,
    backgroundColor: themeColors.backgroundColor,
    color: themeColors.textColor,
    boxShadow: `0 4px 12px ${themeColors.boxShadowColor}`,
    position: "absolute",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    fontFamily,
    ...styles.container,
  };

  // Default tabs styles
  const tabsStyles: CSSProperties = {
    display: "flex",
    marginBottom: "8px",
    overflowX: "auto",
    fontFamily,
    ...styles.tabs,
  };

  // Default tab button styles
  const tabButtonStyles = (isActive: boolean): CSSProperties => ({
    flexShrink: 0,
    padding: "6px 10px",
    marginRight: "4px",
    backgroundColor: isActive
      ? themeColors.tabActiveBackgroundColor
      : "transparent",
    color: themeColors.textColor,
    border: `1px solid ${
      isActive ? themeColors.tabActiveBorderColor : themeColors.borderColor
    }`,
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: isActive ? "bold" : "normal",
    fontSize: "1rem",
    whiteSpace: "nowrap",
    ...(isActive ? styles.activeTabButton : styles.tabButton),
  });

  // Default search input styles
  const searchInputStyles: CSSProperties = {
    width: "90%",
    padding: "8px",
    marginBottom: "8px",
    border: `"1px solid ${themeColors.inputBorderColor}`,
    borderRadius: "4px",
    backgroundColor: themeColors.backgroundColor,
    color: themeColors.textColor,
    ...styles.searchInput,
  };

  // Default no results message styles
  const noResultsStyles: CSSProperties = {
    textAlign: "center",
    color: themeColors.noResultsTextColor,
    flexGrow: 1,
    ...styles.noResultsMessage,
  };

  return (
    <div
      ref={pickerRef}
      style={containerStyles}
      className={`${classNames.container || ""} emoji-picker-theme-${theme}`}
      data-theme={theme}
      data-lang={lang}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      {/* Tabs */}
      <div style={tabsStyles} className={classNames.tabs} ref={containerRef}>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={tabButtonStyles(cat === activeCategory)}
            className={
              cat === activeCategory
                ? classNames.activeTabButton
                : classNames.tabButton
            }
          >
            {enableTabsTitleEmoji && categoryEmojiMap[cat]
              ? categoryEmojiMap[cat]
              : cat}
          </button>
        ))}
      </div>
      {/* Search */}
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyles}
        className={classNames.searchInput}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div style={noResultsStyles}>
          <Spinner />
        </div>
      )}

      {/* Emoji List */}
      {groupedAndFilteredEmojis.length === 0 && !isLoading && (
        <div style={noResultsStyles} className={classNames.noResultsMessage}>
          {noResultsMessage}
        </div>
      )}

      {/* قائمة متغيرات ألوان البشرة */}
      {showSkinToneVariants &&
        longPressEmoji &&
        longPressEmoji.skinToneVariants && (
          <div
            ref={skinToneVariantsRef}
            style={{
              position: "absolute",
              zIndex: 1001,
              backgroundColor: themeColors.backgroundColor,
              border: `1px solid ${themeColors.borderColor}`,
              borderRadius: "8px",
              padding: "8px",
              boxShadow: `0 4px 12px ${themeColors.boxShadowColor}`,
              display: "flex",
              flexDirection: "row",
              top: skinToneMenuPos ? `${skinToneMenuPos.top}px` : "50%",
              left: "50%",
              transform: "translate(-50%, -190%)",
            }}
          >
            {longPressEmoji.skinToneVariants.map((variant, index) => (
              <button
                key={`skin-tone-variant-${index}${
                  variant.name + variant.code.join("-")
                }`}
                onClick={() => {
                  handleEmojiClick(variant.emoji);
                  setShowSkinToneVariants(false);
                }}
                title={variant.name}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.4rem",
                  margin: "2px 8px",
                  padding: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontFamily,
                }}
              >
                {variant.emoji}
              </button>
            ))}
          </div>
        )}

      {groupedAndFilteredEmojis.length !== 0 && !isLoading && (
        <List
          height={listHeight}
          itemCount={groupedAndFilteredEmojis.length}
          itemSize={emojiItemSize}
          width="100%"
          style={styles.emojiList}
          className={classNames.emojiList}
        >
          {RowRenderer}
        </List>
      )}
    </div>
  );
};

export default EmojiInputPicker;
