import styled from 'styled-components';

const FlatButtonUi = styled.button`
  border-radius: 0.5rem;
  padding: 1.2rem 2rem;
  font-size: 1.6rem;
  min-width: 100px;
  text-decoration: none;
  color: #fff;
  position: relative;
  display: inline-block;
  border: none;
  cursor: pointer;

  &:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
  }
`;

export const FlatButtonBlueUi = styled(FlatButtonUi)`
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3c93d5;

  &:hover {
    background-color: #6fc6ff;
  }
`;

export const FlatButtonGreenUi = styled(FlatButtonUi)`
  background-color: #2ecc71;
  box-shadow: 0px 5px 0px 0px #15b358;
  &:hover {
    background-color: #48e68b;
  }
`;

export const FlatButtonRedUi = styled(FlatButtonUi)`
  background-color: #e74c3c;
  box-shadow: 0px 5px 0px 0px #ce3323;
  &:hover {
    background-color: #ff6656;
  }
`;

export const FlatButtonPurpleUi = styled(FlatButtonUi)`
  background-color: #9b59b6;
  box-shadow: 0px 5px 0px 0px #82409d;
  &:hover {
    background-color: #b573d0;
  }
`;

export const FlatButtonYellowUi = styled(FlatButtonUi)`
  background-color: #f1c40f;
  box-shadow: 0px 5px 0px 0px #d8ab00;
  &:hover {
    background-color: #ffde29;
  }
`;
