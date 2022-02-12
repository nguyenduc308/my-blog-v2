import styled from 'styled-components';

export const CommentInputWrapperUi = styled.div`
  display: flex;
  /* border: 1px solid #efefef; */
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;

  .cmt-input-avatar {
    flex: 0 0 40px;
    padding-right: 1rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .cmt-input-body {
    padding-left: 1rem;
    width: 100%;
    max-width: 100%;

    .cmt-input {
      width: 100%;
      border: 1px solid #efefef;
      padding: 1rem;
      border-radius: 4px;
      height: 60px;
      font-size: 16px;
      outline: none;
    }

    .cmt-input-meta {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;

      .cmt-input-action {
        border-radius: 4px;
        border: 0;
        padding: 10px 16px;
        cursor: pointer;
        &:hover {
          background: #ccc;
        }
      }
    }
  }
`;
