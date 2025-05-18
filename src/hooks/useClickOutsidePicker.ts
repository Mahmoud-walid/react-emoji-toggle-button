import { useEffect, type RefObject } from "react";

interface IProps {
  pickerRef: RefObject<HTMLDivElement | null>;
  onClose: (() => void) | undefined;
}

const useClickOutsidePicker = ({ onClose, pickerRef }: IProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        onClose
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, pickerRef]);
};

export default useClickOutsidePicker;
