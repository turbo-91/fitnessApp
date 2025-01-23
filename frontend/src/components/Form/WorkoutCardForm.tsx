import { Workout } from "../../types/Workout.ts";
import { CardContainer, ValueContainerWrapper } from "./WorkoutCardForm.styles.ts";

export interface FormCardProps {
    workout: Workout;
    setTodaysWorkout: (workout: Workout) => void; // Pass the state setter from parent
}

function WorkoutCardForm(props: Readonly<FormCardProps>) {
    const { workout, setTodaysWorkout } = props;

    const handleInputChange = (
        field: string,
        value: string | number,
        exerciseIndex?: number,
        setIndex?: number
    ) => {
        // Create a deep copy of the workout
        const updatedWorkout = { ...workout };
        if (exerciseIndex !== undefined) {
            if (setIndex !== undefined) {
                // Update specific set rep value
                updatedWorkout.exercises[exerciseIndex].set[setIndex] = Number(value);
            } else if (field === "kg" || field === "notes") {
                // Update kg or notes for an exercise
                (updatedWorkout.exercises[exerciseIndex] as any)[field] = value;
            }
        }

        setTodaysWorkout(updatedWorkout); // Update the workout in state
    };

    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date} - {workout.name}</h2>
            {workout.exercises.map((exercise, exerciseIndex) => (
                <div key={exercise.id}>
                    <p>{exercise.name}:</p>
                    <ValueContainerWrapper>
                        <p>kg:</p>
                        <input

                            value={exercise.kg}
                            onChange={(e) =>
                                handleInputChange("kg", Number(e.target.value), exerciseIndex)
                            }
                        />
                        <p>reps:</p>
                        {exercise.set.map((rep, setIndex) => (
                            <input
                                key={setIndex}
                                type="number"
                                value={rep}
                                onChange={(e) =>
                                    handleInputChange("set", Number(e.target.value), exerciseIndex, setIndex)
                                }
                            />
                        ))}
                    </ValueContainerWrapper>
                    <ValueContainerWrapper>
                        <p>notes:</p>
                        <input
                            type="text"
                            value={exercise.notes}
                            onChange={(e) =>
                                handleInputChange("notes", e.target.value, exerciseIndex)
                            }
                        />
                    </ValueContainerWrapper>
                </div>
            ))}
        </CardContainer>
    );
}

export default WorkoutCardForm;
