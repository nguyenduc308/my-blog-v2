import styled from 'styled-components';

export const CommentWrapperUi = styled.div`
  display: flex;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }

  .cmt-avatar {
    flex: 0 0 40px;
    padding-right: 1rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .cmt-body {
    flex: 1;
    padding-left: 1rem;
    .cmt-header {
      .name {
        font-weight: bold;
      }
    }
    .cmt-content {
      margin-top: 1rem;
      font-size: 16px;
    }
    .cmt-meta {
      font-size: 14px;
      margin-top: 2rem;
      .action {
        font-weight: bold;
        cursor: pointer;
      }
      .time {
        padding-left: 2rem;
        font-size: 12px;
        color: #999;
      }
    }

    .children {
      width: 100%;
    }
  }
`;
