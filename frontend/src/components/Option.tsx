import {Workout} from "../types/Workout.ts";
import {Option} from "./Header/Option.styles.ts";


export interface OptionProps {
    workout: Workout;
}

function OptionElement(props: Readonly<OptionProps>) {
    const { workout } = props;
    const date: string = new Date(workout.timestamp * 1000).toDateString();

    return (
        <Option>{date} - {workout.name}</Option>
    );
}

export default OptionElement;