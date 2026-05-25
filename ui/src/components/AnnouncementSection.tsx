import React from "react";
import { Announcement } from "../hooks/useAnnouncements";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { SkeletonCardGrid } from "./SkeletonCard";

interface AnnouncementSectionProps {
    announcements: Announcement[];
    loading: boolean;
    error: string | null;
    onRetry: () => void;
}

export const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({
    announcements,
    loading,
    error,
    onRetry,
}) => {
    return (
        <section className="md:w-[65%] hidden md:block sticky top-20 h-[80vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Announcement</h2>

            <div className="sticky top-20 h-[80vh] bg-white overflow-y-auto scroll-smooth rounded-lg shadow-sm hover:shadow-md transition">
                {loading ? (
                    <div className="p-4">
                        <SkeletonCardGrid count={3} />
                    </div>
                ) : error ? (
                    <div className="p-4">
                        <ErrorState message={error} onRetry={onRetry} />
                    </div>
                ) : announcements.length > 0 ? (
                    <div className="rounded-lg">
                        {announcements.map((post) => (
                            <div
                                key={post._id}
                                className="w-[95%] mx-auto rounded-lg flex gap-2 mb-3 justify-center items-center hover:bg-gray-50 transition p-2"
                            >
                                <div className="bg-gray-100 w-40 h-20 m-2 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={post.profileImage || post.image || "/placeholder.png"}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-800 leading-5 truncate">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {post.createdAt
                                            ? new Date(post.createdAt).toLocaleDateString()
                                            : post.date || "No date"}
                                    </p>
                                    <p className="text-sm text-gray-700 leading-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4">
                        <EmptyState message="No announcements available at this time" />
                    </div>
                )}
            </div>
        </section>
    );
};
