import { useState } from 'react';
import { CSSProperties } from 'styled-components';
import {
  CollapseBodyUi,
  CollapseHeaderUi,
  CollapseWrapperUi,
} from './collapse.styled';

interface CollapseProps {
  active?: boolean;
  title: string;
  className?: string;
  style?: CSSProperties;
}

const Collapse: React.FC<CollapseProps> = ({
  active,
  children,
  title,
  ...props
}) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <CollapseWrapperUi {...props}>
      <CollapseHeaderUi onClick={() => setIsActive(!isActive)}>
        {title}
      </CollapseHeaderUi>

      {isActive && <CollapseBodyUi>{children}</CollapseBodyUi>}
    </CollapseWrapperUi>
  );
};

export default Collapse;
