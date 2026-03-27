import { Link } from "react-router-dom";

function LandingCta() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/15 to-cyan-400/20 p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">
              Lorem ipsum.
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
          </div>

          <Link
            to="/dashboard"
            className="rounded-2xl bg-white px-6 py-4 text-center text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Enter Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingCta;