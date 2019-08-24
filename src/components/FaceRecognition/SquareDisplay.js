import React from 'react';

const SquareDisplay = ({ boxes }) => {
  return (
    <div>
      {boxes.map(box => {
        return (
          <div
            className='bounding-box'
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          />
        );
      })}
    </div>
  );
};

export default SquareDisplay;
