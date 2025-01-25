import {DropdownContainer, Select} from "../../components/Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import Button from "../../components/Button/Button.tsx";
import WorkoutCardForm from "../../components/Form/WorkoutCardForm.tsx";
import WorkoutCard from "../../components/Card/WorkoutCard.tsx";


type LetsWorkoutProps = {
    newestWorkouts: Workout[];
    finishedWorkout: Workout | null;
    setFinishedWorkout: (workout: Workout | null) => void;
    addWorkout: (workout: Workout) => void;
    todaysWorkout: Workout | null;
    setTodaysWorkout: (workout: Workout | null) => void;
    thisWorkout: Workout | null;
    setThisWorkout: (workout: Workout) => void,
};

function LetsWorkout(props: LetsWorkoutProps) {
    const { newestWorkouts, finishedWorkout, setFinishedWorkout, addWorkout, todaysWorkout, setTodaysWorkout, thisWorkout, setThisWorkout } = props;
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);


    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkoutId(event.target.value);
    };

    const handleStartButton = () => {
        if (!selectedWorkout) return;

        // Create a copy of the selected workout, update the timestamp, toggle isEditing
        setIsEditing(!isEditing);
        const updatedWorkout: Workout = {
            ...selectedWorkout,
            timestamp: Math.floor(Date.now() / 1000), // Current Unix timestamp in seconds
        };
        setTodaysWorkout(updatedWorkout);
    };

    const handleFinishButton = () => {
        if (!todaysWorkout) return;

        // Store the finished workout in a separate state
        // setFinishedWorkout(todaysWorkout);
        addWorkout(todaysWorkout)
        console.log("Workout sent to backend:", todaysWorkout);
        setFinishedWorkout(todaysWorkout)

        // Reset today's workout and the selection
        setTodaysWorkout(null);
        setSelectedWorkoutId("");
    };

    const handleBackToHome = () => {
        window.location.reload();
    };

    const selectedWorkout = newestWorkouts.find((w) => w.id === selectedWorkoutId) || null;


    return (
        <DropdownContainer>
            {!todaysWorkout && (
                <>
                    {/* Dropdown to select a workout */}
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

                    {/* Start button */}
                    {selectedWorkout && (
                        <div>
                            {/* Display the selected workout with the updated timestamp */}
                            <WorkoutCard
                                workout={selectedWorkout}
                                thisWorkout={thisWorkout}
                                setThisWorkout={setThisWorkout}
                            />
                            <Button
                                label={"Start Workout"}
                                onClick={handleStartButton}

                            />
                        </div>
                    )}
                </>
            )}

            {todaysWorkout && (
                <>
                    {/* Render the form */}
                    <WorkoutCardForm
                        thisWorkout={todaysWorkout}
                        setThisWorkout={setThisWorkout}
                        setTodaysWorkout={setTodaysWorkout} // Pass state setter to update directly from the form
                    />
                    {/* Finish button */}
                    <Button
                        label={"Finish Workout"}
                        onClick={handleFinishButton}

                    />
                </>
            )}

            {finishedWorkout && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Finished Workout</h2>
                    <p>Workout Name: {finishedWorkout.name}</p>
                    <p>Date: {new Date(finishedWorkout.timestamp * 1000).toDateString()}</p>
                    <ul>
                        {finishedWorkout.exercises.map((exercise) => (
                            <li key={exercise.id}>
                                <strong>{exercise.name}</strong> - {exercise.kg} kg,{" "}
                                {exercise.set.join(", ")} reps
                            </li>
                        ))}
                    </ul>
                    <Button
                        label={"back to home"}
                        onClick={handleBackToHome}

                    />
                </div>
            )}
        </DropdownContainer>
    );
}

export default LetsWorkout;
