import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CircleArrowUp, MapPin, ArrowLeft } from "lucide-react";
import { apiGetHazardReportById } from "../services/api";
import { HazardReport } from "../types/hazardreport";

dayjs.extend(relativeTime);

export default function HazardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [hazard, setHazard] = useState<HazardReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchHazard = async () => {
      try {
        setLoading(true);
        const res = await apiGetHazardReportById(Number(id));
        setHazard(res.data);
      } catch {
        setError("Hazard report not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchHazard();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !hazard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
        <p className="text-gray-600 text-lg">{error ?? "Report not found."}</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Card */}
        <article className="bg-white rounded-lg shadow-sm border p-6">
          {/* Author & time */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {hazard.user?.userName ?? "Anonymous"}
              </h3>
              <p
                className="text-sm text-gray-500"
                title={dayjs(hazard.createdAt).format("MMM D, YYYY h:mm A")}
              >
                {dayjs(hazard.createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {hazard.title}
          </h1>

          {/* Hazard type badge */}
          <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
            {hazard.hazardtype}
          </span>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {hazard.description}
          </p>

          {/* Images */}
          {hazard.images && hazard.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {hazard.images.map((img) => {
                const imageSrc =
                  img.startsWith("http://") || img.startsWith("https://")
                    ? img
                    : undefined;

                return imageSrc ? (
                  <div
                    key={img}
                    className="w-full h-56 rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={imageSrc}
                      alt={`Hazard: ${hazard.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Location */}
          {(hazard.city || hazard.country) && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
              <MapPin size={14} />
              <span>
                {[hazard.city, hazard.country].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Upvotes */}
          <div className="flex items-center gap-2 text-gray-600 border-t pt-4">
            <CircleArrowUp className="text-blue-600" size={20} />
            <span>{hazard.upvotes ?? 0} upvotes</span>
          </div>
        </article>
      </div>
    </div>
  );
}
