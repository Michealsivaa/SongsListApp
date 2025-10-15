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
  const [query, setQuery] = useState('imagine dragons');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState('');

  const LIMIT = 10;

  useEffect(() => {
    fetchSongs(query, 0, LIMIT);
  }, []);

  const onSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter any keyword to search');
      return;
    }
    setError('');
    setPage(0);
    await fetchSongs(trimmed, 0, LIMIT);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSongs(query, 0, LIMIT);
    setPage(0);
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (isPaginating || loading) return;

    const nextOffset = (page + 1) * LIMIT;
    setIsPaginating(true);

    await fetchSongs(query, nextOffset, LIMIT, true);
    setPage(prev => prev + 1);

    setIsPaginating(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={text => {
            setQuery(text);
            if (error) setError('');
          }}
          placeholder="Search artist or song..."
          placeholderTextColor={theme.colors.subtext}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
          <MaterialIcons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={{color: 'red', textAlign: 'center', marginTop: 6}}>
          {error}
        </Text>
      ) : null}

      {loading && page === 0 ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : songs.length === 0 ? (
        <Text style={styles.emptyText}>
          No songs found. Try another search!
        </Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={item => `${item.id}-${item.title}`}
          renderItem={({item}) => (
            <SongCard
              song={item}
              onPress={() => navigation.navigate('SongDetail', {song: item})}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isPaginating ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
                style={{marginVertical: 16}}
              />
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SongListScreen;
