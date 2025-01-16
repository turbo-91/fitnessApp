import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 4px;
  background: white;
  color: black;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: black;
    color: white;
  }

  &:disabled {
    background: lightgray;
    color: gray;
    border-color: gray;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;
