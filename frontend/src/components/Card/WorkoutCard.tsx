import { Workout } from "../../types/Workout.ts";
import { CardContainer, ValueContainer, ValueContainerWrapper } from "./WorkoutCard.styles.ts";
import { useEffect, useState } from "react";
import Button from "../Button/Button.tsx";
import WorkoutCardForm from "../Form/WorkoutCardForm.tsx";

export interface CardProps {
    workout: Workout;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void;
    toggleDetails: () => void;
    deleteWorkout: (deletedWorkout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
}

function WorkoutCard(props: Readonly<CardProps>) {
    const { workout, formWorkout, setFormWorkout, toggleDetails, deleteWorkout, updateWorkout } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        console.log("workout on mount CARD", workout);
        console.log("formworkout on mount CARD", formWorkout)
    }, []);


    useEffect(() => {
        if (isEditing) {
            setFormWorkout(workout); // Sync `formWorkout` with `workout` when entering edit mode
        }
    }, [isEditing, workout, setFormWorkout]);

    function handleEdit() {
        console.log("Entering edit mode with workout:", workout);
        console.log("Current formWorkout:", formWorkout);
        setIsEditing(true);
    }

    function handleDelete() {
        if (workout) {
            deleteWorkout(workout);
            setIsEditing(false); // Ensure edit mode is exited
        } else {
            console.error("No workout to delete!");
        }
    }

    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <>
            {!isEditing ? (
                <CardContainer>
                    <h2>{date} - {workout.name}</h2>
                    <Button label={"Close"} onClick={toggleDetails} />
                    <Button label={"Edit"} onClick={handleEdit} />
                    <Button label={"Delete"} onClick={handleDelete} />
                    {workout.exercises.map((exercise) => (
                        <div key={exercise.uniqueIdentifier}>
                            <p>{exercise.name}:</p>
                            {exercise.kg !== 0 && (
                                <ValueContainerWrapper>
                                    <p>kg:</p>
                                    <ValueContainer>{exercise.kg}</ValueContainer>
                                </ValueContainerWrapper>
                            )}
                            {exercise.set.length > 0 && (
                                <ValueContainerWrapper>
                                    <p>reps:</p>
                                    {exercise.set.map((rep: number, index: number) => (
                                        <ValueContainer key={index}>{rep}</ValueContainer>
                                    ))}
                                </ValueContainerWrapper>
                            )}
                            {exercise.notes && exercise.notes.trim() !== "" && (
                                <ValueContainerWrapper>
                                    <p>notes:</p>
                                    <ValueContainer>{exercise.notes}</ValueContainer>
                                </ValueContainerWrapper>
                            )}
                        </div>
                    ))}
                </CardContainer>
            ) : (
                <WorkoutCardForm
                    workout={workout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                    updateWorkout={updateWorkout}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    );
}

export default WorkoutCard;
