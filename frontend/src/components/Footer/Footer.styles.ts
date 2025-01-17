import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: black;
  color: white;
  text-align: center;

    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

  p {
      padding: 0.5rem;
    font-size: 0.6rem;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.8rem;
    }
  }
`;
