import React, { Component, Fragment } from 'react';
import Background from './components/Background/Background';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';

import './App.css';

const clarifai = new Clarifai.App({
  apiKey: 'a54e46378e0a4e1f86b1edcd127f9f8d'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    };
  }

  calculateFaceLocation = dataFromServer => {
    const boxes = dataFromServer.outputs[0].data.regions;
    const positions = [];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    boxes.map(el => {
      return positions.push({
        leftCol: el.region_info.bounding_box.left_col * width,
        topRow: el.region_info.bounding_box.top_row * height,
        rightCol: width - el.region_info.bounding_box.right_col * width,
        bottomRow: height - el.region_info.bounding_box.bottom_row * height
      });
    });
    return positions;
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      const response = await clarifai.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      );
      this.displayFaceBox(this.calculateFaceLocation(response));
    } catch (error) {
      console.log(error);
    }
  };

  onRouteChange = route => {
    if (route === 'signout') this.setState({ isSignedIn: false });
    else if (route === 'home') this.setState({ isSignedIn: true });
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className='App'>
        <Background />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === 'home' ? (
          <Fragment>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {imageUrl !== '' && (
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            )}
          </Fragment>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
