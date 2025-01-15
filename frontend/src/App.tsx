import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])

    const fetchData = () => {
        axios
            .get<[]>("http://localhost:8080/api/hello") // Ensure the response matches the type
            .then((response) => {
                setData(response.data); // Save the fetched data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
    <>
        <p>{data}</p>
    </>
  )
}

export default App
