function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* SIDEBAR */}
        <aside className="hidden w-72 border-r border-white/10 bg-zinc-900/60 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
              Music-App
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Music Idea Vault
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Capture and store audio clips / songs.
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
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
            <button className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-medium text-black hover:bg-white">
              + New Idea
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* HEADER */}
          <header className="border-b border-white/10 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Dashboard</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Your workspace
                </h2>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search ideas..."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200">
                  Add Idea
                </button>
              </div>
            </div>
          </header>

          {/* MAIN GRID */}
          <section className="grid gap-6 px-6 py-8 xl:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-semibold">No ideas yet</h3>
              <p className="mt-2 text-sm text-zinc-400 max-w-sm">
                Start by recording an idea or creating a note. Your saved music
                ideas will appear here.
              </p>

              <button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200">
                Create your first idea
              </button>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">
              {/* QUICK ACTIONS */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
                <h3 className="text-xl font-semibold">
                  Start something new
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Capture a clip / idea.
                </p>

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

              {/* STORAGE BLOCK */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
                <h3 className="text-xl font-semibold">
                  Storage
                </h3>

                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm text-zinc-400">
                    <span>Usage</span>
                    <span>0%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 w-0 rounded-full bg-white" />
                  </div>
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                  Your recordings and notes will be stored locally on your device.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;