import styled from 'styled-components';

export const ArticleWrapperUi = styled.div``;

export const ArticleHeaderUi = styled.div`
  margin-bottom: 3rem;

  title {
    font-size: 3.2rem;
  }

  .excerpt {
    margin-top: 2rem;
    margin-bottom: 0;
  }
`;

export const ArticleInnerUi = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  article {
    flex: 1;
  }
`;

export const BlogArticleUi = styled.div`
  width: 100%;
  overflow: hidden;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
  padding-bottom: 2.4rem;
  border-right: 1px solid #efefef;
  border-left: 1px solid #efefef;
  background: #fff;

  article {
    padding-top: 2rem;
    width: 100%;
    p {
      margin-top: 1rem;
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 2rem 0;
    }

    h1,
    h2 {
      padding: 2rem 0;
    }
  }

  .comment-list {
    margin-top: 2rem;
    border-top: 1px solid #efefef;
    padding-top: 2rem;
    .list {
      border-top: 1px solid #efefef;
    }
  }
`;
