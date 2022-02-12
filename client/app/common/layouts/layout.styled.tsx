import styled from 'styled-components';

export const LayoutWrapperScreen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContentScreen = styled.div`
  flex: 1;
  margin-top: 3rem;
`;

export const AdminWrapperScreen = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;
export const AdminSidebarScreen = styled.div<{ active?: boolean }>`
  flex: 0 0 50px;
  max-width: 50px;
  min-height: 100vh;
  background: #4f5962;
  box-shadow: ${(props) =>
    props.active ? 'none' : '0px 0px 3px rgba(0,0,0,.06);'};
  .menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    .menu-item {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      svg {
        fill: #fff;
      }
      &:hover,
      &.active {
        background-color: #fff;
        transition: all 200ms ease;
        svg {
          fill: blue;
        }
      }
    }
  }
`;

export const AdminLogoScreen = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 40px;
    height: auto;
  }
`;

export const AdminMenuScreen = styled.div`
  width: 200px;
  border-right: 1px solid #efefef;
  min-height: 200px;
  background-color: #4f5962;
  
`;

export const SubmenuScreen = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  min-height: 200px;
  transition: all 200ms ease;
  .sub-list {
    .sub-item {
      a {
        display: block;
        padding: 1rem;
        font-weight: 500;
        &:hover {
          color: blue;
        }
      }
    }
  }
`;



export const AdminBodyScreen = styled.div`
  flex: 1;
`;
