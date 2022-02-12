import styled from 'styled-components';

export const ImageFrameScreen = styled.div<{ contain?: boolean }>`
  width: 100%;
  position: relative;
  overflow-y: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${(props) => (props.contain ? '100%' : 'auto')};
    object-fit: cover;
    object-position: center;
  }
`;
