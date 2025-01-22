import {DropdownContainer, Select} from "../../components/Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import WorkoutCard from "../../components/Card/WorkoutCard.tsx";

type LetsWorkoutProps = {
    newestWorkouts: Workout[];
};

function LetsWorkout(props: LetsWorkoutProps) {
    const { newestWorkouts } = props;
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");

    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkoutId(event.target.value);
    };
    const selectedWorkout = newestWorkouts.find((w) => w.id === selectedWorkoutId) || null;


    return (
        <DropdownContainer>
            <Select value={selectedWorkoutId} onChange={handleSelection}>
                <option value="" disabled>
                    Where do you want to pick up today?
                </option>
                {newestWorkouts.map((workout) => {
                    const date = new Date(workout.timestamp * 1000).toDateString();
                    return (
                        <option key={workout.id} value={workout.id}>
                            {date} - {workout.name}
                        </option>
                    );
                })}
            </Select>

            {/* Conditionally render the selected workout */}
            {selectedWorkout && (
                <div style={{ marginTop: "1rem" }}>
                    <WorkoutCard workout={selectedWorkout} />
                </div>
            )}
        </DropdownContainer>
    );
}

export default LetsWorkout;
