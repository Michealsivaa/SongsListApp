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

interface SongListScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const SongListScreen: React.FC<SongListScreenProps> = ({navigation}) => {
  const styles = UseStyles();
  const {theme} = useThemeContext();
  const {songs, fetchSongs, loading, clearSongs}: any = useSongStore();
  const [query, setQuery] = useState('Believer');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState('');

  const LIMIT = 10;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed.length > 0) {
        fetchSongs(trimmed, 0, LIMIT);
        setPage(0);
        setError('');
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSongs(query || 'imagine dragons', 0, LIMIT);
    setPage(0);
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (isPaginating || loading) return;
    const nextOffset = (page + 1) * LIMIT;
    setIsPaginating(true);
    await fetchSongs(query || 'imagine dragons', nextOffset, LIMIT, true);
    setPage(prev => prev + 1);
    setIsPaginating(false);
  };

  const clearSearch = () => {
    setQuery('');
    setError('');
    clearSongs();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
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
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
              <MaterialIcons
                name="close"
                size={20}
                color={theme.colors.subtext}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading && page === 0 ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : songs.length === 0 ? (
        <Text style={styles.emptyText}>
          No songs found. Try another search!
        </Text>
      ) : (
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
