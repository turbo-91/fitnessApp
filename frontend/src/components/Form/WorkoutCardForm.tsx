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
    isEditing: Boolean;
}

function WorkoutCardForm(props: Readonly<FormCardProps>) {
    const { formWorkout, setFormWorkout, updateWorkout, setIsEditing, isEditing, workout } = props;

    useEffect(() => {
        setFormWorkout(workout); // Sync formWorkout with workout on mount/update
    }, [workout]);

    function handleSave() {
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
            <Button label={"save"} onClick={handleSave} />
            {formWorkout.exercises.map((exercise) => (
                <div key={exercise.uniqueIdentifier}>
                    <p>{exercise.name}:</p>
                    <ValueContainerWrapper>
                        <p>kg:</p>
                        <input
                            value={exercise.kg}
                            onChange={(e) =>
                                handleExerciseChange(exercise.uniqueIdentifier, "kg", Number(e.target.value))
                            }
                        />
                        <p>reps:</p>
                        {exercise.set.map((rep, setIndex) => (
                            <input
                                key={setIndex}
                                type="number"
                                value={rep}
                                onChange={(e) =>
                                    handleSetChange(exercise.uniqueIdentifier, setIndex, Number(e.target.value))
                                }
                            />
                        ))}
                    </ValueContainerWrapper>
                    <ValueContainerWrapper>
                        <p>notes:</p>
                        <input
                            type="text"
                            value={exercise.notes}
                            onChange={(e) =>
                                handleExerciseChange(exercise.uniqueIdentifier, "notes", e.target.value)
                            }
                        />
                    </ValueContainerWrapper>
                </div>
            ))}
        </CardContainer>
    );
}

export default WorkoutCardForm;
