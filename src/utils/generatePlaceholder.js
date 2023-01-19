const colors = [
  "F6AD55",
  "F6E05E",
  "68D391",
  "4FD1C5",
  "76E4F7",
  "9DECF9",
  "F687B3",
];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

export default function generatePlaceholder(name) {
  const itemInitial = name[0]?.toUpperCase() || "A";
  const placeholderURL = `https://via.placeholder.com/150/${randomColor}/FFFFFF/?text=${itemInitial}`;

  return placeholderURL;
}
