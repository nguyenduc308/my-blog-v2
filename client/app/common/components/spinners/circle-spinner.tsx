interface CircleSpinnerProps {
  color?: string;
}

import styles from './circle-spinner.module.scss';

const CircleSpinner: React.FC<CircleSpinnerProps> = ({ color }) => {
  return (
    <div className={styles.circleSpinner} style={{ color: color || '#fff' }}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CircleSpinner;
