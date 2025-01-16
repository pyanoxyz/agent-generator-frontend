import horizontalGreenLine from "../assets/greenHrLine.png";

export default function VerticalBars() {
  // Function to generate random bar groups
  const generateRandomGroups = () => {
    const groups = [];
    const possibleCounts = [1, 2, 3, 4]; // possible number of bars in a group

    // Generate groups until we reach around 20 total bars
    let totalBars = 0;
    while (totalBars < 40) {
      const count = possibleCounts[Math.floor(Math.random() * possibleCounts.length)];
      // Only add group if it won't exceed 20 bars
      if (totalBars + count <= 20) {
        groups.push({ count, gap: 4 });
        totalBars += count;
      } else {
        break;
      }
    }

    return groups;
  };

  const barGroups = generateRandomGroups();
  return (
    <div className="w-full flex items-end">
      {barGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="flex w-full h-60 mr-8 gap-1" // space between groups
        >
          {Array.from({ length: group.count }).map((_, barIndex) => (
            <img
              key={barIndex}
              src={horizontalGreenLine}
              style={{
                backgroundImage: `url(${horizontalGreenLine})`,
              }}
              className="bg-repeat-x w-auto"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
