import type { Dispatch, SetStateAction } from "react";
import { handleMouseEnter } from "../utils/constants";

interface IProps {
  showEmojiPicker: boolean;
  setShowEmojiPicker: (value: SetStateAction<boolean>) => void;
  setCurrentEmoji: Dispatch<SetStateAction<string>>;
  currentEmoji: string;
  theme?: "dark" | "light";
}

const Button = ({
  currentEmoji,
  setCurrentEmoji,
  setShowEmojiPicker,
  showEmojiPicker,
  theme = "light",
}: IProps) => {
  return (
    <button
      key={showEmojiPicker ? "Close-Picker" : "Open-Picker"}
      aria-label={showEmojiPicker ? "Close-Picker" : "Open-Picker"}
      aria-expanded={showEmojiPicker}
      type="button"
      className={`emoji-button ${
        showEmojiPicker ? "active" : ""
      } emoji-button-theme-${theme}`}
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      onMouseEnter={() =>
        handleMouseEnter({ setCurrentEmoji, showEmojiPicker })
      }
      data-theme={theme}
    >
      {currentEmoji}
    </button>
  );
};

export default Button;
