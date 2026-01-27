export default function Button({ text, onMouseOver, onMouseOut, isHovered }) {
  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        padding: "10px 20px",
        margin: "10px",
        backgroundColor: isHovered ? "lightblue" : "white",
        border: "1px solid black",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}
