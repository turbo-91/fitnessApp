import {CardContainer} from "./Card.styles.ts";

export interface CardProps {
    id: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
    onUpdate: (id: string, updatedDescription: string) => void;
    onDelete: (id: string) => void;
}

function Card(props: Readonly<CardProps>) {

    return (
        <CardContainer>
            <h2></h2>
        </CardContainer>
    );
}

export default Card;