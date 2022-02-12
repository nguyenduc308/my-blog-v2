import styled, { keyframes } from 'styled-components';

const subcomming = keyframes`
  from {
    top: calc(100% + 50px);
  }
  to {
    top: 100%;
  }
`;

export const MenuVerticalScreen = styled.ul`
  a {
    display: block;
    color: #333;
    text-decoration: none;
    padding: 10px 0;
  }
  li {
    border-bottom: 1px solid #efefef;
  }
  ul {
    padding-left: 1rem;
  }
`;

export const SubmenuHorizontalScreen = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: max-content;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  transition: all 300ms ease;
  padding: 2rem 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.03);

  li {
    padding: 0 2rem;
    &:hover {
      a {
        color: #0d6efd;
        transition: all 300ms ease;
      }
    }
  }
`;

export const MenuHorizontalScreen = styled.ul`
  display: flex;

  li {
    a {
      display: block;
      color: #333;
      text-decoration: none;
      padding: 0.8rem 0rem;
      font-weight: 500;
    }
  }

  & > li {
    position: relative;
    margin-right: 3rem;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 1.5px;
      background: #0d6efd;
      transition: all 300ms ease;
      visibility: hidden;
      opacity: 0;
    }

    &:hover {
      &::after {
        visibility: visible;
        opacity: 1;
      }
      & > a {
        color: #0d6efd;
      }
      ${SubmenuHorizontalScreen} {
        opacity: 1;
        visibility: visible;
        animation: ${subcomming} 300ms ease;
      }
    }
  }
`;
