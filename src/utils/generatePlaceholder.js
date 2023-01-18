const colors = ["F6AD55", "68D391", "4FD1C5", "E9D8FD", "F687B3"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

export default function generatePlaceholder(name) {
  const itemInitial = name[0]?.toUpperCase() || "A";
  const placeholderURL = `https://via.placeholder.com/150/${randomColor}/FFFFFF/?text=${itemInitial}`;

  return placeholderURL;
}
