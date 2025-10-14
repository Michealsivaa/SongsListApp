import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import UseStyles from './Style';
import {downloadFile} from '../../utils/downloadHelper';

const SongDetailScreen = ({route}: any) => {
  const {song} = route.params;
  const styles = UseStyles();

  return (
    <View style={styles.container}>
      <Image source={{uri: song.url}} style={styles.image} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() => downloadFile(song.url, song.title)}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SongDetailScreen;
