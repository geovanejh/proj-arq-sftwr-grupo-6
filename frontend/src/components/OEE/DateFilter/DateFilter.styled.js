import styled from "styled-components";

export const DateFilterContainer = styled.div`
  background-color: #fff;
  display: flex;
  border-top: 1px solid #dfe0eb;
  border-left: 1px solid #dfe0eb;
  border-right: 1px solid #dfe0eb;
  border-radius: 8px 8px 0px 0px;
  padding: 16px;
  justify-content: space-between;

  .active {
    background-color: #fc6400;
  }

  > div {
    display: flex;
    gap: 12px;
  }

  button {
    padding: 6px 12px;
  }
`;
