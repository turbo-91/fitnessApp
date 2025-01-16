import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WorkoutCard from "./components/Card/WorkoutCard.tsx";
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

    const fetchWorkouts = () => {
        axios
            .get<Workout[]>("http://localhost:8080/api/workouts") // Ensure the response matches the type
            .then((response) => {
                setWorkouts(response.data); // Save the fetched data
            })
            .catch((error) => {
                console.error("Error fetching Workouts from Backend", error);
            });
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    console.log("workouts in App", workouts)


    return (
        <Routes>
        <Route path="/history" element={<>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout}/>
            ))}
        </>}/>

        </Routes>
    )
}

export default App
