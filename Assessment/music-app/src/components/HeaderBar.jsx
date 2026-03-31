import MediaCapturePanel from "./MediaCapturePanel";

function HeaderBar({
  searchTerm,
  setSearchTerm,
  trackForm,
  setTrackForm,
  onCreateTrack,
  onSaveEdit,
  isEditing,
  coverInputRef,
  audioInputRef,
  onCoverArtUpload,
  onAudioUpload,
  onCancelEditing,
  onRecordingReady,
  onCoverReady,
  onNotify,
}) {
  function updateField(field, value) {
    setTrackForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <header className="border-b border-white/10 px-6 py-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-zinc-400">Dashboard</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Your workspace
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              
            </p>
          </div>

          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search tracks, notes, or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 xl:grid-cols-[1.1fr_1fr_auto]">
          <input
            type="text"
            placeholder="Track title..."
            value={trackForm.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={trackForm.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option>Song</option>
              <option>Guitar Riff</option>
              <option>Demo</option>
              <option>Voice Memo</option>
              <option>Idea Sketch</option>
            </select>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
              >
                Audio
              </button>
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
              >
                Cover
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={onSaveEdit}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
                >
                  Save
                </button>
                <button
                  onClick={onCancelEditing}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-200 hover:bg-white/5"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={onCreateTrack}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
              >
                Add Track
              </button>
            )}
          </div>

          <div className="xl:col-span-3">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {trackForm.audioUrl && (
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                  Audio uploaded
                </span>
              )}
              {trackForm.coverArt && (
                <span className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                  Cover uploaded
                </span>
              )}
            </div>

            <textarea
              rows="3"
              placeholder="Add notes about chords, lyrics, arrangement, tone, BPM, or reminders..."
              value={trackForm.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>

          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={onAudioUpload}
            className="hidden"
          />

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={onCoverArtUpload}
            className="hidden"
          />

          <div className="xl:col-span-3">
            <MediaCapturePanel
              onRecordingReady={onRecordingReady}
              onCoverReady={onCoverReady}
              onNotify={onNotify}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;