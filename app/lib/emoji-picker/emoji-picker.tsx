import React, { useState, useCallback, useMemo } from "react";
import data from "@emoji-mart/data";

interface EmojiSkin {
  unified: string;
  native: string;
}

interface EmojiData {
  id: string;
  name: string;
  skins: EmojiSkin[];
  keywords?: string[];
  version: number;
}

interface CategoryMeta {
  id: string;
  name: string;
  emoji: string;
}

interface SelectedEmoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords?: string[];
}

interface EmojiPickerProps {
  onEmojiSelect?: (emoji: SelectedEmoji) => void;
  theme?: "light" | "dark";
  locale?: "pt" | "en";
  navPosition?: "bottom" | "top";
  categories?: string[];
}

const DEFAULT_CATEGORIES = [
  "people",
  "nature",
  "foods",
  "activity",
  "places",
  "objects",
  "symbols",
  "flags",
] as const;

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  theme = "light",
  locale = "pt",
  navPosition = "bottom",
  categories = DEFAULT_CATEGORIES,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const emojisByCategory = useMemo(() => {
    const result: { [key: string]: EmojiData[] } = {};

    categories.forEach((categoryId) => {
      const categoryData = (data as any).categories.find(
        (c: any) => c.id === categoryId,
      );
      if (categoryData && categoryData.emojis) {
        result[categoryId] = categoryData.emojis
          .map((emojiId: string) => {
            const emoji = (data as any).emojis[emojiId];
            return emoji ? { id: emojiId, ...emoji } : null;
          })
          .filter(
            (emoji: EmojiData | null): emoji is EmojiData => emoji !== null,
          );
      }
    });

    return result;
  }, [categories]);

  const categoryMeta = useMemo<CategoryMeta[]>(
    () =>
      categories.map((categoryId) => {
        const categoryData = (data as any).categories.find(
          (c: any) => c.id === categoryId,
        );
        const firstEmojiId = categoryData?.emojis?.[0];
        const emojiData = firstEmojiId
          ? (data as any).emojis[firstEmojiId]
          : null;

        return {
          id: categoryId,
          name: categoryData?.name || categoryId,
          emoji: emojiData?.skins?.[0]?.native || "😀",
        };
      }),
    [categories],
  );

  const getSearchResults = useCallback((term: string): EmojiData[] => {
    if (!term) return [];

    const searchLower = term.toLowerCase();
    const results = new Set<EmojiData>();

    Object.entries((data as any).emojis).forEach(
      ([id, emoji]: [string, any]) => {
        if (emoji.name.toLowerCase().includes(searchLower)) {
          results.add({ id, ...emoji });
          return;
        }

        if (
          emoji.keywords?.some((keyword: string) =>
            keyword.toLowerCase().includes(searchLower),
          )
        ) {
          results.add({ id, ...emoji });
          return;
        }

        const aliases = Object.entries((data as any).aliases || {})
          .filter(([_, value]) => value === id)
          .map(([key]) => key);

        if (
          aliases.some((alias) => alias.toLowerCase().includes(searchLower))
        ) {
          results.add({ id, ...emoji });
        }
      },
    );

    return Array.from(results);
  }, []);

  const filteredEmojis = useMemo(() => {
    if (searchTerm) {
      return getSearchResults(searchTerm);
    }
    return emojisByCategory[selectedCategory] || [];
  }, [searchTerm, selectedCategory, emojisByCategory, getSearchResults]);

  const handleEmojiClick = useCallback(
    (emoji: EmojiData) => {
      if (onEmojiSelect) {
        const selectedEmoji: SelectedEmoji = {
          id: emoji.id,
          name: emoji.name,
          native: emoji.skins[0].native,
          unified: emoji.skins[0].unified,
          keywords: emoji.keywords,
        };
        onEmojiSelect(selectedEmoji);
      }
    },
    [onEmojiSelect],
  );

  const translations: Record<"search", Record<"pt" | "en", string>> = {
    search: {
      pt: "Pesquisar emoji...",
      en: "Search emoji...",
    },
  };

  return (
    <div
      className={`w-72 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder={translations.search[locale]}
          className={`w-full px-3 py-2 rounded-md ${
            theme === "dark"
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-gray-100 placeholder-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-48 overflow-y-auto p-2">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji) => (
            <button
              key={emoji.id}
              onClick={() => handleEmojiClick(emoji)}
              className={`p-1 rounded cursor-pointer text-xl transition-colors ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title={emoji.name}
              aria-label={emoji.name}
            >
              {emoji.skins[0].native}
            </button>
          ))}
        </div>
      </div>

      {navPosition === "bottom" && (
        <div
          className={`border-t p-2 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex overflow-x-auto space-x-2">
            {categoryMeta.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchTerm("");
                }}
                className={`p-2 rounded-md transition-colors ${
                  selectedCategory === category.id
                    ? theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                    : ""
                } ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                title={category.name}
                aria-label={category.name}
                aria-pressed={selectedCategory === category.id}
              >
                {category.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
