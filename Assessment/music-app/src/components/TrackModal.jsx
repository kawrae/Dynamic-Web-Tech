import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Heart, Trash2, Pencil } from "lucide-react";
import { useMediaById, deleteMedia } from "../db";

function TrackModal({ track, onClose, onToggleFavourite, onDeleteTrack }) {
  const media = useMediaById(track?.id);

  useEffect(() => {
    if (!track) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [track, onClose]);

  if (!track) return null;

  async function handleDelete() {
    await deleteMedia(track.id);
    onDeleteTrack(track.id);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-zinc-900/80 p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-zinc-900">
            {media?.coverImg ? (
              <img
                src={media.coverImg}
                alt={track.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-sm text-zinc-500">
                No cover art
              </div>
            )}
          </div>

          <div className="p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {track.type}
            </p>

            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  {track.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Added: {new Date(track.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onToggleFavourite(track.id)}
                className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
              >
                {track.favourite ? "★ Saved" : "☆ Save"}
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-medium text-white">Notes</h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-400">
                {track.notes || "No notes added."}
              </p>
            </div>

            {media?.audioSrc && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium text-white">Preview</h3>
                <audio controls className="w-full">
                  <source src={media.audioSrc} />
                </audio>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
              >
                <Pencil size={16} />
                Edit in Dashboard
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 px-5 py-3 text-sm text-red-300 hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Delete
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-200 hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackModal;