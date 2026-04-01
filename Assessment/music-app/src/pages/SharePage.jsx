import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, Menu, Send, Share2 } from "lucide-react";
import usePersistedState from "../hooks/usePersistedState";
import { useMediaById } from "../db";
import Sidebar from "../components/Sidebar";

function ShareTrackCard({ track, isSelected, onSelect }) {
  const media = useMediaById(track.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(track)}
      className={
        "group w-full min-w-0 overflow-hidden rounded-3xl border text-left transition " +
        (isSelected
          ? "border-indigo-300/60 bg-indigo-500/10"
          : "border-white/10 bg-white/5 hover:-translate-y-1 hover:border-white/20")
      }
    >
      <div className="aspect-[4/3] bg-zinc-900 sm:aspect-square">
        {media?.coverImg ? (
          <img
            src={media.coverImg}
            alt={track.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No cover art
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{track.type}</p>
        <h3 className="mt-1 line-clamp-1 text-base font-medium text-white">{track.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {track.notes || "No notes added."}
        </p>
      </div>
    </button>
  );
}

function SharePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tracks] = usePersistedState("music-library-tracks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [copyState, setCopyState] = useState("idle");
  const [shareState, setShareState] = useState("idle");

  const filteredTracks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return tracks;

    return tracks.filter((track) => {
      const title = track.title?.toLowerCase() || "";
      const notes = track.notes?.toLowerCase() || "";
      const type = track.type?.toLowerCase() || "";

      return title.includes(query) || notes.includes(query) || type.includes(query);
    });
  }, [tracks, searchTerm]);

  const selectedTrack = useMemo(() => {
    if (!selectedTrackId) return filteredTracks[0] || null;
    return tracks.find((track) => track.id === selectedTrackId) || filteredTracks[0] || null;
  }, [filteredTracks, selectedTrackId, tracks]);

  const selectedMedia = useMediaById(selectedTrack?.id);

  const sharePayload = useMemo(() => {
    if (!selectedTrack) {
      return {
        title: "Music Storage",
        text: "Check out my tracks in Music Storage.",
        url: typeof window !== "undefined" ? `${window.location.origin}/library` : "/library",
      };
    }

    const trackTitle = selectedTrack.title?.trim() || "Untitled Track";
    const trackType = selectedTrack.type || "Track";
    const note = selectedTrack.notes?.trim();
    const noteSuffix = note ? `\n\n${note.slice(0, 120)}${note.length > 120 ? "..." : ""}` : "";

    return {
      title: `${trackTitle} - Music Storage`,
      text: `Listen to my ${trackType}: ${trackTitle}.${noteSuffix}`,
      url:
        typeof window !== "undefined"
          ? `${window.location.origin}/library?highlight=${encodeURIComponent(selectedTrack.id)}`
          : "/library",
    };
  }, [selectedTrack]);

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function makeCoverFile() {
    const coverDataUrl = selectedMedia?.coverImg;
    if (!coverDataUrl || !coverDataUrl.startsWith("data:image/")) {
      return null;
    }

    try {
      const response = await fetch(coverDataUrl);
      const blob = await response.blob();
      const mime = blob.type || "image/jpeg";
      const extension = mime.split("/")[1] || "jpg";
      const baseName = (selectedTrack?.title || "track-cover")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "track-cover";

      return new File([blob], `${baseName}.${extension}`, { type: mime });
    } catch (error) {
      console.error("Could not create share file from cover image:", error);
      return null;
    }
  }

  async function handleNativeShare() {
    if (!canNativeShare) return;

    try {
      const payload = { ...sharePayload };
      const coverFile = await makeCoverFile();

      if (
        coverFile &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [coverFile] })
      ) {
        payload.files = [coverFile];
      }

      await navigator.share(payload);
      setShareState("shared");
      setTimeout(() => setShareState("idle"), 1800);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Native share failed:", error);
        setShareState("error");
        setTimeout(() => setShareState("idle"), 1800);
      }
    }
  }

  function copyTextFallback(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }

  async function copyShareLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyState("error");
      return;
    }

    try {
      const shareText = `${sharePayload.text}\n\n${sharePayload.url}`;

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        const copied = copyTextFallback(shareText);
        if (!copied) {
          throw new Error("Fallback copy failed");
        }
      }

      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 1800);
    }
  }

  const encodedUrl = encodeURIComponent(sharePayload.url);
  const encodedText = encodeURIComponent(sharePayload.text);

  const quickShares = [
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(sharePayload.title)}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-4 sm:px-6 lg:hidden">
            <Link
              to="/landing"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:border-indigo-400/35 hover:bg-indigo-500/10 hover:text-indigo-100"
            >
              <ArrowLeft size={14} />
              Back
            </Link>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:border-indigo-400/35 hover:bg-indigo-500/10 hover:text-indigo-100"
              aria-label="Open navigation"
            >
              <Menu size={16} />
            </button>
          </div>

          <header className="border-b border-white/10 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Share</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Share your tracks
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Pick a track, preview the share content, then use native share or quick share links.
                </p>
              </div>

              <div className="w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search tracks to share..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-400/35"
                />
              </div>
            </div>
          </header>

          <section className="grid gap-6 px-3 py-6 sm:px-6 sm:py-8 xl:grid-cols-[1.2fr_1fr] xl:gap-8">
            <div className="order-2 xl:order-1">
              <h3 className="mb-4 text-xl font-semibold text-white">Select a track</h3>

              {filteredTracks.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-10 text-center">
                  <h3 className="text-xl font-semibold">No tracks available</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Add tracks in the dashboard first, then come back to share them.
                  </p>
                  <Link
                    to="/dashboard"
                    className="mt-5 inline-flex rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredTracks.map((track) => (
                    <ShareTrackCard
                      key={track.id}
                      track={track}
                      isSelected={selectedTrack?.id === track.id}
                      onSelect={(nextTrack) => setSelectedTrackId(nextTrack.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="order-1 h-fit min-w-0 rounded-3xl border border-white/10 bg-zinc-900/40 p-4 shadow-lg shadow-black/30 sm:p-5 xl:order-2 xl:sticky xl:top-6">
              <div className="rounded-3xl border border-white/10 bg-black p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-indigo-300">Now sharing</p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {selectedTrack?.title || "Your next track"}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{selectedTrack?.type || "Track"}</p>
                <p className="mt-4 line-clamp-3 text-sm text-zinc-300">
                  {selectedTrack?.notes || "Select a track to build a clean share preview."}
                </p>

                <div className="mt-5 min-w-0 rounded-2xl border border-white/10 bg-zinc-950/80 p-3 text-xs text-zinc-400">
                  <p className="line-clamp-2">{sharePayload.text}</p>
                  <p className="mt-2 break-all text-blue-300/90">{sharePayload.url}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  disabled={!canNativeShare || !selectedTrack}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Share2 size={16} />
                  {shareState === "shared" ? "Shared" : "Share via device"}
                </button>

                <button
                  type="button"
                  onClick={copyShareLink}
                  disabled={!selectedTrack}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 transition hover:border-indigo-400/35 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}
                  {copyState === "copied" ? "Copied" : "Copy caption + link"}
                </button>
              </div>

              {!canNativeShare && (
                <p className="mt-3 text-xs text-zinc-500">
                  Native share is unavailable on this browser. Use copy or quick share links.
                </p>
              )}

              {shareState === "error" && (
                <p className="mt-2 text-xs text-red-300">
                  Share could not be completed on this device.
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
                {quickShares.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-950/70 px-2 py-2 text-xs text-zinc-200 transition hover:border-indigo-400/35 hover:bg-indigo-500/10"
                  >
                    <Send size={14} />
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SharePage;
