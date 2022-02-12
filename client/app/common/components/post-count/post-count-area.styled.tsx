import styled from 'styled-components';

export const PostCountWrapperUi = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: max-content;
`;
export const LikeAreaUi = styled.div`
  width: 50px;
  column-gap: 10px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;

  .add-reaction {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    position: relative;

    &:hover {
      border: 1px solid #ececec;
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .count {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }
`;

export const ViewAreaUi = styled.div`
  width: 50px;
  column-gap: 10px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;

  .view-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    position: relative;
  }

  .count {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }
`;
