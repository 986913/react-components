export const Hand = ({ height = 1, width = 1, angle }) => {
  return (
    <div
      aria-hidden={true}
      className='clock-hand'
      style={{
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
};
