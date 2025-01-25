import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
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
                console.log("ids in response?", response.data)
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
        console.log("allWorkouts after fetch", allWorkouts)
    }, []);

    const updateWorkout = (workout: Workout) => {
        console.log("workout before update", workout);
        axios
            .put(`http://localhost:8080/api/workouts/${workout.id}`, workout)
            .then(response => {
                const updatedWorkout = response.data;
                console.log("Update successful:", updatedWorkout);

                // Update the workouts state
                setAllWorkouts(prevWorkouts =>
                    prevWorkouts.map(w => (w.id === updatedWorkout.id ? updatedWorkout : w))
                );
            })
            .catch(error => {
                console.error("Error updating workout:", error);
            });
    };

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
                                     updateWorkout={updateWorkout} deleteWorkout={deleteWorkout}
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
