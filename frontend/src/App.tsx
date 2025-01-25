import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import LetsWorkout from "./features/LetsWorkout/LetsWorkout.tsx";
import {AppContainer} from "./App.styles.ts";
import History from "./features/History/History.tsx";


function App() {
    const [formWorkout, setFormWorkout] = useState<Workout | null>(null);
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
    const [dropDownWorkouts, setDropdownWorkouts] = useState<Workout[]>([]);

    const fetchWorkouts = () => {
        axios
            .get<Workout[]>("http://localhost:8080/api/workouts") // Ensure the response matches the type
            .then((response) => {
                const allWorkouts = response.data;
                const sortedNewestWorkouts = [...allWorkouts]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 4);
                setAllWorkouts(allWorkouts);
                setDropdownWorkouts(sortedNewestWorkouts);
            })
            .catch((error) => {
                console.error("Error fetching Workouts from Backend", error);
            });
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const deleteWorkout = (workout: Workout) => {
        console.log("Deleting workout with ID:", workout.id);
        axios
            .delete(`http://localhost:8080/api/workouts/${workout.id}`)
            .then(() => {
                setAllWorkouts((prevWorkouts) =>
                    prevWorkouts.filter((w) => w.id !== workout.id)
                );
                console.log("Delete successful");
            })
            .catch((error) => {
                console.error("Error deleting workout:", error);
            });
    };


    return (
        <AppContainer>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"

                    />
                    <Route
                        path="/history"
                        element={
                            <History formWorkout={formWorkout} setFormWorkout={setFormWorkout} allWorkouts={allWorkouts}
                            deleteWorkout={deleteWorkout}
                            />
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </AppContainer>
    )
}

export default App
