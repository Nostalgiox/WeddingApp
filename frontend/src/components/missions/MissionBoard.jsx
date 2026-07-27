import { useState } from "react";
import { missions } from "../../data/missions";

import MissionTile from "./MissionTile";
import MissionSheet from "./MissionSheet";

const MissionBoard = () => {

    const [selectedMission, setSelectedMission] = useState(null);

    return (

        <section className="px-6 pb-20">

            <div
                className="
                    grid
                    grid-cols-4
                    gap-2
                "
            >

                {missions.map((mission, index) => (

                    <MissionTile
                        key={mission.id}
                        mission={mission}
                        index={index}
                        onClick={() => setSelectedMission(mission)}
                    />

                ))}

            </div>

            <MissionSheet
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
            />

        </section>

    );

};

export default MissionBoard;