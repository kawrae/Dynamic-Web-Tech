function QuickActions({ onCreateTrack, onOpenAudioUpload, onOpenCoverUpload }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
      <h3 className="text-xl font-semibold">Start something new</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Capture a riff, upload a demo, or begin a new library entry.
      </p>

      <div className="mt-5 space-y-3">
        <button
          onClick={onCreateTrack}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-zinc-200"
        >
          New Track
        </button>
        <button
          onClick={onOpenAudioUpload}
          className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
        >
          Upload Audio
        </button>
        <button
          onClick={onOpenCoverUpload}
          className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
        >
          Upload Cover Art
        </button>
      </div>
    </div>
  );
}

export default QuickActions;