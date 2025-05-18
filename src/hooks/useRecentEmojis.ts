import { useState, useEffect } from "react";

const RECENT_EMOJIS_KEY = "recent-emojis";
const MAX_RECENT_EMOJIS = 36; // Adjust as needed

const useRecentEmojis = (enabled: boolean = true) => {
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);

  // Load recent emojis from localStorage on component mount
  useEffect(() => {
    if (!enabled) return;

    try {
      const storedEmojis = localStorage.getItem(RECENT_EMOJIS_KEY);
      if (storedEmojis) {
        setRecentEmojis(JSON.parse(storedEmojis));
      }
    } catch (error) {
      console.error("Error loading recent emojis:", error);
    }
  }, [enabled]);

  // Add emoji to recent list
  const addRecentEmoji = (emoji: Emoji) => {
    if (!enabled) return;

    setRecentEmojis((prevEmojis) => {
      // Remove the emoji if it already exists to avoid duplicates
      const filteredEmojis = prevEmojis.filter((e) => e.emoji !== emoji.emoji);

      // Add the new emoji at the beginning
      const newEmojis = [emoji, ...filteredEmojis].slice(0, MAX_RECENT_EMOJIS);

      // Save to localStorage
      try {
        localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(newEmojis));
      } catch (error) {
        console.error("Error saving recent emojis:", error);
      }

      return newEmojis;
    });
  };

  return { recentEmojis, addRecentEmoji };
};

export default useRecentEmojis;
