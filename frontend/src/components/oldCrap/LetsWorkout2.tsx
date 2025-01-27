import {DropdownContainer, Select} from "../Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import Button from "../Button/Button.tsx";
import WorkoutCardForm from "../Form/WorkoutCardForm.tsx";
import WorkoutCard from "../Card/WorkoutCard.tsx";


type LetsWorkoutProps = {
    dropdownWorkouts: Workout[];
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void;
    addWorkout: (workout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    deleteWorkout: (deletedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
    toggleDetails: () => void;
    details: boolean;
    setDetails: (details: boolean) => void;
};

function LetsWorkout(props: LetsWorkoutProps) {
    const { dropdownWorkouts, isEditing, setIsEditing, todaysWorkout, setTodaysWorkout, addWorkout, formWorkout,
        setFormWorkout, updateWorkout, deleteWorkout, toggleDetails, details, setDetails } = props;
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
    const [isSelected, setIsSelected] = useState<boolean>(false);



    const handleSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkoutId(event.target.value);
    };

    const handleStartButton = () => {
        const updatedWorkout: Workout = {
            ...selectedWorkout,
            timestamp: Math.floor(Date.now() / 1000), // Current Unix timestamp in seconds
        };
        setTodaysWorkout(updatedWorkout);
        setIsEditing(!isEditing);
    };

    const handleFinishButton = () => {
        addWorkout(todaysWorkout)
        console.log("Workout sent to backend:", todaysWorkout);

        // Reset today's workout and the selection
        setSelectedWorkoutId("");
    };

    const handleBackToHome = () => {
        window.location.reload();
    };

    const selectedWorkout = dropdownWorkouts.find((w) => w.id === selectedWorkoutId) || null;




    return (
        <DropdownContainer>
            {!isSelected && (
                <>
                    {/* Dropdown to select a workout */}
                    <Select value={selectedWorkoutId} onChange={handleSelection}>
                        <option value="" disabled>
                            Where do you want to pick up today?
                        </option>
                        {dropdownWorkouts.map((workout) => {
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

                            <WorkoutCardForm
                                workout={selectedWorkout}
                                formWorkout={formWorkout}
                                setFormWorkout={setFormWorkout}
                                updateWorkout={updateWorkout}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                todaysWorkout={todaysWorkout} setTodaysWorkout={setTodaysWorkout}
                            />
                        </div>
                    )}
                </>
            )}

            {/*{todaysWorkout && (*/}
            {/*    <>*/}
            {/*        /!* Render the form *!/*/}
            {/*        <WorkoutCardFormStart*/}
            {/*            workout={todaysWorkout}*/}
            {/*            formWorkout={formWorkout}*/}
            {/*            setFormWorkout={setFormWorkout}*/}
            {/*            updateWorkout={updateWorkout}*/}
            {/*            isEditing={isEditing}*/}
            {/*            setIsEditing={setIsEditing}*/}
            {/*            todaysWorkout={todaysWorkout} setTodaysWorkout={setTodaysWorkout}*/}
            {/*        />*/}
            {/*        /!* Finish button *!/*/}
            {/*        <Button*/}
            {/*            label={"Finish Workout"}*/}
            {/*            onClick={handleFinishButton}*/}

            {/*        />*/}
            {/*    </>*/}
            {/*)}*/}

            {/*{finishedWorkout && (*/}
            {/*    <div style={{ marginTop: "2rem" }}>*/}
            {/*        <h2>Finished Workout</h2>*/}
            {/*        <p>Workout Name: {finishedWorkout.name}</p>*/}
            {/*        <p>Date: {new Date(finishedWorkout.timestamp * 1000).toDateString()}</p>*/}
            {/*        <ul>*/}
            {/*            {finishedWorkout.exercises.map((exercise) => (*/}
            {/*                <li key={exercise.id}>*/}
            {/*                    <strong>{exercise.name}</strong> - {exercise.kg} kg,{" "}*/}
            {/*                    {exercise.set.join(", ")} reps*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*        <Button*/}
            {/*            label={"back to home"}*/}
            {/*            onClick={handleBackToHome}*/}

            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
        </DropdownContainer>
    );
}

export default LetsWorkout;
