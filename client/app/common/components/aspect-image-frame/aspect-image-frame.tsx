import React from 'react';
import { ImageFrameScreen } from './aspect-image-frame.styled';

interface AspectImageFrameProps {
  ratio: number;
  contain?: boolean;
}

const AspectImageFrame: React.FC<AspectImageFrameProps> = ({
  children,
  ratio,
  contain,
}) => {
  return (
    <ImageFrameScreen
      style={{ paddingTop: ratio * 100 + '%' }}
      contain={contain}
    >
      {children}
    </ImageFrameScreen>
  );
};

export default AspectImageFrame;
