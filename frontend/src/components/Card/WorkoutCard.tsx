import {Workout} from "../../types/Workout.ts";
import {CardContainer, ValueContainer, ValueContainerWrapper} from "./WorkoutCard.styles.ts";
import {useState} from "react";
import Button from "../Button/Button.tsx";
import WorkoutCardForm from "../Form/WorkoutCardForm.tsx";

export interface CardProps {
    workout: Workout;
    formWorkout: Workout | null;
    setFormWorkout: (workout: Workout) => void,
    details: boolean;
    toggleDetails: () => void,
    deleteWorkout: (deletedWorkout: Workout) => void;
}

function WorkoutCard(props: Readonly<CardProps>) {
    const { workout, formWorkout, setFormWorkout, toggleDetails, deleteWorkout } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false)


    function handleEdit() {
        setIsEditing(true)
    }

    function handleDelete () {
        if (workout) {
            deleteWorkout(workout);
            setIsEditing(false); 
        } else {
            console.error("No workout to delete!");
        }
    };

    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <>
            {!isEditing ? (
                <CardContainer>
                    <h2>{date} - {workout.name}</h2>
                    <Button label={"Close"} onClick={toggleDetails} />
                    <Button label={"Edit"} onClick={handleEdit} />
                    <Button label={"Delete"} onClick={() => handleDelete()} />
                    {workout.exercises.map((exercise) => (
                        <div key={exercise.id}>
                            <p>{exercise.name}: </p>
                            <ValueContainerWrapper>
                                <p>kg:</p>
                                <ValueContainer>{exercise.kg}</ValueContainer>
                                <p>reps:</p>
                                {exercise.set.map((rep: number, index: number) => (
                                    <ValueContainer key={index}>{rep}</ValueContainer>
                                ))}
                            </ValueContainerWrapper>
                            <ValueContainerWrapper>
                                <p>notes:</p>
                                <ValueContainer>{exercise.notes}</ValueContainer>
                            </ValueContainerWrapper>
                        </div>
                    ))}
                </CardContainer>
            ) : (
                <WorkoutCardForm
                    formWorkout={workout}
                    setFormWorkout={setFormWorkout}
                />
            )}
        </>
    );}

export default WorkoutCard;