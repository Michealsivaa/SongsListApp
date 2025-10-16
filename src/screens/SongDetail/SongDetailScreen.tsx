import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import UseStyles from './Style';
import {downloadFile} from '../../utils/downloadHelper';
import {useSongStore} from '../../store/songStore';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  thumbnail: string;
  previewUrl: string | null;
}

interface SongDetailScreenProps {
  route: {
    params: {
      song: Song;
    };
  };
  navigation: {
    replace: (screen: string, params?: any) => void;
  };
}

const SongDetailScreen: React.FC<SongDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {song} = route.params;
  const styles = UseStyles();
  const {songs} = useSongStore();

  const currentIndex = songs.findIndex((item: Song) => item.id === song.id);

  const goToSong = (index: number) => {
    if (index >= 0 && index < songs.length) {
      const nextSong = songs[index];
      navigation.replace('SongDetail', {song: nextSong});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{uri: song.thumbnail}}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
        <Text style={styles.albumText}>{song.album}</Text>
      </View>

      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() =>
          downloadFile(song.previewUrl ?? null, song.title, song.thumbnail)
        }
        activeOpacity={0.8}>
        <MaterialIcons name="download" size={22} color="#fff" />
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlBtn, currentIndex === 0 && styles.disabledBtn]}
          disabled={currentIndex === 0}
          onPress={() => goToSong(currentIndex - 1)}>
          <MaterialIcons name="skip-previous" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, styles.playBtn]}>
          <MaterialIcons name="play-arrow" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlBtn,
            currentIndex === songs.length - 1 && styles.disabledBtn,
          ]}
          disabled={currentIndex === songs.length - 1}
          onPress={() => goToSong(currentIndex + 1)}>
          <MaterialIcons name="skip-next" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SongDetailScreen;
