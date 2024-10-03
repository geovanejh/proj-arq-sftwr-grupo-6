import styled from "styled-components";

export const MachinesPanelContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  height: 100%;
  margin-top: 36px;

  > div:first-child {
    padding: 32px 32px 48px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div > h2 {
    font-weight: 700;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: 0.4px;
    color: #252733;
  }

  ul > li:first-child {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    display: grid;
    border-bottom: 1.5px solid #dfe0eb;
    padding: 0 32px 12px 32px;

    h3 {
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.2px;
      color: #9fa2b4;
    }
  }

  li {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    padding: 12px;

    > div {
      display: flex;
      gap: 24px;
      justify-self: end;

      > button {
        padding: 0 6px;
        :hover {
          background-color: lightgray;
          border-radius: 5px;
        }
      }
    }

    p {
      font-size: 14px;
      font-weight: 500;
    }

    :hover {
      background-color: #f7f8ff;
      cursor: pointer;
    }

    &:first-child {
      border-bottom: 1px solid rgb(223, 224, 235);
      padding-bottom: 4px;
      margin-bottom: 12px;
      cursor: default;

      :hover {
        background-color: #fff;
      }

      p {
        color: #1ab24e;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.2px;
      }
    }
  }
`;

export const List = styled.ul``;
