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
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newestWorkouts, setNewestWorkouts] = useState<Workout[]>([]);
  const [thisWorkout, setThisWorkout] = useState<Workout | null>(null);
  const [finishedWorkout, setFinishedWorkout] = useState<Workout | null>(null);
  const [todaysWorkout, setTodaysWorkout] = useState<Workout | null>(null);


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
            .post<Workout>("http://localhost:8080/api/workouts", workout)
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

    const updateWorkout = (workout: Workout) => {
        console.log("workout before update", workout);
        axios
            .put(`http://localhost:8080/api/workouts/${workout.id}`, workout)
            .then(response => {
                const updatedWorkout = response.data;
                console.log("Update successful:", updatedWorkout);

                // Update the workouts state
                setWorkouts(prevWorkouts =>
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
                setWorkouts((prevWorkouts) =>
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
                        element={<LetsWorkout setTodaysWorkout={setTodaysWorkout} todaysWorkout={todaysWorkout}
                                              newestWorkouts={newestWorkouts} finishedWorkout={finishedWorkout}
                                              setFinishedWorkout={setFinishedWorkout} addWorkout={addWorkout}
                                              thisWorkout={thisWorkout} setThisWorkout={setThisWorkout}/>}
                    />
                    <Route
                        path="/history"
                        element={
                            <History workouts={workouts} updateWorkout={updateWorkout} setTodaysWorkout={setTodaysWorkout}
                                     todaysWorkout={todaysWorkout} deleteWorkout={deleteWorkout}
                                     thisWorkout={thisWorkout} setThisWorkout={setThisWorkout}/>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </AppContainer>
    )
}

export default App
