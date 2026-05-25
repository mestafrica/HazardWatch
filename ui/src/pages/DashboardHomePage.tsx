import { AnnouncementSection } from "../components/AnnouncementSection";
import { HazardSection } from "../components/HazardSection";
import { PostCreationSection } from "../components/PostCreationSection";
import { useAuth } from "../context/AuthContext";
import { useCoordinatedLoading } from "../hooks/useCoordinatedLoading";

export default function DashboardHomePage() {
  const { user } = useAuth();

  const {
    hazardsData: {
      hazards,
      loading,
      loadingMore,
      hasMore,
      error,
      editingHazard,
      setEditingHazard,
      fetchHazards,
      loadMore,
    },
    announcementsData: {
      announcements,
      loading: announcementLoading,
      error: announcementError,
      fetchAnnouncements,
    },
    isInitialLoading,
    refreshAll,
  } = useCoordinatedLoading();

  // Store refreshAll in sessionStorage so Navbar can access it
  // This is a workaround since Navbar is in a different component tree
  if (typeof window !== "undefined") {
    (window as any).__dashboardRefresh = refreshAll;
  }

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  //  Error State
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchHazards}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-10">
      <div className="w-[95%] mx-auto">
        <PostCreationSection
          user={user}
          editingHazard={editingHazard}
          onSuccess={fetchHazards}
          onEditClear={() => setEditingHazard(null)}
          isLoading={isInitialLoading}
        />

        <div className="flex gap-6 md:w-full">
          <HazardSection
            hazards={hazards}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            error={error}
            onEdit={setEditingHazard}
            onRetry={fetchHazards}
            onLoadMore={loadMore}
          />

          <AnnouncementSection
            announcements={announcements}
            loading={announcementLoading}
            error={announcementError}
            onRetry={fetchAnnouncements}
          />
        </div>
      </div>
    </div>
  );
}