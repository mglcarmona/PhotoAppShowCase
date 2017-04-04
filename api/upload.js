import RNFetchBlob from 'react-native-fetch-blob'

let upload = (data) => {
  return RNFetchBlob.fetch('POST', 'https://photoappshowcase-balegvxhje.now.sh/upload', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, data);
}

module.exports = upload;
