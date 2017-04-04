var ImagePicker = require('react-native-image-picker');

var options = {
  storageOptions: {
    path: 'images'
  }
};

let pick = (callback) => {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      console.log(response);
      let source = { uri: response.uri };
      callback(source, response.data);
    }
  });
}

module.exports = pick;
