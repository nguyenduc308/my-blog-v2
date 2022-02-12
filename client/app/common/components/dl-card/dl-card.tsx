import React from 'react';
import Link from 'next/link';

import {
  DlCardScreen,
  DlCardHeaderScreen,
  DlCardBodyScreen,
  DlCardLabelScreen,
} from './dl-card.styled';
import { AspectImageFrame } from '../aspect-image-frame';

interface DlCardProps {
  imageUrl?: string;
}

const DlCard: React.FC<DlCardProps> = ({ imageUrl }) => {
  return (
    <DlCardScreen>
      <DlCardHeaderScreen>
        <AspectImageFrame ratio={2 / 3} contain={!imageUrl}>
          <img src={imageUrl || '/default-img.gif'} />
        </AspectImageFrame>
        <DlCardLabelScreen>Angular</DlCardLabelScreen>
      </DlCardHeaderScreen>
      <DlCardBodyScreen>
        <Link href="#">
          <a className="title">
            <h3>HOW TO: create the ripple effect from Material Design</h3>
          </a>
        </Link>
        <div className="description">
          I was reading through the Material Design spec today and thought “how
          would I create that ripple type effect for user interaction from
          scratch?”
        </div>
        <div className="author"></div>
      </DlCardBodyScreen>
    </DlCardScreen>
  );
};

export default DlCard;
