import React, { Component } from 'react';
import Background from './components/Background/Background';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      boxes: []
    };
  }

  calculateFaceLocation = dataFromServer => {
    const allBoxes = dataFromServer.outputs[0].data.regions;
    const retBoxes = [];
    allBoxes.map(el => {
      return retBoxes.push(el.region_info.bounding_box);
    });
    const boxesPositions = [];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    retBoxes.map(box => {
      return boxesPositions.push({
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height
      });
    });
    return boxesPositions;
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    console.log(event.target.value);
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

  render() {
    return (
      <div className='App'>
        <Background />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {this.state.imageUrl && (
          <FaceRecognition
            boxes={this.state.boxes}
            imageUrl={this.state.imageUrl}
          />
        )}
      </div>
    );
  }
}

export default App;
