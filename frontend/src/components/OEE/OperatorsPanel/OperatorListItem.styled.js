import styled from "styled-components";

export const OperatorListItem = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr;
  border-bottom: 1.5px solid #dfe0eb;
  padding: 24px 32px 24px 32px;

  > div:first-child {
    display: flex;
    gap: 24px;

    img {
      height: 44px;
      width: 44px;
      border-radius: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      height: 100%;

      > p {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #252733;
      }

      > span {
        font-family: "Mulish";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.1px;
        color: #c5c7cd;
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

export const OperadorMetric = styled.span`
  padding: 5px 12px;
  border-radius: 50px;
  color: #fff;
`;

export const OperatorsPanelContainer = styled.div`
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

  input {
    height: 24px;
    width: 240px;
  }

  > div > h2 {
    font-weight: 700;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: 0.4px;
    color: #252733;
  }

  ul > li:first-child {
    grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr;
    display: grid;
    border-bottom: 1.5px solid #dfe0eb;
    padding: 0 32px 12px 32px;

    h3 {
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.2px;
      color: #9fa2b4;
      cursor: pointer;
    }
  }
`;
