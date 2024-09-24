import styled from "styled-components";

export const RouterContainer = styled.div`
  display: flex;
`;

export const MainContent = styled.div`
  margin-left: ${(props) => (props.auth ? "278px" : 0)};
  width: 100%;
`;
