import React from "react";

export const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    );
};

export const SkeletonCardGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
    return (
        <div className="space-y-6">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};
