import { useEffect, type SetStateAction } from "react";

interface IProps {
  allCategories: string[];
  setActiveCategory: (value: SetStateAction<string>) => void;
  activeCategory: string;
}

const useInitialActiveCategory = ({
  activeCategory,
  allCategories,
  setActiveCategory,
}: IProps) => {
  useEffect(() => {
    if (allCategories.length > 0 && !activeCategory) {
      setActiveCategory(allCategories[0]);
    }
  }, [allCategories, activeCategory, setActiveCategory]);
};

export default useInitialActiveCategory;
