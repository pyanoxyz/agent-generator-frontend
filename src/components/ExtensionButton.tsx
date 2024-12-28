import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";

const VSCodeStatsButton = ({ extensionId = "" }) => {
  const [downloads, setDownloads] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch(
          `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json;api-version=7.1-preview.1",
            },
            body: JSON.stringify({
              filters: [
                {
                  criteria: [
                    {
                      filterType: 7,
                      value: extensionId,
                    },
                  ],
                  pageNumber: 1,
                  pageSize: 100,
                  sortBy: 0,
                  sortOrder: 0,
                },
              ],
              flags: 914,
            }),
          }
        );

        const data = await response.json();
        const stats = data.results[0]?.extensions[0]?.statistics;
        if (stats) {
          const downloadCount = stats.find(
            (stat: any) => stat.statisticName === "install"
          )?.value;
          setDownloads(downloadCount);
        }
      } catch (error) {
        console.error("Error fetching downloads:", error);
      }
    };

    if (extensionId) {
      fetchDownloads();
    }
  }, [extensionId]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num?.toString();
  };

  const handleClick = () => {
    window.open(
      `https://marketplace.visualstudio.com/items?itemName=${extensionId}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center space-x-2 px-3 py-1 text-sm font-medium rounded-md border
        ${
          isHovered ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"
        }
        transition-colors duration-200 ease-in-out`}
    >
      <FaDownload size={16} className="text-gray-600" />
      <span className="border-r border-gray-300 h-4 mx-2" />
      <span className="text-gray-700">
        {downloads === null ? "..." : formatNumber(downloads)}
      </span>
    </button>
  );
};

export default VSCodeStatsButton;
