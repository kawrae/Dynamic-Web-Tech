import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";
import usePersistedState from "../hooks/usePersistedState";
import { saveMedia, updateMedia, getMediaById, deleteMedia } from "../db";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import IdeasPanel from "../components/IdeasPanel";
import StoragePanel from "../components/StoragePanel";

const emptyTrackForm = {
  title: "",
  notes: "",
  type: "Song",
  coverArt: "",
  audioUrl: "",
};

function DashboardPage() {
  const [tracks, setTracks] = usePersistedState("music-library-tracks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTrackId, setEditingTrackId] = useState(null);
  const [trackForm, setTrackForm] = useState(emptyTrackForm);

  const coverInputRef = useRef(null);
  const audioInputRef = useRef(null);

  function clearFileInputs() {
    if (coverInputRef.current) coverInputRef.current.value = "";
    if (audioInputRef.current) audioInputRef.current.value = "";
  }

  function resetForm() {
    setTrackForm(emptyTrackForm);
    setEditingTrackId(null);
    clearFileInputs();
  }

  function updateTrackForm(field, value) {
    setTrackForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleRecordingReady(audioUrl) {
    updateTrackForm("audioUrl", audioUrl);
    notifyUser("Audio ready", "Voice recording is attached and ready to add to your track.");
  }

  function handleCoverReady(coverDataUrl) {
    updateTrackForm("coverArt", coverDataUrl);
    notifyUser("Cover ready", "Camera cover photo is attached and ready to add to your track.");
  }

  async function notifyUser(title, body) {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.error("Notification request failed", error);
        return;
      }
    }

    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  async function handleCoverArtUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await readFileAsDataUrl(file);
      updateTrackForm("coverArt", result);
      notifyUser("Cover attached", "The selected cover image is ready to add to your track.");
    } catch (error) {
      console.error("Failed to read cover image:", error);
    }
  }

  async function handleAudioUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await readFileAsDataUrl(file);
      updateTrackForm("audioUrl", result);
      notifyUser("Audio attached", "The selected audio file is ready to add to your track.");
    } catch (error) {
      console.error("Failed to read audio file:", error);
    }
  }

  async function createTrack() {
    const trimmedTitle = trackForm.title.trim();
    const trimmedNotes = trackForm.notes.trim();

    if (!trimmedTitle) return;

    const trackId = `track-${nanoid()}`;
    const timestamp = new Date().toISOString();

    const newTrack = {
      id: trackId,
      title: trimmedTitle,
      notes: trimmedNotes,
      type: trackForm.type,
      favourite: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setTracks((prev) => [newTrack, ...prev]);

    try {
      await saveMedia(trackId, {
        audioSrc: trackForm.audioUrl,
        coverImg: trackForm.coverArt,
      });
      notifyUser("Track uploaded", `"${trimmedTitle}" has been saved to your library.`);
    } catch (error) {
      console.error("Failed to save track media:", error);
    }

    resetForm();
  }

  async function saveTrackEdit(trackId) {
    const trimmedTitle = trackForm.title.trim();
    const trimmedNotes = trackForm.notes.trim();

    if (!trimmedTitle || !trackId) return;

    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              title: trimmedTitle,
              notes: trimmedNotes,
              type: trackForm.type,
              updatedAt: new Date().toISOString(),
            }
          : track
      )
    );

    try {
      await updateMedia(trackId, {
        audioSrc: trackForm.audioUrl,
        coverImg: trackForm.coverArt,
      });
      notifyUser("Track updated", `"${trimmedTitle}" has been updated in your library.`);
    } catch (error) {
      console.error("Failed to update track media:", error);
    }

    resetForm();
  }

  async function startEditing(track) {
    setEditingTrackId(track.id);

    try {
      const media = await getMediaById(track.id);

      setTrackForm({
        title: track.title || "",
        notes: track.notes || "",
        type: track.type || "Song",
        coverArt: media?.coverImg || "",
        audioUrl: media?.audioSrc || "",
      });
    } catch (error) {
      console.error("Failed to load media for editing:", error);

      setTrackForm({
        title: track.title || "",
        notes: track.notes || "",
        type: track.type || "Song",
        coverArt: "",
        audioUrl: "",
      });
    }
  }

  function cancelEditing() {
    resetForm();
  }

  async function deleteTrack(trackId) {
    setTracks((prev) => prev.filter((track) => track.id !== trackId));

    try {
      await deleteMedia(trackId);
    } catch (error) {
      console.error("Failed to delete track media:", error);
    }

    if (editingTrackId === trackId) {
      resetForm();
    }
  }

  function toggleFavourite(trackId) {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? { ...track, favourite: !track.favourite }
          : track
      )
    );
  }

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <main className="flex-1">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4 lg:hidden">
            <Link
              to="/landing"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
          </div>

          <HeaderBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            trackForm={trackForm}
            setTrackForm={setTrackForm}
            onCreateTrack={createTrack}
            onSaveEdit={() => saveTrackEdit(editingTrackId)}
            isEditing={Boolean(editingTrackId)}
            coverInputRef={coverInputRef}
            audioInputRef={audioInputRef}
            onCoverArtUpload={handleCoverArtUpload}
            onAudioUpload={handleAudioUpload}
            onCancelEditing={cancelEditing}
            onRecordingReady={handleRecordingReady}
            onCoverReady={handleCoverReady}
            onNotify={notifyUser}
          />

          <section className="grid gap-6 px-6 py-8 xl:grid-cols-[1.55fr_0.95fr]">
            <IdeasPanel
              tracks={tracks}
              filteredTracks={filteredTracks}
              editingTrackId={editingTrackId}
              trackForm={trackForm}
              setTrackForm={setTrackForm}
              onStartEditing={startEditing}
              onCancelEditing={cancelEditing}
              onSaveEdit={saveTrackEdit}
              onDeleteTrack={deleteTrack}
              onToggleFavourite={toggleFavourite}
              onCreateTrack={createTrack}
              coverInputRef={coverInputRef}
              audioInputRef={audioInputRef}
              onCoverArtUpload={handleCoverArtUpload}
              onAudioUpload={handleAudioUpload}
            />

            <div className="space-y-6">
              <StoragePanel tracks={tracks} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;