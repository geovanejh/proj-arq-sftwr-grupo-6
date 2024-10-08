import styled from "styled-components";

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.layout};
  list-style-type: none;
  padding: 24px 32px;
  border-bottom: 1px solid #dfe0eb;

  :hover {
    background-color: #f7f8ff;
    cursor: pointer;
  }

  > div {
    display: flex;
    width: 100%;
  }

  > div > p {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #252733;
  }

  > div > img {
    height: 44px;
    width: 44px;
    border-radius: 100%;
  }

  button {
    padding: 3px 5px;

    :hover {
      background-color: #dfe0eb;
      border-radius: 10px;
    }
  }
`;
