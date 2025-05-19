import { useRef, useState } from "react";
import type { Emoji } from "../types";

const useSkinToneVariants = () => {
  const [longPressEmoji, setLongPressEmoji] = useState<Emoji | null>(null);
  const [showSkinToneVariants, setShowSkinToneVariants] =
    useState<boolean>(false);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const skinToneVariantsRef = useRef<HTMLDivElement | null>(null);

  const handleEmojiMouseDown = (emoji: Emoji, event: React.MouseEvent) => {
    if (emoji.hasSkinTones && emoji.skinToneVariants) {
      event.preventDefault();
      longPressTimeoutRef.current = setTimeout(() => {
        setLongPressEmoji(emoji);
        setShowSkinToneVariants(true);
      }, 500); // 500 مللي ثانية للضغط المطول
    }
  };

  // وظيفة للتعامل مع إنهاء الضغط المطول
  const handleEmojiMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  // وظيفة للتعامل مع الخروج من منطقة الإيموجي
  const handleEmojiMouseLeave = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };

  return {
    longPressEmoji,
    setLongPressEmoji,
    showSkinToneVariants,
    setShowSkinToneVariants,
    longPressTimeoutRef,
    skinToneVariantsRef,
    handleEmojiMouseDown,
    handleEmojiMouseUp,
    handleEmojiMouseLeave,
  };
};

export default useSkinToneVariants;
