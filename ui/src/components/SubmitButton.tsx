
interface SubmitButtonProps {
  isLoading?: boolean;
  label?: string;
}

export default function SubmitButton({
  isLoading = false,
  label = "Submit",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`py-[6px] px-[30px] rounded-lg font-medium transition flex items-center gap-2 ${
        isLoading
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-[#2c2c2c] text-[#f5f5f5] hover:bg-[#1a1a1a]"
      }`}
    >
      {isLoading ? (
        <>
          <span className="inline-block h-4 w-4 border-2 border-gray-200 border-t-2 border-t-white rounded-full animate-spin"></span>
          Submitting...
        </>
      ) : (
        label
      )}
    </button>
  );
}
