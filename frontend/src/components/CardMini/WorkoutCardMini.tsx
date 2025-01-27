import {Workout} from "../../types/Workout.ts";
import {CardContainer} from "./WorkoutCardMini.styles.ts";
import Button from "../Button/Button.tsx";
import {useState} from "react";
import WorkoutCard from "../Card/WorkoutCard.tsx";

export interface CardMiniProps {
    workout: Workout;
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void,
    deleteWorkout: (deletedWorkout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    toggleDetails: () => void;
    details: boolean;
    setDetails: (details: boolean) => void;
}

function WorkoutCardMini(props: Readonly<CardMiniProps>) {
    const {workout, formWorkout, setFormWorkout, deleteWorkout, updateWorkout, isEditing, setIsEditing,
        todaysWorkout, setTodaysWorkout, details, setDetails, toggleDetails } = props;

    const date: string = new Date(workout.timestamp * 1000).toDateString();




    // function handleSave() {
    //     if (workout) {
    //         updateWorkout(workout); // Update the workout via prop
    //         setIsEditing(false); // Exit edit mode
    //     } else {
    //         console.error("No workout to save!");
    //     }
    // }
    //
    // function handleDelete () {
    //     if (workout) {
    //         deleteWorkout(workout); // Update the workout via prop
    //         setIsEditing(false); // Exit edit mode
    //     } else {
    //         console.error("No workout to delete!");
    //     }
    // }

    return (
        <>
            {!details ? (
                <CardContainer>
                    <h2>{date}</h2>
                    <h2>{workout.name}</h2>
                    <Button label={"Details"} onClick={toggleDetails}/>
                </CardContainer>
            ) : (
                <> <WorkoutCard
                    workout={workout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                    toggleDetails={toggleDetails}
                    deleteWorkout={deleteWorkout}
                    updateWorkout={updateWorkout}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    todaysWorkout={todaysWorkout} setTodaysWorkout={setTodaysWorkout}
                    details={details} setDetails={setDetails}
                />
                </>
            )}
        </>
    );
}

export default WorkoutCardMini