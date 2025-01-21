import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WorkoutCard from "./components/Card/WorkoutCard.tsx";
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

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
        <>
            <Header/>
            <Routes>
                <Route path="/home"/>
                <Route path="/history" element={<>
                    {workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout}/>
                    ))}
                </>}/>

            </Routes>
            <Footer/>
        </>
    )
}

export default App
