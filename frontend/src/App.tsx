import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WorkoutCard from "./components/Card/WorkoutCard.tsx";
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import LetsWorkout from "./features/LetsWorkout/LetsWorkout.tsx";
import {AppContainer} from "./App.styles.ts";


function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newestWorkouts, setNewestWorkouts] = useState<Workout[]>([]);
  const [finishedWorkout, setFinishedWorkout] = useState<Workout | null>(null);


    const fetchWorkouts = () => {
        axios
            .get<Workout[]>("http://localhost:8080/api/workouts") // Ensure the response matches the type
            .then((response) => {
                const allWorkouts = response.data;
                const sortedNewestWorkouts = [...allWorkouts]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 4);
                setWorkouts(allWorkouts);
                setNewestWorkouts(sortedNewestWorkouts);
            })
            .catch((error) => {
                console.error("Error fetching Workouts from Backend", error);
            });
    };

    const addWorkout = (workout: Workout) => {
        axios
            .post<Workout>("http://localhost:8080/api/todo", workout)
            .then((response) => {
                setWorkouts((prevWorkouts) => [...prevWorkouts, response.data]); // Append the new workout to the workouts state
            })
            .catch((error) => {
                console.error("Error adding new workout:", error);
            });
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);



    return (
        <AppContainer>
            <Header />
            <main>
                <Routes>
                    <Route path="/home" />
                    <Route
                        path="/letsworkout"
                        element={<LetsWorkout newestWorkouts={newestWorkouts} finishedWorkout={finishedWorkout} setFinishedWorkout={setFinishedWorkout} addWorkout={addWorkout}/>}
                    />
                    <Route
                        path="/history"
                        element={
                            <>
                                {workouts.map((workout) => (
                                    <WorkoutCard key={workout.id} workout={workout} />
                                ))}
                            </>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </AppContainer>
    )
}

export default App
