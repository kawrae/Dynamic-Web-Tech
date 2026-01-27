import { useState } from "react";
import Button from "./Button";

export default function PassedButton() {
  const [hovered, setHovered] = useState(false);

  function handleMouseOver() {
    setHovered(true);
  }

  function handleMouseOut() {
    setHovered(false);
  }

  return (
    <div>
      <Button
        text="Passed"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovered={hovered}
      />
      {hovered && <p>You passed the module!</p>}
    </div>
  );
}
