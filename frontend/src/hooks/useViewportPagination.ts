import { useState, useEffect, useCallback } from "react";

const TASK_ITEM_HEIGHT = 100;
const HEADER_HEIGHT = 64;
const TOOLBAR_HEIGHT = 56;
const PAGINATION_HEIGHT = 56;
const PADDING = 64;
const MIN_ITEMS = 2;
const MAX_ITEMS = 15;

export function useViewportPagination() {
  const calculateItemsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableHeight =
      viewportHeight -
      HEADER_HEIGHT -
      TOOLBAR_HEIGHT -
      PAGINATION_HEIGHT -
      PADDING;
    const calculatedItems = Math.floor(availableHeight / TASK_ITEM_HEIGHT);

    return Math.max(MIN_ITEMS, Math.min(MAX_ITEMS, calculatedItems));
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateItemsPerPage]);

  return itemsPerPage;
}
