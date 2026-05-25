import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CircleArrowUp, X } from "lucide-react";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { apiUpvoteHazard, getHazardReportUrl } from "../services/api";
import { HazardReport } from "../types/hazardreport";

dayjs.extend(relativeTime);

interface RecentPostProps {
  readonly hazard: HazardReport;
  readonly onEdit?: (hazard: HazardReport) => void;
}


export default function RecentPostCard({
  hazard,
  onEdit,
}: Readonly<RecentPostProps>) {
  const { user } = useAuth();

  const [upvotes, setUpvotes] = useState(hazard.upvotes ?? 0);
  const [upvotedBy, setUpvotedBy] = useState<string[]>(
    hazard.upvotedBy ?? []
  );

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const userId = user?.id;

  const canEdit =
    !!userId &&
    hazard.user?._id === userId &&
    dayjs().diff(dayjs(hazard.createdAt), "hour", true) < 1;

  const hasUpvoted = userId ? upvotedBy.includes(userId) : false;

  const handleUpvote = async () => {
    if (!userId) {
      return toast.error("Please login to upvote");
    }

    try {
      const res = await apiUpvoteHazard(hazard._id);
      const { message, upvoted, upvotes: newUpvotes } = res.data;

      setUpvotes(newUpvotes);
      setUpvotedBy((prev) =>
        upvoted
          ? [...prev, userId]
          : prev.filter((id) => id !== userId)
      );
      toast.success(message);
    } catch (err: unknown) {
      const backendMsg =
        err && typeof err === "object" && "response" in err
          ? (err as {
            response?: { data?: { message?: string } };
          }).response?.data?.message
          : undefined;

      toast.error(backendMsg || "Upvote failed");
      console.error("Upvote failed:", err);
    }
  };

  const handleShare = (platform: "whatsapp" | "twitter" | "instagram") => {
    const text = `${hazard.title}\n\n${hazard.description}`;
    const url = getHazardReportUrl(hazard._id);
    const shareText = encodeURIComponent(`${text}\n${url}`);

    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${shareText}`, "_blank");
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${shareText}`,
        "_blank"
      );
    }

    if (platform === "instagram") {
      navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("Caption copied. Paste it on Instagram.");
      window.open("https://www.instagram.com/", "_blank");
    }
  };

  const handleEditClick = () => {
    if (!canEdit) return;
    onEdit?.(hazard);
  };

  return (
    <>
      <div className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition">
        <div className="flex items-center mb-4">
          <img alt="" className="w-12 h-12 rounded-full mr-3 bg-red-200" />
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

        <div>
          <p className="text-gray-700 mb-4">{hazard.description}</p>

          <div className="overflow-hidden">
            {hazard.images && hazard.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hazard.images.map((img) => {
                  const imageSrc =
                    img.startsWith("http://") || img.startsWith("https://")
                      ? img
                      : "No Image";

                  return (
                    <div
                      key={img}
                      className="w-full h-48 rounded-xl overflow-hidden bg-gray-100"
                    >
                      <img
                        src={imageSrc}
                        alt={`Hazard: ${hazard.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-24 rounded-xl bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-600 mt-4">
          <span className="flex items-center gap-2">
            <CircleArrowUp
              onClick={handleUpvote}
              className={`cursor-pointer transition ${hasUpvoted ? "text-blue-600" : "text-gray-400"
                }`}
            />
            {`${upvotes} upvotes`}
          </span>

          <div className="flex items-center gap-4">
            {canEdit && (
              <button
                onClick={handleEditClick}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            )}

            {/* <button
              onClick={() => {
                setShowComments((prev) => {
                  const next = !prev;
                  if (next) {
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }
                  return next;
                });
              }}
              className="text-sm text-gray-600 hover:text-blue-600 transition"
            >
              {showComments
                ? `Hide Comments (${comments.length})`
                : `Comments (${comments.length})`}
            </button> */}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="hover:bg-gray-100 p-2 rounded-full transition"
                title="Share"
              >
                <CiShare2 className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* {showComments && (
          <div className="mt-4 border-t pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Comments</h4>

            <div className="flex gap-2 mb-3">
              <input
                ref={inputRef}
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddComment();
                }}
                placeholder="Write a comment..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>

            <div className="space-y-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 rounded-lg px-3 py-3"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No comments yet. Be the first to comment.
                </p>
              )}
            </div>
          </div>
        )} */}
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Share Post</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex items-center justify-center gap-8">
              <button
                onClick={() => {
                  handleShare("whatsapp");
                  setIsShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-3 bg-green-50 rounded-full group-hover:scale-110 transition">
                  <FaWhatsapp className="text-green-500 text-3xl" />
                </div>
                <span className="text-xs font-medium text-gray-600">WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  handleShare("twitter");
                  setIsShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-3 bg-blue-50 rounded-full group-hover:scale-110 transition">
                  <FaTwitter className="text-blue-400 text-3xl" />
                </div>
                <span className="text-xs font-medium text-gray-600">Twitter</span>
              </button>

              <button
                onClick={() => {
                  handleShare("instagram");
                  setIsShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-3 bg-pink-50 rounded-full group-hover:scale-110 transition">
                  <FaInstagram className="text-pink-500 text-3xl" />
                </div>
                <span className="text-xs font-medium text-gray-600">Instagram</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}