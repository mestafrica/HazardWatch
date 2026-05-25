import React from "react";
import { HazardReport } from "../types/hazardreport";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import RecentPostCard from "./RecentPostCard";
import { SkeletonCardGrid } from "./SkeletonCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface HazardSectionProps {
  hazards: HazardReport[];
  loading: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  error: string | null;
  onEdit: (hazard: HazardReport) => void;
  onRetry: () => void;
  onLoadMore?: () => void;
}

export const HazardSection: React.FC<HazardSectionProps> = ({
  hazards,
  loading,
  loadingMore = false,
  hasMore = false,
  error,
  onEdit,
  onRetry,
  onLoadMore,
}) => {
  const infiniteScrollRef = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    enabled: !loading && !error && hasMore && !loadingMore,
  });

  return (
    <section className="mb-8 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Post</h2>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <SkeletonCardGrid count={4} />
        ) : error ? (
          <ErrorState
            title="Failed to load hazard reports"
            message={error}
            onRetry={onRetry}
          />
        ) : hazards.length > 0 ? (
          <>
            {hazards.map((hazard) => (
              <RecentPostCard
                key={hazard._id}
                hazard={hazard}
                onEdit={onEdit}
              />
            ))}
            {loadingMore && <SkeletonCardGrid count={2} />}
            {hasMore && (
              <div
                ref={infiniteScrollRef}
                className="py-8 text-center text-gray-500"
              >
                <div className="animate-spin inline-block h-6 w-6 border-b-2 border-blue-600 rounded-full"></div>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No hazard reports yet"
            message="Be the first to report an environmental hazard in your area"
            actionLabel="Create Report"
            onAction={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>
    </section>
  );
};
