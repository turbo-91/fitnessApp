import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WorkoutCard from "./components/Card/WorkoutCard.tsx";
import {Workout} from "./types/Workout.ts";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {Select} from "./components/Dropdown/Dropdown.styles.ts";
import OptionElement from "./components/Option.tsx";

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [newestWorkouts, setNewestWorkouts] = useState<Workout[]>([]);

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

    useEffect(() => {
        fetchWorkouts();
    }, []);



    return (
        <>
            <Header/>
            <Routes>
                <Route path="/home"/>
                <Route path="/letsworkout" element={<>
                    <Select>
                        <option value="" disabled selected>
                            Where do you want to pick up today?
                        </option>
                        {newestWorkouts.map((workout) => (
                            <OptionElement workout={workout} />
                        ))}
                    </Select>
                </>}/>
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
