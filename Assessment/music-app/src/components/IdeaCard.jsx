function IdeaCard({
  idea,
  isEditing,
  editingTitle,
  setEditingTitle,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteIdea,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSaveEdit(idea.id);
                  }
                }}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => onSaveEdit(idea.id)}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                >
                  Save
                </button>
                <button
                  onClick={onCancelEditing}
                  className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 className="text-lg font-medium text-white">{idea.title}</h4>
              <p className="mt-1 text-sm text-zinc-400">ID: {idea.id}</p>
              <p className="mt-1 text-sm text-zinc-500">
                Created: {new Date(idea.createdAt).toLocaleString()}
              </p>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-3">
            <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5">
              Open
            </button>
            <button
              onClick={() => onStartEditing(idea)}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteIdea(idea.id)}
              className="rounded-2xl border border-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdeaCard;