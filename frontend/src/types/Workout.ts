import { Exercise} from "./Exercise.ts";

export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    timestamp: number;
}
