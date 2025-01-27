import {Workout} from "../../types/Workout.ts";
import WorkoutCardMini from "../../components/CardMini/WorkoutCardMini.tsx";


type HistoryProps = {
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void,
    allWorkouts: Workout[];
    deleteWorkout: (deletedWorkout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    details: boolean;
    setDetails: (details: boolean) => void;
    toggleDetails: () => void;
};

function History(props: HistoryProps) {
    const {allWorkouts, formWorkout, setFormWorkout, deleteWorkout, updateWorkout, isEditing, setIsEditing,
        todaysWorkout, setTodaysWorkout, details, setDetails, toggleDetails } = props;

    return (
        <>
            {allWorkouts.map((workout: Workout, index: number) => (
                <WorkoutCardMini
                    key={`${workout.id}-${index}`}
                    workout={workout}
                    formWorkout={formWorkout}
                    setFormWorkout={setFormWorkout}
                    updateWorkout={updateWorkout}
                    deleteWorkout={deleteWorkout}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    todaysWorkout={todaysWorkout} setTodaysWorkout={setTodaysWorkout}
                    details={details} setDetails={setDetails}
                    toggleDetails={toggleDetails}
                />
            ))}
        </>
    );
}

export default History;