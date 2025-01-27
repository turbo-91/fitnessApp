import {Workout} from "../../types/Workout.ts";
import {CardContainer} from "./WorkoutCardMini.styles.ts";
import Button from "../Button/Button.tsx";
import {useState} from "react";
import WorkoutCard from "../Card/WorkoutCard.tsx";

export interface CardMiniProps {
    miniWorkout: Workout;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void,
    deleteWorkout: (deletedWorkout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
}

function WorkoutCardMini(props: Readonly<CardMiniProps>) {
    const {miniWorkout, formWorkout, setFormWorkout, deleteWorkout, updateWorkout, isEditing, setIsEditing } = props;
    const [details, setDetails] = useState<boolean>(false)

    const date: string = new Date(miniWorkout.timestamp * 1000).toDateString();

    function toggleDetails() {
        setDetails((prevState: boolean) => !prevState);
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
                    workout={miniWorkout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                    toggleDetails={toggleDetails}
                    deleteWorkout={deleteWorkout}
                    updateWorkout={updateWorkout}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
                </>
            )}
        </>
    );
}

export default WorkoutCardMini