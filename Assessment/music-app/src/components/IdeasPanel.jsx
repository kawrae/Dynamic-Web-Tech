import IdeaCard from "./IdeaCard";

function IdeasPanel({
  tracks,
  filteredTracks,
  editingTrackId,
  trackForm,
  setTrackForm,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteTrack,
  onToggleFavourite,
  onCreateTrack,
  coverInputRef,
  audioInputRef,
  onCoverArtUpload,
  onAudioUpload,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
      {tracks.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold">No tracks yet</h3>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            Start by adding a song idea, guitar riff, demo, or voice memo. Your
            library will appear here in a visual grid.
          </p>

          <button
            onClick={onCreateTrack}
            className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Create your first track
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Your library</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Stored locally in your browser.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {filteredTracks.length} result{filteredTracks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
              No matching tracks found.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTracks.map((track) => (
                <IdeaCard
                  key={track.id}
                  idea={track}
                  isEditing={editingTrackId === track.id}
                  editingTrack={trackForm}
                  setEditingTrack={setTrackForm}
                  onStartEditing={onStartEditing}
                  onCancelEditing={onCancelEditing}
                  onSaveEdit={onSaveEdit}
                  onDeleteIdea={onDeleteTrack}
                  onToggleFavourite={onToggleFavourite}
                  coverInputRef={coverInputRef}
                  audioInputRef={audioInputRef}
                  onCoverArtUpload={onCoverArtUpload}
                  onAudioUpload={onAudioUpload}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeasPanel;