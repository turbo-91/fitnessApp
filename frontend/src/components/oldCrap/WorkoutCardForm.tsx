import {Workout} from "../../types/Workout.ts";
import {CardContainer, ValueContainerWrapper} from "./WorkoutCardForm.styles.ts";

export interface FormCardProps {
    thisWorkout: Workout | null;
    setThisWorkout: (workout: Workout) => void,
}

function WorkoutCardForm(props: Readonly<FormCardProps>) {
    const {thisWorkout, setThisWorkout} = props;

    const handleInputChange = (
        field: string,
        value: string | number,
        exerciseIndex?: number,
        setIndex?: number
    ) => {

        console.log("thisWorkout in handleInputChange", thisWorkout)

        if (!thisWorkout) return;


        // Create a deep copy of the current workout
        const updatedWorkout = {
            ...thisWorkout,
            exercises: thisWorkout.exercises.map((exercise, index) => {
                if (index === exerciseIndex) {
                    const updatedExercise = { ...exercise };

                    if (setIndex !== undefined) {
                        updatedExercise.set = [...exercise.set];
                        updatedExercise.set[setIndex] = Number(value); // Update set value
                    } else {
                        updatedExercise[field] = value; // Update other fields
                    }
                    return updatedExercise;
                }
                return exercise;
            }),
        };

        // Update the state with the new workout
        setThisWorkout(updatedWorkout);
    };

    const date: string = new Date(thisWorkout.timestamp * 1000).toDateString();

    return (
        <CardContainer>
            <h2>{date} - {thisWorkout.name}</h2>
            {thisWorkout.exercises.map((exercise, exerciseIndex) => (
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
