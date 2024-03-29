import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <div className='header'>
      <Logo />
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('signin')}
        >
          Sign Out
        </p>
      </nav>
    </div>
  ) : (
    <div className='header'>
      <Logo />
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('signin')}
        >
          Sign In
        </p>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('register')}
        >
          Register
        </p>
      </nav>
    </div>
  );
};

export default Navigation;
