import IdeaCard from "./IdeaCard";

function IdeasPanel({
  ideas,
  filteredIdeas,
  newIdeaTitle,
  onAddIdea,
  editingIdeaId,
  editingTitle,
  setEditingTitle,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteIdea,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-10">
      {ideas.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold">No ideas yet</h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-400">
            Start by recording an idea or creating a note. Your saved music
            ideas will appear here.
          </p>

          <button
            onClick={onAddIdea}
            disabled={!newIdeaTitle.trim()}
            className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create your first idea
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Your ideas</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Stored locally in your browser.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {filteredIdeas.length} result{filteredIdeas.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredIdeas.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
              No matching ideas found.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isEditing={editingIdeaId === idea.id}
                  editingTitle={editingTitle}
                  setEditingTitle={setEditingTitle}
                  onStartEditing={onStartEditing}
                  onCancelEditing={onCancelEditing}
                  onSaveEdit={onSaveEdit}
                  onDeleteIdea={onDeleteIdea}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeasPanel;