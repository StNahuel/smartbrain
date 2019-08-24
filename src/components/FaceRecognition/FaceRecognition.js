import React from 'react';
import SquareDisplay from './SquareDisplay';

import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputImage'
          src={imageUrl}
          alt='Face-detection'
          width='500px'
          height='auto'
        />
        {(boxes.length > 0 || boxes !== undefined) && (
          <SquareDisplay boxes={boxes} />
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
