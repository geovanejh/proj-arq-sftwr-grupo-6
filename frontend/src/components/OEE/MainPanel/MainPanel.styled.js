import styled from "styled-components";

export const MainPanelContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dfe0eb;
  height: 224px;
  padding: 24px;
  display: flex;
  justify-content: space-evenly;
  border-radius: 10px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
`;
