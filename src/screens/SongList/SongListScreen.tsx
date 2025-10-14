import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useSongStore} from '../../store/songStore';
import SongCard from '../../components/SongCard/SongCard';
import UseStyles from './Style';

const SongListScreen = ({navigation}: any) => {
  const styles = UseStyles();
  const {songs, fetchSongs, loading}: any = useSongStore();

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongCard
            song={item}
            onPress={() => navigation.navigate('SongDetail', {song: item})}
          />
        )}
      />
    </View>
  );
};

export default SongListScreen;
