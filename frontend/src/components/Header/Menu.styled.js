import styled from "styled-components";

export const MenuNav = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;

    > li:last-child {
      display: flex;
      padding: 0 32px;

      > button {
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        background: none;
        border: none;
        gap: 24px;
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.2px;
        text-decoration: none;
        padding: 18px 0;

        > svg {
          font-size: 16px;
        }
      }
    }
  }
`;
