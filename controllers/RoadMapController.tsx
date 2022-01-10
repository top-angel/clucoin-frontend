import { useState, useEffect } from "react";
import { CLUPANEL_API_URL } from "../constants";
import RoadMapRender from "../components/Roadmap";
import axios from "axios";

function RoadMapController() {
  const [roadmapData, setRoadmapData] = useState(undefined);

  useEffect(() => {
    Promise.all([
      axios
        .get("https://staging-cms.clucoin.com" + "/roadmaps?_sort=id:asc")
        .then((res) => res.data),
      axios
        .get(
          "https://staging-cms.clucoin.com" + "/roadmap-quarters?_sort=id:asc"
        )
        .then((res) => res.data),
      axios
        .get(
          "https://staging-cms.clucoin.com" + "/roadmap-details?_sort=id:asc"
        )
        .then((res) => res.data),
    ]).then((d) => setRoadmapData(d));
  }, []);

  return (
    <>
      <div className="RoadMapPage">
        <div className="Container">
          {roadmapData ? (
            <RoadMapRender
              rd={roadmapData[0]}
              rdq={roadmapData[1]}
              rdd={roadmapData[2]}
            />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}

export default RoadMapController;
