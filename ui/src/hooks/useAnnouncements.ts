import { useEffect, useState } from "react";
import { apiGetAllAnnouncements } from "../services/api";

export interface Announcement {
  _id: string;
  title: string;
  description: string;
  date?: string;
  createdAt?: string;
  profileImage?: string;
  image?: string;
}

interface AnnouncementResponse {
  announcements: Announcement[];
}

interface UseAnnouncementsReturn {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  fetchAnnouncements: () => Promise<void>;
}

export const useAnnouncements = (): UseAnnouncementsReturn => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = (await apiGetAllAnnouncements()) as unknown as {
        data: AnnouncementResponse;
      };

      const sortedAnnouncements = (response.data.announcements || []).sort(
        (a, b) =>
          new Date(b.createdAt || b.date || "").getTime() -
          new Date(a.createdAt || a.date || "").getTime(),
      );

      setAnnouncements(sortedAnnouncements);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
  };
};
