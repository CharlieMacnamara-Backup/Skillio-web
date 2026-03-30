/**
 * Declarative loading UI using Next.js 15+ conventions
 */
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent shadow-md" />
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Loading Skillio...</p>
      </div>
    </div>
  );
}
