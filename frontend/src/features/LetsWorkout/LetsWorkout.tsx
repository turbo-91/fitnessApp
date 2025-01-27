import {DropdownContainer, Select} from "../../components/Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import Button from "../../components/Button/Button.tsx";
import WorkoutCardForm from "../../components/Form/WorkoutCardForm.tsx";
import WorkoutCard from "../../components/Card/WorkoutCard.tsx";
import WorkoutCardFormStart from "../../components/FormStart/WorkoutCardFormStart.tsx";


type LetsWorkoutProps = {
    dropdownWorkouts: Workout[];
    formWorkout: Workout;
    setFormWorkout: (workout: Workout) => void;
    addWorkout: (workout: Workout) => void;
    updateWorkout: (updatedWorkout: Workout) => void;
    deleteWorkout: (deletedWorkout: Workout) => void;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
    todaysWorkout: Workout;
    setTodaysWorkout: (workout: Workout) => void;
    toggleDetails: () => void;
    details: boolean;
    setDetails: (details: boolean) => void;
};

function LetsWorkout(props: LetsWorkoutProps) {
    const {
        dropdownWorkouts,
        isEditing,
        setIsEditing,
        todaysWorkout,
        setTodaysWorkout,
        addWorkout,
        formWorkout,
        setFormWorkout,
        updateWorkout,
        deleteWorkout,
        toggleDetails,
        details,
        setDetails
    } = props;

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedWorkout = dropdownWorkouts.find(workout => workout.id === event.target.value);
        if (selectedWorkout) {
            // Update the timestamp to the current date (Unix timestamp)
            const updatedWorkout = {
                ...selectedWorkout,
                timestamp: Math.floor(Date.now() / 1000), // Convert to Unix timestamp in seconds
            };
            setTodaysWorkout(updatedWorkout);
        }
    };


    return (
        <DropdownContainer>
            <Select onChange={handleDropdownChange} value={todaysWorkout?.id || ""}>
                <option value="" disabled>Where do you want to pick off?</option>
                {dropdownWorkouts.map(workout => (
                    <option key={workout.id} value={workout.id}>
                        {`${workout.name} (${new Date(workout.timestamp * 1000).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })})`}
                    </option>
                ))}
            </Select>
            {todaysWorkout && <WorkoutCardFormStart
                workout={todaysWorkout}
                formWorkout={formWorkout}
                setFormWorkout={setFormWorkout}
                updateWorkout={updateWorkout}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                todaysWorkout={todaysWorkout}
                setTodaysWorkout={setTodaysWorkout}
                addWorkout={addWorkout}
            />}
        </DropdownContainer>
    );
}

export default LetsWorkout;
