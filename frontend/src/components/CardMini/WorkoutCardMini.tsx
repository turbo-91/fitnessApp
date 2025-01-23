import {Workout} from "../../types/Workout.ts";
import {CardContainer} from "./WorkoutCardMini.styles.ts";

export interface CardProps {
workout: Workout;
}

function WorkoutCardMini(props: Readonly<CardProps>) {
    const { workout } = props;
    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date}</h2>
            <h2>{workout.name}</h2>
        </CardContainer>
    );
}

export default WorkoutCardMini;