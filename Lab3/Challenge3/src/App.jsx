import { useState, useEffect } from "react";
import characters from "./data/charactersData";
import CharacterSelector from "./components/CharacterSelector";
import "./styles.css";

export default function App() {
  const [selectionCount, setSelectionCount] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    if (selectionCount === 3) {
      alert("You have selected three characters!");
      setSelectionCount(0);
      setResetSignal((s) => s + 1);
    }
  }, [selectionCount]);

  function incrementSelectionCount() {
    setSelectionCount((c) => c + 1);
  }

  return (
    <div className="app-container">
      <div className="counter">Selections: {selectionCount} / 2</div>

      <CharacterSelector
        characters={characters.groupA}
        onCharacterSelect={incrementSelectionCount}
        resetSignal={resetSignal}
      />
      <CharacterSelector
        characters={characters.groupB}
        onCharacterSelect={incrementSelectionCount}
        resetSignal={resetSignal}
      />
      <CharacterSelector
        characters={characters.groupC}
        onCharacterSelect={incrementSelectionCount}
        resetSignal={resetSignal}
      />
    </div>
  );
}
