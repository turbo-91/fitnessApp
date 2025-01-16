import styled from "styled-components";

export const CardContainer = styled.div`
    border: 1px solid black;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: white;
    text-align: left;
    max-width: 400px;
    margin: 1rem auto;

    h2 {
        font-size: 1vh;
        margin-bottom: 1vw;
    }

    p {
        font-size: 1rem;
        color: black;
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        padding: 1rem;
        h2 {
            font-size: 1.2rem;
        }
        p {
            font-size: 0.9rem;
        }
    }
`;

export const ValueContainer = styled.div`
    border: 1px solid black;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    background-color: white;
    text-align: center;
    margin: 0.5rem;
    font-size: 1rem;

    @media (max-width: 768px) {
        padding: 0.3rem 0.8rem;
        font-size: 0.9rem;
    }
`;

export const ValueContainerWrapper = styled.div`
  display: flex;
  justify-content: center; /* Align horizontally */
  align-items: center; /* Align vertically */
  flex-wrap: wrap; /* Wrap containers on smaller screens */
  gap: 0.5rem; /* Space between containers */
  margin-top: 1rem;
`;
