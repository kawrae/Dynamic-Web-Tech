import { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import usePersistedState from "../hooks/usePersistedState";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import IdeasPanel from "../components/IdeasPanel";
import QuickActions from "../components/QuickActions";
import StoragePanel from "../components/StoragePanel";

function DashboardPage() {
  const [ideas, setIdeas] = usePersistedState("ideas", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [editingIdeaId, setEditingIdeaId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  function addIdea(customTitle) {
    const trimmedTitle = customTitle.trim();

    if (!trimmedTitle) return;

    const newIdea = {
      id: "idea-" + nanoid(),
      title: trimmedTitle,
      notes: "",
      createdAt: new Date().toISOString(),
    };

    setIdeas([...ideas, newIdea]);
    setNewIdeaTitle("");
  }

  function deleteIdea(id) {
    const updatedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(updatedIdeas);

    if (editingIdeaId === id) {
      setEditingIdeaId(null);
      setEditingTitle("");
    }
  }

  function startEditing(idea) {
    setEditingIdeaId(idea.id);
    setEditingTitle(idea.title);
  }

  function cancelEditing() {
    setEditingIdeaId(null);
    setEditingTitle("");
  }

  function saveEdit(id) {
    const trimmedTitle = editingTitle.trim();
    if (!trimmedTitle) return;

    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, title: trimmedTitle } : idea
    );

    setIdeas(updatedIdeas);
    setEditingIdeaId(null);
    setEditingTitle("");
  }

  const filteredIdeas = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase();

    if (!trimmedSearch) return ideas;

    return ideas.filter((idea) =>
      idea.title.toLowerCase().includes(trimmedSearch)
    );
  }, [ideas, searchTerm]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen w-full">
        <Sidebar
          newIdeaTitle={newIdeaTitle}
          onAddIdea={() => {
            if (newIdeaTitle.trim()) {
              addIdea(newIdeaTitle);
            }
          }}
        />

        <main className="flex-1">
          <HeaderBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            newIdeaTitle={newIdeaTitle}
            setNewIdeaTitle={setNewIdeaTitle}
            onAddIdea={() => addIdea(newIdeaTitle)}
          />

          <section className="grid gap-6 px-6 py-8 xl:grid-cols-[1.5fr_0.9fr]">
            <IdeasPanel
              ideas={ideas}
              filteredIdeas={filteredIdeas}
              newIdeaTitle={newIdeaTitle}
              onAddIdea={() => {
                if (newIdeaTitle.trim()) {
                  addIdea(newIdeaTitle);
                }
              }}
              editingIdeaId={editingIdeaId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              onStartEditing={startEditing}
              onCancelEditing={cancelEditing}
              onSaveEdit={saveEdit}
              onDeleteIdea={deleteIdea}
            />

            <div className="space-y-6">
              <QuickActions />
              <StoragePanel ideasCount={ideas.length} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;