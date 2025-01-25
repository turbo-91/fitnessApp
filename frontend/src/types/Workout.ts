import { Exercise} from "./Exercise.ts";
import {Cardio} from "./Cardio.ts";

export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    cardio?: Cardio;
    notes: string;
    timestamp: number;
}
