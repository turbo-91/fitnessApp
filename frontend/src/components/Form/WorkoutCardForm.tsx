import {Workout} from "../../types/Workout.ts";
import {CardContainer, ValueContainerWrapper} from "./WorkoutCardForm.styles.ts";
import Button from "../Button/Button.tsx";

export interface FormCardProps {
    formWorkout: Workout | null;
    setFormWorkout: (workout: Workout) => void,
}

function WorkoutCardForm(props: Readonly<FormCardProps>) {
    const {formWorkout, setFormWorkout} = props;

    function handleSave () {
        setFormWorkout(null);
    };

    const date: string = new Date(formWorkout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date} - {formWorkout.name}</h2>
            <Button label={"save"} onClick={handleSave}/>
            {formWorkout.exercises.map((exercise, exerciseIndex) => (
                <div key={exercise.id}>
                    <p>{exercise.name}:</p>
                    <ValueContainerWrapper>
                        <p>kg:</p>
                        <input

                            value={exercise.kg}
                        />
                        <p>reps:</p>
                        {exercise.set.map((rep, setIndex) => (
                            <input
                                key={setIndex}
                                type="number"
                                value={rep}
                            />
                        ))}
                    </ValueContainerWrapper>
                    <ValueContainerWrapper>
                        <p>notes:</p>
                        <input
                            type="text"
                            value={exercise.notes}
                        />
                    </ValueContainerWrapper>
                </div>
            ))}
        </CardContainer>
    );
}

export default WorkoutCardForm;
