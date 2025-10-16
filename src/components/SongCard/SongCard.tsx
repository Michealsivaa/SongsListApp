import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import UseStyles from './Style';
import {downloadFile} from '../../utils/downloadHelper';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {useThemeContext} from '../../theme/ThemeContext';
interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    album?: string;
    thumbnail: string;
    previewUrl?: string | null;
  };
  onPress: () => void;
}

const SongCard: React.FC<SongCardProps> = ({song, onPress}) => {
  const styles = UseStyles();
  const {theme} = useThemeContext();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{uri: song.thumbnail}} style={styles.thumbnail} />

      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() => downloadFile(song.previewUrl ?? null, song.title)}
        activeOpacity={0.7}>
        <MaterialIcons name="download" size={20} style={styles.downloadIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongCard;
