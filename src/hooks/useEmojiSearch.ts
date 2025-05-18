import { useMemo } from "react";

interface IProps {
  emojiJsonData: EmojiData;
  activeCategory: string;
  searchTerm: string;
  emojisPerRow: number;
  recentEmojis?: Emoji[];
  recentEmojisLabel?: string;
}

const useEmojiSearch = ({
  activeCategory,
  emojiJsonData,
  emojisPerRow,
  searchTerm,
  recentEmojis = [],
  recentEmojisLabel = "Recent",
}: IProps) => {
  const filteredEmojis = useMemo(() => {
    if (activeCategory === recentEmojisLabel) {
      return recentEmojis;
    }

    const categoryData = emojiJsonData.emojis?.[activeCategory];
    if (!categoryData) return [];

    const flat: Emoji[] = [];
    for (const subCat in categoryData) {
      flat.push(...categoryData[subCat]);
    }

    if (!searchTerm.trim()) return flat;

    const lower = searchTerm.toLowerCase();
    return flat.filter(
      (e) => e.name.toLowerCase().includes(lower) || e.emoji.includes(lower)
    );
  }, [
    emojiJsonData,
    activeCategory,
    searchTerm,
    recentEmojis,
    recentEmojisLabel,
  ]);

  const groupedAndFilteredEmojis: ListItem[] = useMemo(() => {
    const result: ListItem[] = [];
    for (let i = 0; i < filteredEmojis.length; i += emojisPerRow) {
      result.push({
        type: "emoji-row",
        emojis: filteredEmojis.slice(i, i + emojisPerRow),
      });
    }
    return result;
  }, [filteredEmojis, emojisPerRow]);

  return { filteredEmojis, groupedAndFilteredEmojis };
};

export default useEmojiSearch;
