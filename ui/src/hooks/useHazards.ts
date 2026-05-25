import { useEffect, useState, useCallback } from "react";
import { apiGetAllHazardReports } from "../services/api";
import { HazardReport } from "../types/hazardreport";

interface HazardResponse {
  hazardReports: HazardReport[];
}

interface UseHazardsReturn {
  hazards: HazardReport[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  editingHazard: HazardReport | null;
  setEditingHazard: (hazard: HazardReport | null) => void;
  fetchHazards: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export const useHazards = (): UseHazardsReturn => {
  const [allHazards, setAllHazards] = useState<HazardReport[]>([]);
  const [hazards, setHazards] = useState<HazardReport[]>([]);
  const [editingHazard, setEditingHazard] = useState<HazardReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHazards = async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      const response = (await apiGetAllHazardReports()) as unknown as {
        data: HazardResponse;
      };

      const sortedHazards = (response.data.hazardReports || []).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setAllHazards(sortedHazards);
      setHazards(sortedHazards.slice(0, ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching hazards:", err);
      setError("Failed to load hazard reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const startIdx = currentPage * ITEMS_PER_PAGE;
      const endIdx = nextPage * ITEMS_PER_PAGE;

      // Simulate network delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 300));

      setHazards((prev) => [...prev, ...allHazards.slice(startIdx, endIdx)]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Error loading more hazards:", err);
      setError("Failed to load more hazards.");
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, loadingMore, allHazards]);

  const hasMore = hazards.length < allHazards.length;

  useEffect(() => {
    fetchHazards();
  }, []);

  return {
    hazards,
    loading,
    loadingMore,
    error,
    hasMore,
    editingHazard,
    setEditingHazard,
    fetchHazards,
    loadMore,
  };
};
