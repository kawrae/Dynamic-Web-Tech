import { useState } from "react";
import Button from "./Button";

export default function FailedButton() {
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
        text="Failed"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovered={hovered}
      />
      {hovered && <p>Unfortunately, you failed.</p>}
    </div>
  );
}
