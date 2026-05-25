import React from "react";

interface EmptyStateProps {
    title?: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    actionLabel,
    onAction,
    icon,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            {icon && <div className="mb-4 text-4xl opacity-50">{icon}</div>}
            {title && <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>}
            <p className="text-gray-500 mb-6 text-center max-w-sm">{message}</p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
