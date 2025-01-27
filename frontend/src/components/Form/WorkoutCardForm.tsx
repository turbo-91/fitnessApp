import { useEffect } from "react";
import { Workout } from "../../types/Workout.ts";
import { CardContainer, ValueContainerWrapper } from "./WorkoutCardForm.styles.ts";
import Button from "../Button/Button.tsx";
import { Exercise } from "../../types/Exercise.ts";

export interface FormCardProps {
    workout: Workout;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
}

function WorkoutCardForm(props: Readonly<FormCardProps>) {
    const { formWorkout, setFormWorkout, updateWorkout, setIsEditing, workout, todaysWorkout, setTodaysWorkout } = props;

    useEffect(() => {
        console.log("workout on mount FORM", workout);
        console.log("formworkout on mount FORM", formWorkout)
    }, []);

    useEffect(() => {
        setFormWorkout(workout); // Initialize `formWorkout` when entering edit mode
    }, [workout, setFormWorkout]);

    function handleSave() {
        // Validate the workout before saving
        if (!formWorkout.name || formWorkout.exercises.length === 0) {
            console.error("Workout must have a name and at least one exercise.");
            return;
        }
        updateWorkout(formWorkout); // Send updated workout to API
        setIsEditing(false); // Exit edit mode
    }

    function handleExerciseChange(exerciseId: string, field: keyof Exercise, value: any) {
        const updatedExercises = formWorkout.exercises.map((exercise) =>
            exercise.uniqueIdentifier === exerciseId
                ? { ...exercise, [field]: value }
                : exercise
        );
        setFormWorkout({ ...formWorkout, exercises: updatedExercises });
    }

    function handleSetChange(exerciseId: string, setIndex: number, value: number) {
        const updatedExercises = formWorkout.exercises.map((exercise) =>
            exercise.uniqueIdentifier === exerciseId
                ? {
                    ...exercise,
                    set: exercise.set.map((rep, index) =>
                        index === setIndex ? value : rep
                    ),
                }
                : exercise
        );
        setFormWorkout({ ...formWorkout, exercises: updatedExercises });
    }

    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date} - {workout.name}</h2>
            <Button label={"Save"} onClick={handleSave} />
            <Button label={"Cancel"} onClick={() => setIsEditing(false)} />
            {formWorkout.exercises.map((exercise) => (
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
                                            handleExerciseChange(
                                                exercise.uniqueIdentifier,
                                                "kg",
                                                Number(e.target.value)
                                            )
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
                                                handleSetChange(
                                                    exercise.uniqueIdentifier,
                                                    setIndex,
                                                    Number(e.target.value)
                                                )
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
                                    handleExerciseChange(
                                        exercise.uniqueIdentifier,
                                        "notes",
                                        e.target.value
                                    )
                                }
                            />
                        </ValueContainerWrapper>
                    )}
                </div>
            ))}
        </CardContainer>
    );
}

export default WorkoutCardForm;
