import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: black;
  color: white;
  text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;

  h1 {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;
