import styled from 'styled-components';

export const EditBlogWrapperScreen = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
`;

export const EditBlogContentAreaScreen = styled.div`
  padding: 3rem;
`;

export const EditBlogTitleInputScreen = styled.input`
  text-align: center;
  border: none;
  font-size: 2.8rem;
  width: 100%;
  padding: 1rem;
  outline: none;
  background: transparent;
`;

export const EditBlogContentInputScreen = styled.div`
  margin-top: 2rem;
  max-height: 600px;
  overflow-y: auto;
`;

export const EditBlogControlsAreaScreen = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #efefef;
  min-height: 100vh;
`;

export const EditBlogUploadImageScreen = styled.div`
  padding: 1rem 0;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #efefef; */
  color: #ccc;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const EditBlogCategoriesScreen = styled.div`
  width: 100%;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 2rem 0;
`;

export const EditBlogExcerptScreen = styled.div`
  width: 100%;
`;
