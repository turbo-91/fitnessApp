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

    const updateWorkout = (updatedWorkout: Workout) => {
        const workoutToUpdate = workouts.find((workout: Workout) => workout.id === updatedWorkout.id);
        if (!workoutToUpdate) return;

        axios
            .put<Workout>(`http://localhost:8080/api/workouts/${workoutToUpdate.id}`, updatedWorkout)
            .then((response) => {
                setWorkouts((prevWorkouts) =>
                    prevWorkouts.map((workout: Workout) => (workout.id === workoutToUpdate.id ? response.data : workout))
                );
            })
            .catch((error) => {
                console.error("Error updating workout:", error);
            });
    };

    // const deleteTodo = (id: string) => {
    //     axios
    //         .delete(`http://localhost:8080/api/todo/${id}`)
    //         .then(() => {
    //             setData((prevData) => prevData.filter((todo) => todo.id !== id)); // Remove the todo from state
    //         })
    //         .catch((error) => {
    //             console.error("Error deleting todo:", error);
    //         });
    // };



    return (
        <AppContainer>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<LetsWorkout setTodaysWorkout={setTodaysWorkout} todaysWorkout={todaysWorkout} newestWorkouts={newestWorkouts} finishedWorkout={finishedWorkout} setFinishedWorkout={setFinishedWorkout} addWorkout={addWorkout}/>}
                    />
                    <Route
                        path="/history"
                        element={
                            <History workouts={workouts} updateWorkout={updateWorkout} setTodaysWorkout={setTodaysWorkout} todaysWorkout={todaysWorkout}/>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </AppContainer>
    )
}

export default App
