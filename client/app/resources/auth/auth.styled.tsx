import styled from 'styled-components';

export const AuthWrapperUi = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;

  .auth-box {
    background-color: #fff;
    box-shadow: 1px 1px 3px gray;
    min-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3rem;
    .title {
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      margin-top: 3rem;
    }

    .description {
      font-size: 14px;
      margin-top: 1rem;
    }

    input {
      margin-top: 2rem;
    }

    button {
      margin-top: 3rem;
    }

    .error-message {
      text-align: center;
      margin-top: 2rem;
      margin-bottom: 0;
      height: 16px;
      color: red;
    }
  }
`;
