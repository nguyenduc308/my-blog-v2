import {useState, useEffect, useRef} from 'react';

import { BackdropUi, ModalContentUi } from './modal.styled';
import Portal from './portal';

interface ModalProps {
  backdrop?: boolean;
  center?: boolean;
  showModal: boolean;
  onClose?: Function
}

const Modal: React.FC<ModalProps> = (
  {children, backdrop, center, showModal, onClose}
) => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  const backdropRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const {current} = backdropRef;
    const backdropTransitionendHandler = () => setActive(showModal);
    const backdropClickHandler = () => onClose && onClose();

    if (current) {
      current.addEventListener('transitionend', backdropTransitionendHandler);
      current.addEventListener('click', backdropClickHandler)
    }
    if (showModal) {
      setTimeout(() => {
        setActive(showModal);
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", backdropTransitionendHandler);
        current.removeEventListener('click', backdropClickHandler);
      }
    }
  }, [showModal])

  return <>
  {(mounted && (showModal || active)) && <Portal>
    <BackdropUi ref={backdropRef} className={active && showModal && 'active'}>
      <ModalContentUi className="modal-content">
        {children}
      </ModalContentUi>
    </BackdropUi>
    </Portal>}
  </>;
}


export default Modal;