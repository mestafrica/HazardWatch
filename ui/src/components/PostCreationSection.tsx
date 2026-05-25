import React from "react";
import { HazardReport } from "../types/hazardreport";
import AirQuality from "./AirQuality";
import PostHazzardReportUi from "./PostHazzardReportUi";
import { AirQualitySkeleton } from "./AirQualitySkeleton";

interface PostCreationSectionProps {
  user: any; // Adjust type based on your auth context
  editingHazard: HazardReport | null;
  onSuccess: () => void;
  onEditClear: () => void;
  isLoading?: boolean;
}

export const PostCreationSection: React.FC<PostCreationSectionProps> = ({
  user,
  editingHazard,
  onSuccess,
  onEditClear,
  isLoading = false,
}) => {
  return (
    <div className="flex gap-x-4 my-4 md:my-6">
      {/* REPORT SECTION */}
      <div className="bg-white rounded-md md:w-2/3 w-full md:h-[200px] shadow-sm">
        {user ? (
          <PostHazzardReportUi
            onSuccess={() => {
              onSuccess();
              onEditClear();
            }}
            editingHazard={editingHazard}
          />
        ) : (
          <div className="bg-[url('./assets/images/clean-dirty-environment.png')] bg-cover bg-center bg-no-repeat rounded-lg shadow-md md:h-[200px]">
            <div className="p-6 text-center bg-black/20 rounded-lg backdrop-brightness-75 md:h-[200px] flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Environmental Hazard Reporting
              </h3>
              <p className="text-white mb-4">
                A Critical Step Towards a Safer Planet
              </p>
              <a
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Make a report
              </a>
            </div>
          </div>
        )}
      </div>

      {/* AIR QUALITY */}
      <div className="hidden md:block bg-white md:w-1/3 w-full rounded-md shadow-sm">
        {isLoading ? <AirQualitySkeleton /> : <AirQuality />}
      </div>
    </div>
  );
};
