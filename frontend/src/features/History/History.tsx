import {Workout} from "../../types/Workout.ts";
import WorkoutCardMini from "../../components/CardMini/WorkoutCardMini.tsx";
import {useState} from "react";


type HistoryProps = {
    formWorkout: Workout | null;
    setFormWorkout: (workout: Workout) => void,
    allWorkouts: Workout[];
    deleteWorkout: (deletedWorkout: Workout) => void;
};

function History(props: HistoryProps) {
    const {allWorkouts, formWorkout, setFormWorkout, deleteWorkout} = props;

    return (
        <>
            {allWorkouts.map((workout: Workout) => (
                <>
                    <WorkoutCardMini key={workout.id} miniWorkout={workout} formWorkout={formWorkout}
                                     setFormWorkout={setFormWorkout} deleteWorkout={deleteWorkout} /></>
            ))}
        </>
    );
}

export default History;