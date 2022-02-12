import React from 'react';
import { ContainerScreen } from './container.styled';

const Container: React.FC = ({ children }) => {
  return <ContainerScreen>{children}</ContainerScreen>;
};

export default Container;
