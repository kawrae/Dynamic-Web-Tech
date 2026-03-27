function StoragePanel({ ideasCount }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
      <h3 className="text-xl font-semibold">Storage</h3>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm text-zinc-400">
          <span>Ideas saved</span>
          <span>{ideasCount}</span>
        </div>
        <div className="h-2 rounded-full bg-white/5">
          <div
            className="h-2 rounded-full bg-white transition-all"
            style={{
              width:
                ideasCount === 0 ? "0%" : `${Math.min(ideasCount * 10, 100)}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Your recordings and notes will be stored locally on your device.
      </p>
    </div>
  );
}

export default StoragePanel;