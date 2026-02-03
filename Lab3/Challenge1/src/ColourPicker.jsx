import { useState } from "react";
import "./styles.css";

export default function ColourPicker() {
  const [color, setColor] = useState("green");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="color-picker-container">
      <p className="selected-color">
        The selected color is: <span style={{ color }}>{color}</span>
      </p>

      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="green"
            checked={color === "green"}
            onChange={handleColorChange}
            name="color"
          />
          Green
        </label>

        <label>
          <input
            type="radio"
            value="purple"
            checked={color === "purple"}
            onChange={handleColorChange}
            name="color"
          />
          Purple
        </label>

        <label>
          <input
            type="radio"
            value="orange"
            checked={color === "orange"}
            onChange={handleColorChange}
            name="color"
          />
          Orange
        </label>
      </div>
    </div>
  );
}
