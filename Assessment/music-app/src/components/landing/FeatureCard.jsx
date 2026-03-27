import { Link } from "react-router-dom";

function FeatureCard({ title, text, buttonText, to }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-6">
      <h4 className="text-xl font-semibold text-white">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
      <Link
        to={to}
        className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default FeatureCard;