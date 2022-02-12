import styled from 'styled-components';

export const CategoriesWrapperUi = styled.div`
  padding: 2rem;
`;

export const CategoriesHeaderUi = styled.div``;

export const CategoriesBodyUi = styled.div`
  display: flex;
  margin-top: 3rem;
`;

export const CreateCategoryBoxUi = styled.div`
  padding: 2rem;
  box-shadow: 0 0 0 1px rgba(9, 9, 9, 0.1);
  border-radius: 4px;
  width: 400px;

  button,
  input {
    margin-top: 1rem;
  }
`;

export const CategoriesListUi = styled.div`
  min-width: 400px;
  margin-left: 2rem;

  .cat-item {
    background: #efefef;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & + .cat-item {
      margin-top: 1rem;
    }
  }
`;
