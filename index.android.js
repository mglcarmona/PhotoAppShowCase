/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CameraButton from './components/CameraButton.js';
import ImagesList from './components/ImagesList.js';

import pick from './api/picker.js';
import uploadFile from './api/upload.js';

export default class PhotoAppShowCase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
    }
  }
  componentDidMount() {
    fetch('https://photoappshowcase-balegvxhje.now.sh/get')
      .then(docs => docs.json())
      .then(arr => {
        this.setState({images: arr})
      })
  }
  render() {
    return (
      <LinearGradient colors={['#639DFF', '#7A4EED']} style={styles.container}>
        <ImagesList images={this.state.images}/>
        <CameraButton onPressHandler={this.show.bind(this)}/>
      </LinearGradient>
    );
  }

  show(){
    pick((source, data) => {
      uploadFile([
        { name: 'avatar', filename: 'avatar.png', data }
      ])
      .then(res => {
        this.setState({
          images: [{url: res.data, _id: null}].concat(this.state.images)
        })
      })
      .catch(err => console.warn(err.message))
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 36,
  }
});

AppRegistry.registerComponent('photoAppShowCase', () => PhotoAppShowCase);
