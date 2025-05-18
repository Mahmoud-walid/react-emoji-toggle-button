import { useEffect, useState } from "react";

const useEmojiData = ({
  lang,
  showEmojiPicker,
}: {
  lang: "en" | "ar";
  showEmojiPicker: boolean;
}) => {
  const [emojiData, setEmojiData] = useState<EmojiData>({ emojis: {} });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // وظيفة لمعالجة الإيموجيز ذات ألوان البشرة
  const processSkinToneEmojis = (data: EmojiData): EmojiData => {
    const processedData = { ...data };

    // المرور على جميع الفئات والفئات الفرعية
    Object.keys(processedData.emojis).forEach((categoryName) => {
      const category = processedData.emojis[categoryName];

      Object.keys(category).forEach((subCategoryName) => {
        const subCategory = category[subCategoryName];
        const processedSubCategory: Emoji[] = [];

        // تجميع الإيموجيز حسب الاسم الأساسي (بدون skin tone)
        const skinToneGroups: Record<string, Emoji[]> = {};

        subCategory.forEach((emoji) => {
          if (emoji.name.includes("skin tone")) {
            const baseName = emoji.name.split(":")[0].trim();
            if (!skinToneGroups[baseName]) {
              skinToneGroups[baseName] = [];
            }
            skinToneGroups[baseName].push(emoji);
          } else {
            // This is the base emoji (no skin tone)
            if (!skinToneGroups[emoji.name]) {
              skinToneGroups[emoji.name] = [];
            }
            skinToneGroups[emoji.name].unshift(emoji); // Always put base emoji at the start
          }
        });

        Object.keys(skinToneGroups).forEach((baseName) => {
          const variants = skinToneGroups[baseName];
          if (variants.length > 1) {
            // Has skin tone variants
            const mainEmoji = {
              ...variants[0],
              skinToneVariants: variants,
              hasSkinTones: true,
            };
            processedSubCategory.push(mainEmoji);
          } else {
            // Only one variant (no skin tones)
            processedSubCategory.push(variants[0]);
          }
        });

        // تحديث الفئة الفرعية بالقائمة المعالجة
        category[subCategoryName] = processedSubCategory;
      });
    });

    return processedData;
  };

  useEffect(() => {
    if (!showEmojiPicker) return;
    const load = async () => {
      setIsLoading(true);
      const module = await import(
        `../data/categories.with.modifiers${lang === "ar" ? "-ar" : ""}.json`
      );
      // معالجة الإيموجيز ذات ألوان البشرة
      const processedData = processSkinToneEmojis(module.default as EmojiData);
      setEmojiData(processedData);
      setIsLoading(false);
    };
    load();
  }, [lang, showEmojiPicker]);

  return { emojiData, isLoading };
};

export default useEmojiData;
