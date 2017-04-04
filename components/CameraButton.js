/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CameraButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPressHandler}>
        <Icon name="md-camera" size={30} color="#272727" />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
