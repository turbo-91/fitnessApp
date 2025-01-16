import {Workout} from "../../types/Workout.ts";
import {CardContainer, ValueContainer, ValueContainerWrapper} from "./WorkoutCard.styles.ts";

export interface CardProps {
workout: Workout;
}

function WorkoutCard(props: Readonly<CardProps>) {
    const { workout } = props;
    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date} - {workout.name}</h2>
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
                    <ValueContainerWrapper><p>notes:</p><ValueContainer>{exercise.notes}</ValueContainer></ValueContainerWrapper>
                </div>
            ))}
        </CardContainer>
    );
}

export default WorkoutCard;