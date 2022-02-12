import { useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

const Portal: React.FC = ({children}) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = document.body;
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    }
  }, [el]);

  return createPortal(children, el);
}

export default Portal;