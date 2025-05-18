import { useState, useRef } from "react";

const useEmojiPickerButtonState = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState("😀");
  const pickerRef = useRef<HTMLDivElement>(null);
  return {
    showEmojiPicker,
    setShowEmojiPicker,
    currentEmoji,
    setCurrentEmoji,
    pickerRef,
  };
};

export default useEmojiPickerButtonState;
