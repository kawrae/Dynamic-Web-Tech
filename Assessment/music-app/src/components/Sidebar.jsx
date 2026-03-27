function Sidebar({ newIdeaTitle, onAddIdea }) {
  return (
    <aside className="hidden w-72 border-r border-white/10 bg-zinc-900/60 lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
          Music-App
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Music Storage
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Capture and store audio clips / songs.
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <button className="w-full rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-black">
          Dashboard
        </button>
        <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/5">
          All Ideas
        </button>
        <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/5">
          Recordings
        </button>
        <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/5">
          Notes
        </button>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={onAddIdea}
          disabled={!newIdeaTitle.trim()}
          className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-medium text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + New Idea
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;