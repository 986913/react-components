import { Hand } from './Hand';

const FULL_ROTATION_DEGREES = 360;
const padTwoDigit = (number) => (number >= 10 ? String(number) : `0${number}`);

export const ClockImplement = ({ hours, minutes, seconds, size }) => {
  const secondsPercentage = seconds / 60;
  const minutesPercentage = (minutes + secondsPercentage) / 60;
  const hoursPercentage = ((hours % 12) + minutesPercentage) / 12;

  const hourAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  const minutesAngle = minutesPercentage * FULL_ROTATION_DEGREES;
  const secondsAngle = secondsPercentage * FULL_ROTATION_DEGREES;

  const dateTimeDisplay = `
    ${padTwoDigit(hours)}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}
  `;

  return (
    <time
      className='clock'
      dateTime={dateTimeDisplay}
      style={{
        '--size': `${size}px`,
      }}
    >
      <Hand height={0.5} angle={hourAngle} width={3} />
      <Hand height={0.9} angle={minutesAngle} width={2} />
      <Hand height={0.8} angle={secondsAngle} />
    </time>
  );
};
