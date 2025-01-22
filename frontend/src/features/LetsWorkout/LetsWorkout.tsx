import {DropdownContainer, Select} from "../../components/Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import WorkoutCard from "../../components/Card/WorkoutCard.tsx";
import Button from "../../components/Button/Button.tsx";

type LetsWorkoutProps = {
    newestWorkouts: Workout[];
};

function LetsWorkout(props: LetsWorkoutProps) {
    const { newestWorkouts } = props;
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
    const [todaysWorkout, setTodaysWorkout] = useState<Workout>();

    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkoutId(event.target.value);
    };

    const handleParameterButton = () => {
        if (!selectedWorkout) return;

        // Create a copy of the selected workout and update the timestamp
        const updatedWorkout: Workout = {
            ...selectedWorkout,
            timestamp: Math.floor(Date.now() / 1000), // Current Unix timestamp in seconds
        };

        setTodaysWorkout(updatedWorkout);
        console.log("todaysworkout nach button", todaysWorkout)
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
                    const workoutId: string = workout.id;
                    return (
                        <option key={workoutId} value={workoutId}>
                            {date} - {workout.name}
                        </option>
                    );
                })}
            </Select>

            {/* Conditionally render the selected workout */}
            {selectedWorkout && !todaysWorkout && (
                <div style={{ marginTop: "1rem" }}>
                    <WorkoutCard workout={selectedWorkout} />
                    <Button label={"set parameters"} onClick={handleParameterButton} ></Button>
                </div>
            )}

            {/* Render the updated today's workout */}
            {todaysWorkout && (
                <div style={{ marginTop: "2rem", border: "1px solid black", padding: "1rem" }}>
                    <h3>Today's Workout</h3>
                    <WorkoutCard workout={todaysWorkout} />
                </div>
            )}
        </DropdownContainer>
    );
}

export default LetsWorkout;
