import { createRef, type CSSProperties } from "react";

interface IProps {
  item: ListItem;
  emojisPerRow: number;
  style: CSSProperties;
  styles: EmojiPickerStyles;
  classNames: EmojiPickerClassNames;
  emojiItemSize: number;
  handleEmojiClick: (emoji: string, emojiObj?: Emoji) => void;
  handleEmojiMouseDown: (emoji: Emoji, event: React.MouseEvent) => void;
  handleEmojiMouseUp: () => void;
  handleEmojiMouseLeave: () => void;
  onEmojiButtonLongPress?: (buttonRect: DOMRect) => void;
  fontFamily: string;
}

const EmojiInputPickerRow = ({
  classNames,
  emojiItemSize,
  fontFamily,
  handleEmojiClick,
  handleEmojiMouseDown,
  handleEmojiMouseLeave,
  handleEmojiMouseUp,
  onEmojiButtonLongPress,
  item,
  emojisPerRow,
  style,
  styles,
}: IProps) => {
  if (item.type !== "emoji-row") return null;

  // Calculate the number of empty items required
  const emptySlots = emojisPerRow - item.emojis.length;

  return (
    <div
      style={{ ...style, display: "flex", height: emojiItemSize }}
      className={classNames.emojiRow}
    >
      {/* View available emojis */}
      {item.emojis.map((emoji) => {
        const btnRef = createRef<HTMLButtonElement>();
        return (
          <button
            ref={btnRef}
            key={emoji.name + emoji.code.join("")}
            onClick={() => handleEmojiClick(emoji.emoji, emoji)}
            onMouseDown={(e) => {
              handleEmojiMouseDown(emoji, e);
              if (emoji.hasSkinTones && onEmojiButtonLongPress) {
                setTimeout(() => {
                  if (btnRef.current) {
                    onEmojiButtonLongPress(
                      btnRef.current.getBoundingClientRect()
                    );
                  }
                }, 500);
              }
            }}
            onMouseUp={handleEmojiMouseUp}
            onMouseLeave={handleEmojiMouseLeave}
            title={emoji.name}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              margin: "2px 2px",
              padding: "0px",
              cursor: "pointer",
              flex: 1,
              textAlign: "center",
              position: "relative",
              fontFamily,
              ...styles.emojiButton,
            }}
            className={classNames.emojiButton}
          >
            {emoji.emoji}
            {/* إضافة مؤشر لوجود متغيرات ألوان البشرة */}
            {emoji.hasSkinTones && (
              <span
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#888",
                  borderRadius: "50%",
                }}
              />
            )}
          </button>
        );
      })}

      {/* Add empty elements to fill the rest of the row */}
      {Array.from({ length: emptySlots }).map((_, i) => (
        <div
          key={`empty-slot-${i}`}
          className={classNames.emojiButton}
          style={{
            flex: 1,
            margin: "2px 2px",
            padding: "0px",
            // backgroundColor: "green",
          }}
        ></div>
      ))}
    </div>
  );
};

export default EmojiInputPickerRow;
