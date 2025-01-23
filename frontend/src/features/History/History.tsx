import {DropdownContainer} from "../../components/Dropdown/Dropdown.styles.ts";
import {Workout} from "../../types/Workout.ts";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import WorkoutCardForm from "../../components/Form/WorkoutCardForm.tsx";
import WorkoutCard from "../../components/Card/WorkoutCard.tsx";


type HistoryProps = {

};

function History(props: HistoryProps) {


    return (
       <DropdownContainer>
        </DropdownContainer>
    );
}

export default History;
