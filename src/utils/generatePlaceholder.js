const colors = [
  "F6AD55", // orange
  "68D391", // green
  "4FD1C5", // teal
  "E9D8FD", // purple
  "F687B3", // pink
];

export default function generatePlaceholder(letter) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const itemInitial = letter?.toUpperCase() || "A";
  const placeholderURL = `https://via.placeholder.com/150/${randomColor}/FFFFFF/?text=${itemInitial}`;

  return placeholderURL;
}
