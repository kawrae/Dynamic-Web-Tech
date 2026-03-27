import { Link } from "react-router-dom";
import bannerImage from "../../assets/headphones.png";

function HeroSection() {
  return (
    <section className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
      <div className="absolute right-0 top-8 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-400/20 blur-[120px]" />

      <div className="relative z-10">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
          Local-first music workspace
        </div>

        <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Capture recordings, attach cover art, and build your music library.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          A React-based creative workspace for storing audio, artwork, and notes
          in one clean interface. Designed to help you capture and organise
          music ideas with persistent local storage.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-white px-6 py-4 text-center text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Open Dashboard
          </Link>

          <a
            href="#features"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            Explore Features
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">CRUD</p>
            <p className="mt-2 text-sm text-zinc-400">
              Create, update, manage, and delete ideas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">Dexie</p>
            <p className="mt-2 text-sm text-zinc-400">
              Local persistence for richer media storage.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">Media</p>
            <p className="mt-2 text-sm text-zinc-400">
              Built for audio clips, cover images, and notes.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-cyan-400/10 blur-3xl" />

        <img
          src={bannerImage}
          alt="Music Storage banner"
          className="relative z-10 w-[500px] max-w-full drop-shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
        />
      </div>
    </section>
  );
}

export default HeroSection;