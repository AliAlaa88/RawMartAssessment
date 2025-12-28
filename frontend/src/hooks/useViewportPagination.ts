import { useState, useEffect, useCallback } from "react";

const TASK_ITEM_HEIGHT = 100; // Approximate height of a task card in pixels
const HEADER_HEIGHT = 64; // Header height
const TOOLBAR_HEIGHT = 56; // Toolbar height
const PAGINATION_HEIGHT = 56; // Pagination bar height
const PADDING = 64; // Top and bottom padding + margins
const MIN_ITEMS = 2; // Minimum items per page
const MAX_ITEMS = 15; // Maximum items per page

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
