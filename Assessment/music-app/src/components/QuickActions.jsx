function QuickActions() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
      <h3 className="text-xl font-semibold">Start something new</h3>
      <p className="mt-2 text-sm text-zinc-400">Capture a clip / idea.</p>

      <div className="mt-5 space-y-3">
        <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-zinc-200">
          Record Audio
        </button>
        <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5">
          New Text Note
        </button>
        <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5">
          Upload File
        </button>
      </div>
    </div>
  );
}

export default QuickActions;