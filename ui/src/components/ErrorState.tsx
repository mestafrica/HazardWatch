import React from "react";

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
    title?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message,
    onRetry,
    title = "Something went wrong",
}) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
            <p className="text-red-600 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Retry
                </button>
            )}
        </div>
    );
};
