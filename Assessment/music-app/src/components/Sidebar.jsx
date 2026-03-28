import { Link, NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function navClass({ isActive }) {
  return [
    "block w-full rounded-2xl px-4 py-3 text-left text-sm transition",
    isActive
      ? "bg-white font-medium text-black"
      : "text-zinc-300 hover:bg-white/5",
  ].join(" ");
}

function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-white/10 bg-zinc-900/60 lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          to="/landing"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Music Storage
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Store demos, riffs, notes, and recordings in one organised workspace.
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/library" className={navClass}>
          Library
        </NavLink>

        <button
          type="button"
          className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-white/5"
        >
          Recordings
        </button>

        <button
          type="button"
          className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-white/5"
        >
          Notes
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;