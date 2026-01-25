export default function SubmitButton({
  isLoading,
  loadingText,
  buttonText,
}: {
  isLoading: boolean;
  loadingText: string;
  buttonText: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-purple-500/30 transition-colors duration-300 hover:scale-[1.02] hover:from-purple-500 hover:to-pink-500 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {loadingText}
        </span>
      ) : (
        buttonText
      )}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
    </button>
  );
}
