import styled from "styled-components";

export const DropdownContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  background: white;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  appearance: none; /* Remove default dropdown arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='black'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.6rem;

  &:focus {
    outline: none;
    border-color: black;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;
