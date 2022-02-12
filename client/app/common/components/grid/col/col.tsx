import React from 'react';

import styles from './col.module.scss';

type NumberAttr =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

interface ColProps {
  sm?: NumberAttr;
  md?: NumberAttr;
  lg?: NumberAttr;
  xl?: NumberAttr;
  className?: string;
  [key: string]: any;
}

const DEVICE_SIZES = ['sm', 'md', 'lg', 'xl'];

const Col: React.FC<ColProps> = (props) => {
  const cssClass = DEVICE_SIZES.reduce((acc, size) => {
    return (
      acc + (props[size] ? styles[`col-${size}-${props[size]}`] + ' ' : '')
    );
  }, ` ${styles.col} `);

  return (
    <div className={(props.className || '' + cssClass).trim()}>
      {props.children}
    </div>
  );
};

export default Col;
