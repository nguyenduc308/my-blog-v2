import styled from 'styled-components';

export const DlCardScreen = styled.div`
  width: 100%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  overflow: hidden;
`;
export const DlCardHeaderScreen = styled.div`
  position: relative;
`;

export const DlCardLabelScreen = styled.div<{
  bgColor?: string;
  color?: string;
}>`
  position: absolute;
  top: 10px;
  left: 0;
  background: ${(props) => props.bgColor || '#efefef'};
  color: ${(props) => props.color || '#333'};
  padding: 4px 8px;
  border-radius: 0 4px 4px 0;
`;

export const DlCardImagescreen = styled.div`
  width: 100%;
  padding-top: 66.6666667%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
  }
`;

export const DlCardBodyScreen = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;

  .title h3,
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden !important;
  }

  .title {
    display: block;
    color: #333;
    text-decoration: none;
    h3 {
      -webkit-line-clamp: 2;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .description {
    -webkit-line-clamp: 3;
    font-size: 1.6rem;
    margin-top: 1.2rem;
    line-height: 1.3;
  }
`;
