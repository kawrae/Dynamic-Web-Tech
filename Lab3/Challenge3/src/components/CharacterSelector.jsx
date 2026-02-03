import React, { useState, useEffect } from "react";
import "./CharacterSelector.css";

function CharacterCard({ character, onSelect, isSelected }) {
  const cardClass = isSelected ? "character-card selected" : "character-card";

  return (
    <div className={cardClass}>
      <img src={character.photo} alt={character.name} className="image-cap" />
      <h3>{character.name}</h3>
      <p>{character.description}</p>

      <button onClick={() => onSelect(character.name)}>
        I prefer this one
      </button>
    </div>
  );
}

export default function CharacterSelector({ characters, onCharacterSelect, resetSignal }) {
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    setSelectedName("");
  }, [resetSignal]);

  const handleSelect = (name) => {
    if (selectedName !== name) {
      setSelectedName(name);
      if (onCharacterSelect) onCharacterSelect();
    }
  };

  return (
    <div className="character-selector">
      <header>Select your preferred character</header>

      <div className="cards-container">
        <CharacterCard
          character={characters[0]}
          onSelect={handleSelect}
          isSelected={selectedName === characters[0].name}
        />

        <h3>OR</h3>

        <CharacterCard
          character={characters[1]}
          onSelect={handleSelect}
          isSelected={selectedName === characters[1].name}
        />
      </div>

      <footer>You selected: {selectedName}</footer>
    </div>
  );
}
