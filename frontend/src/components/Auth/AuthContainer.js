import styled from "styled-components";

export const AuthContainer = styled.div`
  background-color: #fff;
  padding: 40px 32px;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.19);

  img {
    width: 64px;
    height: 64px;
  }
  h3 {
    margin: 12px 0 32px 0;
    font-weight: 900;
    font-size: 19px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #ff9e59;
    opacity: 0.7;
  }

  h2 {
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #000000;
  }

  h5 {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #667080;

    a {
      margin-left: 5px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #ff6b00;

      :hover {
        text-decoration: underline;
        font-weight: 900;
      }
    }
  }
`;
