import styled from 'styled-components';

export const DlCardRowScreen = styled.div`
  background: #fff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  display: flex;
`;

export const DLCardRowImageScreen = styled.div`
  flex: 0 0 30%;
`;

export const DlCardRowBodyScreen = styled.div`
  flex: 1;
  padding: 1rem;
  padding-left: 2.6rem;

  .top {
    a {
      text-transform: uppercase;
      font-size: 1.4rem;
    }
  }

  .title {
    margin-top: 1rem;
    font-size: 2.4rem;
    font-weight: 500;
  }

  .serial {
    font-style: italic;
    padding: 1rem 0;
    span {
      color: #999;
    }
    a {
      font-weight: 400;
    }
  }

  .meta {
    display: flex;
    font-size: 1.4rem;
    color: #ccc;
    /* margin-top: 1rem; */

    &__time {
      margin-left: 3rem;
    }
  }

  .excerpt {
    margin-top: 1rem;
    --webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden !important;
  }

  .footer {
    margin-top: 1.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .readmore {
      color: #999;
      text-decoration: none;
      padding-right: 2rem;

      &:hover {
        color: #333;
        text-decoration: underline;
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
`;
