import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import UseStyles from './Style';
import {downloadFile} from '../../utils/downloadHelper';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {useThemeContext} from '../../theme/ThemeContext';

const SongCard = ({song, onPress}: any) => {
  const styles = UseStyles();
  const {theme} = useThemeContext();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: song.thumbnail}} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() => downloadFile(song.previewUrl, song.title)}>
        <MaterialIcons name="download" size={20} style={styles.downloadIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongCard;
