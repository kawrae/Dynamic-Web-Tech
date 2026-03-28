import { useMemo, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import Sidebar from "../components/Sidebar";
import LibraryGrid from "../components/LibraryGrid";
import TrackModal from "../components/TrackModal";

function LibraryPage() {
  const [tracks, setTracks] = usePersistedState("music-library-tracks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState(null);

  const filteredTracks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return tracks;

    return tracks.filter((track) => {
      const title = track.title?.toLowerCase() || "";
      const notes = track.notes?.toLowerCase() || "";
      const type = track.type?.toLowerCase() || "";

      return (
        title.includes(query) ||
        notes.includes(query) ||
        type.includes(query)
      );
    });
  }, [tracks, searchTerm]);

  function closeModal() {
    setSelectedTrack(null);
  }

  function toggleFavourite(trackId) {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? { ...track, favourite: !track.favourite }
          : track
      )
    );

    setSelectedTrack((prev) =>
      prev && prev.id === trackId
        ? { ...prev, favourite: !prev.favourite }
        : prev
    );
  }

  function deleteTrack(trackId) {
    setTracks((prev) => prev.filter((track) => track.id !== trackId));
    setSelectedTrack((prev) => (prev?.id === trackId ? null : prev));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <main className="flex-1">
          <header className="border-b border-white/10 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Library</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Your collection
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Browse every saved track, cover, and audio preview in one place.
                </p>
              </div>

              <div className="w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search library..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
              </div>
            </div>
          </header>

          <section className="px-6 py-8">
            <LibraryGrid
              tracks={filteredTracks}
              onSelectTrack={setSelectedTrack}
            />
          </section>
        </main>
      </div>

      <TrackModal
        track={selectedTrack}
        onClose={closeModal}
        onToggleFavourite={toggleFavourite}
        onDeleteTrack={deleteTrack}
      />
    </div>
  );
}

export default LibraryPage;