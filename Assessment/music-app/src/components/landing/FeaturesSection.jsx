import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
          Lorem ipsum.
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard
          title="Lorem ipsum."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonText="Open Dashboard"
          to="/dashboard"
        />
        <FeatureCard
          title="Lorem ipsum."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonText="View Workspace"
          to="/dashboard"
        />
        <FeatureCard
          title="Lorem ipsum."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonText="Manage Ideas"
          to="/dashboard"
        />
        <FeatureCard
          title="Lorem ipsum."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonText="Open App"
          to="/dashboard"
        />
      </div>
    </section>
  );
}

export default FeaturesSection;