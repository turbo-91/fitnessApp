import {Workout} from "../../types/Workout.ts";
import WorkoutCardMini from "../../components/CardMini/WorkoutCardMini.tsx";


type HistoryProps = {
    workouts: Workout[],
    updateWorkout: (updatedWorkout: Workout) => void;
    todaysWorkout: Workout | null;
    setTodaysWorkout: (workout: Workout | null) => void;
    deleteWorkout: (deletedWorkout: Workout) => void;
    thisWorkout: Workout | null;
    setThisWorkout: (workout: Workout) => void,
};

function History(props: HistoryProps) {
    const {workouts, updateWorkout, todaysWorkout, setTodaysWorkout, deleteWorkout, thisWorkout, setThisWorkout} = props;

    return (
        <>
            {workouts.map((workout) => (
                <WorkoutCardMini key={workout.id} workout={workout} updateWorkout={updateWorkout}
                                 setTodaysWorkout={setTodaysWorkout} todaysWorkout={todaysWorkout}
                                 deleteWorkout={deleteWorkout} thisWorkout={thisWorkout}
                                 setThisWorkout={setThisWorkout}/>
            ))}
        </>
    );
}

export default History;