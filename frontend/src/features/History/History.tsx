import {Workout} from "../../types/Workout.ts";
import WorkoutCardMini from "../../components/CardMini/WorkoutCardMini.tsx";


type HistoryProps = {
    workouts : Workout[]
};

function History(props: HistoryProps) {
    const { workouts } = props;
    return (
        <>
            {workouts.map((workout) => (
                <WorkoutCardMini key={workout.id} workout={workout}/>
            ))}
        </>
    );
}

export default History;