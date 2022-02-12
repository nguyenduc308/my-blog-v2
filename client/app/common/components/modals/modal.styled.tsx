import styled from "styled-components";

export const BackdropUi = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1px);
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;

  .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  &.active {
    opacity: 1;
    transition-delay: 0ms;
    transition-duration: 250ms;

    .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`;

export const ModalContentUi = styled.div`
  position: relative;
  padding: 20px;
  min-height: 50px;
  min-width: 50px;
  max-height: 80%;
  max-width: 80%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
`;