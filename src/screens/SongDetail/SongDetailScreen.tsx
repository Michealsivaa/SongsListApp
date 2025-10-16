import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import UseStyles from './Style';
import {downloadFile} from '../../utils/downloadHelper';

const SongDetailScreen = ({route}: any) => {
  const {song} = route.params;
  const styles = UseStyles();

  return (
    <SafeAreaView style={styles.container}>
      {/* 🎵 Thumbnail Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={{uri: song.thumbnail}}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* 🎤 Song Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
        <Text style={styles.albumText}>{song.album}</Text>
      </View>

      {/* ⬇️ Download Button */}
      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() => downloadFile(song.thumbnail, song.title)}>
        <MaterialIcons name="download" size={22} color="#fff" />
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>

      {/* ⏮️⏯️⏭️ Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialIcons name="skip-previous" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, styles.playBtn]}>
          <MaterialIcons name="play-arrow" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn}>
          <MaterialIcons name="skip-next" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SongDetailScreen;
