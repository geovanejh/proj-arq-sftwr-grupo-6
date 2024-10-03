import styled from "styled-components";

export const MainPanelContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dfe0eb;
  height: 224px;
  padding: 24px;
  display: flex;
  justify-content: space-evenly;
  border-radius: 0px 0px 8px 8px;
  align-items: center;

  > div:first-child {
    height: 200px;
    border-right: 1px solid #dfe0eb;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    height: 170px;
    width: 300px;
  }
`;
