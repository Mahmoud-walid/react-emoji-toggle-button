import { useEffect, type RefObject, type SetStateAction } from "react";

interface IProps {
  pickerRef: RefObject<HTMLDivElement | null>;
  showSkinToneVariants: boolean;
  setLongPressEmoji: (value: SetStateAction<Emoji | null>) => void;
}

const useResetLongPressEmoji = ({
  pickerRef,
  setLongPressEmoji,
  showSkinToneVariants,
}: IProps) => {
  useEffect(() => {
    if (!pickerRef.current) return;
    if (!showSkinToneVariants) {
      setLongPressEmoji(null);
    }
  }, [showSkinToneVariants, pickerRef, setLongPressEmoji]);
};

export default useResetLongPressEmoji;
