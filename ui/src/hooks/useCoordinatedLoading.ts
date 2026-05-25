import { useState, useCallback } from "react";
import { useHazards } from "./useHazards";
import { useAnnouncements } from "./useAnnouncements";

interface UseCoordinatedLoadingReturn {
  hazardsData: ReturnType<typeof useHazards>;
  announcementsData: ReturnType<typeof useAnnouncements>;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  refreshAll: () => Promise<void>;
}

export const useCoordinatedLoading = (): UseCoordinatedLoadingReturn => {
  const hazardsData = useHazards();
  const announcementsData = useAnnouncements();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAll = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // Fetch both in parallel
      await Promise.all([
        hazardsData.fetchHazards(),
        announcementsData.fetchAnnouncements(),
      ]);
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [hazardsData, announcementsData]);

  const isInitialLoading = hazardsData.loading;

  return {
    hazardsData,
    announcementsData,
    isInitialLoading,
    isRefreshing,
    refreshAll,
  };
};
