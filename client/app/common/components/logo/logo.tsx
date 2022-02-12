import React from 'react';
import { LogoScreen } from './logo.styled';

interface LogoProps {
  title: string;
  imageUrl?: string;
  titleDescription?: string;
}

const Logo: React.FC<LogoProps> = ({ title, imageUrl, titleDescription }) => {
  return (
    <LogoScreen>
      {imageUrl ? (
        <>
          <img src={imageUrl} alt={titleDescription || title} />
          <h1 title={titleDescription || title}>{title}</h1>
        </>
      ) : (
        <h1 title={titleDescription || title}>{title}</h1>
      )}
    </LogoScreen>
  );
};

export default Logo;
