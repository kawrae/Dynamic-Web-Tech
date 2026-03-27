function DeveloperSection() {
  return (
    <section
      id="developer"
      className="border-y border-white/10 bg-white/[0.02]"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
            Lorem ipsum.
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h4 className="text-lg font-medium text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h4>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h4 className="text-lg font-medium text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h4>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h4 className="text-lg font-medium text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h4>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;