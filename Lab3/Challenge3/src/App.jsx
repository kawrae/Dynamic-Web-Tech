import { useState, useEffect } from "react";
import characters from "./data/charactersData";
import CharacterSelector from "./components/CharacterSelector";
import "./styles.css";

export default function App() {
  const [selectionCount, setSelectionCount] = useState(0);

  useEffect(() => {
    if (selectionCount === 3) {
      alert("You have selected three characters!");
      setSelectionCount(0);
    }
  }, [selectionCount]);

  function incrementSelectionCount() {
    setSelectionCount((c) => c + 1);
  }

  return (
    <div className="app-container">
      <CharacterSelector
        characters={characters.groupA}
        onCharacterSelect={incrementSelectionCount}
      />
      <CharacterSelector
        characters={characters.groupB}
        onCharacterSelect={incrementSelectionCount}
      />
      <CharacterSelector
        characters={characters.groupC}
        onCharacterSelect={incrementSelectionCount}
      />
    </div>
  );
}
