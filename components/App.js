import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView, Modal, TouchableHighlight} from 'react-native';
import pick from '../api/picker.js';
import uploadFile from '../api/upload.js';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatarSource: null,
      data: null,
      images: null,
    }
  }
  reload() {
    fetch('http://192.168.1.52:3000/get')
      .then(docs => docs.json())
      .then(arr => {
        this.setState({images: arr})
      })
  }

  render(){
    let images = this.state.images;
    return (
      <View>
        <Text style={{textAlign: 'center'}}>Hello React Native</Text>
        <TouchableOpacity onPress={this.show.bind(this)} style={{marginTop: 80}}>
          <Text style={{textAlign: 'center'}}>Show Image Picker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.upload.bind(this)} style={{marginTop: 80}}>
          <Text style={{textAlign: 'center'}}>Upload</Text>
        </TouchableOpacity>
      </View>
    )
  }
  show(){
    pick((source, data) => {
      this.setState({avatarSource: source, data: data})
    });
  }
  upload(){
    uploadFile([
      { name: 'avatar', filename: 'avatar.png', data: this.state.data }
    ])
    .uploadProgress({ interval : 250 },(written, total) => {
        console.log('uploaded', written / total)
    })
    .then(res => {
      console.log(res.data)
      this.reload()
    })
    .catch(err => console.warn(err.message))
  }
}
