import { useEffect } from "react";
import { polyfillCountryFlagEmojis } from "../libs/country-flag-emoji-polyfill";

const useCountryFlagEmojiPolyfill = () => {
  useEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);
};

export default useCountryFlagEmojiPolyfill;
