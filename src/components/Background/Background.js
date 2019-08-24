import React from 'react';
import Particles from 'react-particles-js';

const Background = () => {
  return (
    <Particles
      className='particles'
      params={{
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 1000
            }
          }
        }
      }}
    />
  );
};

export default Background;
