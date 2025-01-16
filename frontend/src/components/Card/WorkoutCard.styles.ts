import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 1rem auto;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
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