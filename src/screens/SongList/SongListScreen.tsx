import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {useSongStore} from '../../store/songStore';
import SongCard from '../../components/SongCard/SongCard';
import UseStyles from './Style';
import {useThemeContext} from '../../theme/ThemeContext';

const SongListScreen = ({navigation}: any) => {
  const styles = UseStyles();
  const {theme} = useThemeContext();
  const {songs, fetchSongs, loading}: any = useSongStore();
  const [query, setQuery] = useState('imagine dragons'); // default
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSongs(query);
  }, []);

  const onSearch = async () => {
    await fetchSongs(query);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSongs(query);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search artist or song..."
          placeholderTextColor={theme.colors.subtext}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
          <MaterialIcons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ⏳ Loader */}
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {/* ❌ Empty */}
      {!loading && songs.length === 0 && (
        <Text style={styles.emptyText}>
          No songs found. Try another search!
        </Text>
      )}

      {/* 🎵 Song list */}
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongCard
            song={item}
            onPress={() => navigation.navigate('SongDetail', {song: item})}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SongListScreen;
