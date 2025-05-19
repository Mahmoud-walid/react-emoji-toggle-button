import { useEffect, type RefObject, type SetStateAction } from "react";
import type { Emoji } from "../types";

interface IProps {
  pickerRef: RefObject<HTMLDivElement | null>;
  skinToneVariantsRef: RefObject<HTMLDivElement | null>;
  showSkinToneVariants: boolean;
  setShowSkinToneVariants: (value: SetStateAction<boolean>) => void;
  setLongPressEmoji: (value: SetStateAction<Emoji | null>) => void;
  onClose: (() => void) | undefined;
}

const useClickOutsideSkinToneVariants = ({
  onClose,
  pickerRef,
  setLongPressEmoji,
  setShowSkinToneVariants,
  showSkinToneVariants,
  skinToneVariantsRef,
}: IProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const picker = pickerRef.current;
      const skinTones = skinToneVariantsRef.current;
      const target = event.target as Node;

      if (skinTones && skinTones.contains(target)) {
        // Clicked inside skin tone variants, do nothing
        return;
      }
      if (showSkinToneVariants && picker && picker.contains(target)) {
        // Clicked inside picker but outside skin tone variants: close only skin tone variants
        setShowSkinToneVariants(false);
        setLongPressEmoji(null);
        return;
      }
      if (picker && !picker.contains(target)) {
        // Clicked outside picker: close everything
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    onClose,
    pickerRef,
    showSkinToneVariants,
    setLongPressEmoji,
    setShowSkinToneVariants,
    skinToneVariantsRef,
  ]);
};

export default useClickOutsideSkinToneVariants;
