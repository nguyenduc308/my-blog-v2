import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
  @media screen and (max-width: 678px) and (min-width: 1199px) {
    margin: 0 -8px;
  }

  @media screen and (max-width: 1200px) and (min-width: 1599px) {
    margin: 0 -12px;
  }

  @media screen and (min-width: 1600px) {
    margin: 0 -12px;
  }
`;
