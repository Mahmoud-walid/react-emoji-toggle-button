import { useLayoutEffect, useState, type RefObject } from "react";

const usePickerSize = ({
  pickerRef,
  showEmojiPicker,
}: {
  showEmojiPicker: boolean;
  pickerRef: RefObject<HTMLDivElement | null>;
}) => {
  const [pickerSize, setPickerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (showEmojiPicker && pickerRef.current) {
      const { offsetWidth, offsetHeight } = pickerRef.current;
      setPickerSize({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [showEmojiPicker, pickerRef]);

  return { pickerSize };
};

export default usePickerSize;
