import React from 'react';
import Tilt from 'react-tilt';

import brainLogo from '../../assets/logo-brain.png';

const Logo = () => {
  return (
    <div className='logo ma4 mt0'>
      <Tilt
        className='Tilt br2'
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className='Tilt-inner pa1'>
          <img
            src={brainLogo}
            alt='smart-brain-logo'
            style={{ paddingTop: '5px' }}
          />{' '}
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
