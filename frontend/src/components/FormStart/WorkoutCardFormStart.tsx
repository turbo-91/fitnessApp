import { useEffect, useState } from "react";
import { Workout } from "../../types/Workout.ts";
import { CardContainer, ValueContainerWrapper } from "./WorkoutCardFormStart.styles.ts";
import Button from "../Button/Button.tsx";

export interface FormCardProps {
    workout: Workout;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
    addWorkout: (workout: Workout) => void;
}

function WorkoutCardFormStart(props: Readonly<FormCardProps>) {
    const {
        formWorkout,
        setFormWorkout,
        workout,
        addWorkout,
    } = props;

    const [workoutInProgress, setWorkoutInProgress] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
    const [summary, setSummary] = useState<Workout | null>(null);

    useEffect(() => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setFormWorkout((prevWorkout) => ({
            ...prevWorkout,
            timestamp: currentTimestamp,
        }));
    }, [setFormWorkout]);

    useEffect(() => {
        setFormWorkout(workout);
    }, [workout, setFormWorkout]);

    const displayedWorkout = workoutInProgress && currentWorkout ? currentWorkout : formWorkout;

    const date: string = new Date(displayedWorkout.timestamp * 1000).toDateString();

    const handleSaveWorkout = () => {
        const updatedWorkout = { ...formWorkout };
        addWorkout(updatedWorkout);
        setSummary(updatedWorkout); // Set the summary state to display instead of the form
    };

    const handleBackButtonClick = () => {
        window.location.reload(); // Refreshes the page
    };

    return (
        <CardContainer>
            {summary ? (
                // Render the summary instead of the form
                <div>
                    <h3>Workout Summary</h3>
                    <p>Name: {summary.name}</p>
                    <p>Date: {new Date(summary.timestamp * 1000).toDateString()}</p>
                    {summary.exercises.map((exercise) => (
                        <div key={exercise.uniqueIdentifier}>
                            <p><strong>{exercise.name}</strong></p>
                            <p>kg: {exercise.kg}</p>
                            <p>Reps: {exercise.set.join(", ")}</p>
                            {exercise.notes && <p>Notes: {exercise.notes}</p>}
                        </div>
                    ))}
                    <Button label="Back" onClick={handleBackButtonClick} />
                </div>
            ) : (
                // Render the form
                <>
                    <h2>
                        {date} - {displayedWorkout.name}
                    </h2>
                    <Button
                        label={"Save Workout"}
                        onClick={handleSaveWorkout}
                    />
                    {displayedWorkout.exercises.map((exercise) => (
                        <div key={exercise.uniqueIdentifier}>
                            <p>{exercise.name}:</p>
                            {(exercise.kg !== 0 || exercise.set.length > 0) && (
                                <ValueContainerWrapper>
                                    {exercise.kg !== 0 && (
                                        <>
                                            <p>kg:</p>
                                            <input
                                                value={exercise.kg}
                                                onChange={(e) =>
                                                    setFormWorkout({
                                                        ...formWorkout,
                                                        exercises: formWorkout.exercises.map((ex) =>
                                                            ex.uniqueIdentifier === exercise.uniqueIdentifier
                                                                ? { ...ex, kg: Number(e.target.value) }
                                                                : ex
                                                        ),
                                                    })
                                                }
                                            />
                                        </>
                                    )}
                                    {exercise.set.length > 0 && (
                                        <>
                                            <p>reps:</p>
                                            {exercise.set.map((rep, setIndex) => (
                                                <input
                                                    key={setIndex}
                                                    type="number"
                                                    value={rep}
                                                    onChange={(e) =>
                                                        setFormWorkout({
                                                            ...formWorkout,
                                                            exercises: formWorkout.exercises.map((ex) =>
                                                                ex.uniqueIdentifier === exercise.uniqueIdentifier
                                                                    ? {
                                                                        ...ex,
                                                                        set: ex.set.map((r, i) =>
                                                                            i === setIndex
                                                                                ? Number(e.target.value)
                                                                                : r
                                                                        ),
                                                                    }
                                                                    : ex
                                                            ),
                                                        })
                                                    }
                                                />
                                            ))}
                                        </>
                                    )}
                                </ValueContainerWrapper>
                            )}
                            {exercise.notes && exercise.notes.trim() !== "" && (
                                <ValueContainerWrapper>
                                    <p>notes:</p>
                                    <input
                                        type="text"
                                        value={exercise.notes}
                                        onChange={(e) =>
                                            setFormWorkout({
                                                ...formWorkout,
                                                exercises: formWorkout.exercises.map((ex) =>
                                                    ex.uniqueIdentifier === exercise.uniqueIdentifier
                                                        ? { ...ex, notes: e.target.value }
                                                        : ex
                                                ),
                                            })
                                        }
                                    />
                                </ValueContainerWrapper>
                            )}
                        </div>
                    ))}
                </>
            )}
        </CardContainer>
    );
}

export default WorkoutCardFormStart;
