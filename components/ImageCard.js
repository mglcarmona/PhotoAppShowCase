/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class ImageCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image source={{uri: this.props.uri}} style={styles.card} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: width * .8,
    height: height * .6,
    backgroundColor: 'white',
    marginTop: 20
  }
});
