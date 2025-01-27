import {Workout} from "../../types/Workout.ts";
import WorkoutCardMini from "../../components/CardMini/WorkoutCardMini.tsx";


type HistoryProps = {
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void,
    allWorkouts: Workout[];
    deleteWorkout: (deletedWorkout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
};

function History(props: HistoryProps) {
    const {allWorkouts, formWorkout, setFormWorkout, deleteWorkout, updateWorkout, isEditing, setIsEditing} = props;

    return (
        <>
            {allWorkouts.map((workout: Workout, index: number) => (
                <WorkoutCardMini
                    key={`${workout.id}-${index}`}
                    miniWorkout={workout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                    updateWorkout={updateWorkout}
                    deleteWorkout={deleteWorkout}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            ))}
        </>
    );
}

export default History;