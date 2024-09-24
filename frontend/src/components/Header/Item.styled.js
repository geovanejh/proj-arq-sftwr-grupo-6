import styled from "styled-components";

export const Linha = styled.li`
  padding: ${(props) => (props.active ? "0 27px" : "0 32px")};
  border-left: ${(props) => (props.active ? "5px solid #FF6B00" : "none")};
  padding: ${(props) => (props.active ? "0 29px" : "0 32px")};

  a {
    display: flex;
    align-items: center;
    gap: 24px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: ${(props) => (props.active ? "#FF6B00" : "#000000;")};
    text-decoration: none;
    padding: 18px 0;

    svg {
      color: ${(props) => (props.active ? "#FF6B00" : "#000000;")};
    }
  }
`;
