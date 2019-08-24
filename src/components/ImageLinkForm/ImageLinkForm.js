import React from 'react';

import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'SmartBrain will detect faces in your imgaes. Give it a try'}
      </p>
      <div className='center'>
        <div className='form pa4 br3 shadow-5'>
          <input
            type='text'
            className='f4 pa2 w-70 center'
            onChange={onInputChange}
          />
          <button
            className='w-30 br3 grow f4 link ph3 pv2 dib white bg-blue'
            onClick={onButtonSubmit}
            style={{
              padding: '0',
              border: 'none',
              height: '40px'
            }}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
