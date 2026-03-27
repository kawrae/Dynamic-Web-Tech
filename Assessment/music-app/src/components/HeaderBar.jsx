function HeaderBar({
  searchTerm,
  setSearchTerm,
  newIdeaTitle,
  setNewIdeaTitle,
  onAddIdea,
}) {
  return (
    <header className="border-b border-white/10 px-6 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Dashboard</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Your workspace
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="New idea title..."
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAddIdea();
                }
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />

            <button
              onClick={onAddIdea}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
            >
              Add Idea
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;