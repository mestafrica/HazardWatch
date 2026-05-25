import React from "react";

export const AirQualitySkeleton: React.FC = () => {
    return (
        <div className="p-4 animate-pulse space-y-4">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Content cards */}
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="h-10 bg-gray-200 rounded mt-4"></div>
        </div>
    );
};
