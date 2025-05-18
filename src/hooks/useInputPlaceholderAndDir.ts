import { useEffect, type RefObject } from "react";

const useInputPlaceholderAndDir = ({
  lang,
  textInputRef,
}: {
  textInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  lang: "en" | "ar";
}) => {
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.dir = lang === "en" ? "ltr" : "rtl";
      textInputRef.current.placeholder =
        lang === "en" ? "Type a message..." : "اكتب رسالة...";
    }
  }, [lang, textInputRef]);
};

export default useInputPlaceholderAndDir;
