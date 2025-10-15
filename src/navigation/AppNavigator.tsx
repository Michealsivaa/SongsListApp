import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import SongListScreen from '../screens/SongList/SongListScreen';
import SongDetailScreen from '../screens/SongDetail/SongDetailScreen';
import {useThemeContext} from '../theme/ThemeContext';
import useNavigationStyles from './Style';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isDark, toggleTheme, theme} = useThemeContext();
  const styles = useNavigationStyles();

  // ✅ Dynamically choose logo
  const logoSource = isDark
    ? require('../assets/icons/songify.png') // dark theme logo
    : require('../assets/icons/songify-white.png'); // light theme logo

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerContainer,
        headerTintColor: isDark ? theme.colors.text : '#fff',
        headerTitleAlign: 'left',
      }}>
      <Stack.Screen
        name="SongList"
        component={SongListScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Image source={logoSource} style={styles.logo} />
              <Text
                style={[
                  styles.titleText,
                  {color: isDark ? theme.colors.text : '#fff'},
                ]}>
                Songify
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
              <MaterialIcons
                name={isDark ? 'wb-sunny' : 'nightlight-round'}
                size={22}
                color={isDark ? theme.colors.text : '#fff'}
                style={{opacity: 0.8}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={{
          title: 'Song Details',
          headerStyle: {
            backgroundColor: isDark ? theme.colors.card : theme.colors.primary,
          },
          headerTintColor: isDark ? theme.colors.text : '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
