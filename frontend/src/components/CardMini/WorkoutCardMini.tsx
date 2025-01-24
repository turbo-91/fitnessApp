import {Workout} from "../../types/Workout.ts";
import {CardContainer} from "./WorkoutCardMini.styles.ts";
import Button from "../Button/Button.tsx";
import {useState} from "react";
import {ValueContainer, ValueContainerWrapper} from "../Card/WorkoutCard.styles.ts";
import WorkoutCardForm from "../Form/WorkoutCardForm.tsx";

export interface CardProps {
    workout: Workout;
    updateWorkout: (updatedWorkout: Workout) => void
    deleteWorkout: (deletedWorkout: Workout) => void;
    thisWorkout: Workout | null;
    setThisWorkout: (workout: Workout) => void,
}

function WorkoutCardMini(props: Readonly<CardProps>) {
    const { workout, updateWorkout, deleteWorkout, thisWorkout, setThisWorkout } = props;
    const [details, setDetails] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const date: string = new Date(workout.timestamp * 1000).toDateString();

    function toggleDetails() {
        setDetails((prevState: boolean) => !prevState);
    }

    function handleEdit () {
        setIsEditing(true)
    }

    function handleSave() {
        if (workout) {
            updateWorkout(workout); // Update the workout via prop
            setIsEditing(false); // Exit edit mode
        } else {
            console.error("No workout to save!");
        }
    }

    function handleDelete () {
        if (workout) {
            deleteWorkout(workout); // Update the workout via prop
            setIsEditing(false); // Exit edit mode
        } else {
            console.error("No workout to delete!");
        }
    }

    return (
        <CardContainer>

            {isEditing ? (
                // Render only the form and buttons when editing
                <>
                    <WorkoutCardForm thisWorkout={thisWorkout} setThisWorkout={setThisWorkout}/>
                    <Button label={"save"} onClick={handleSave}/>
                    <Button label={"delete"} onClick={handleDelete}/>
                </>
            ) : (
                // Render workout details and buttons when not editing
                <>
                    <h2>{date}</h2>
                    <h2>{workout.name}</h2>
                    <Button label={"details"} onClick={toggleDetails}/>
                    {details && (
                        <>
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
                            <Button label={"edit"} onClick={handleEdit}/>
                            <Button label={"delete"} onClick={handleDelete}/>
                        </>
                    )}
                </>
            )}
        </CardContainer>
    );
}

export default WorkoutCardMini;