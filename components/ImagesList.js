/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, ListView, Text, RefreshControl} from 'react-native';
import ImageCard from './ImageCard.js';

const { height, width } = Dimensions.get('window');

export default class ImagesList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([this.props.images]),
      isRefreshing: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.images)})
  }

  _onRefresh() {
    this.setState({isRefreshing: true})
    fetch('https://photoappshowcase-balegvxhje.now.sh/get')
      .then(docs => docs.json())
      .then(arr => {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(arr)})
        this.setState({isRefreshing: false})
      })
      .catch(err => {
        this.setState({isRefreshing: false})
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView contentContainerStyle={{alignItems: 'center'}}
          dataSource={this.state.dataSource}
          renderRow={(row) => <ImageCard uri={row.url} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#0000ff']}
              progressBackgroundColor="#FFF"
            />
          }
        />
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
