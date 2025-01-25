import {Workout} from "../../types/Workout.ts";
import {CardContainer} from "./WorkoutCardMini.styles.ts";
import Button from "../Button/Button.tsx";
import {useState} from "react";
import {ValueContainer, ValueContainerWrapper} from "../Card/WorkoutCard.styles.ts";
import WorkoutCardForm from "../Form/WorkoutCardForm.tsx";
import WorkoutCard from "../Card/WorkoutCard.tsx";

export interface CardProps {
    miniWorkout: Workout;
    formWorkout: Workout | null;
    setFormWorkout: (workout: Workout) => void,
}

function WorkoutCardMini(props: Readonly<CardProps>) {
    const {miniWorkout, formWorkout, setFormWorkout} = props;

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [details, setDetails] = useState<boolean>(false)

    const date: string = new Date(miniWorkout.timestamp * 1000).toDateString();

    function toggleDetails() {
        setDetails((prevState: boolean) => !prevState);
    }

    function handleEdit() {
        setIsEditing(true)
    }

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
                    <h2>{miniWorkout.name}</h2>
                    <Button label={"Details"} onClick={toggleDetails}/>
                </CardContainer>
            ) : (
                <> <WorkoutCard
                    miniWorkout={miniWorkout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                />
                    <Button label={"Close"} onClick={toggleDetails}/></>
            )}
        </>
    );
}

export default WorkoutCardMini