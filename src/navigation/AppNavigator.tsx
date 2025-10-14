import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SongListScreen from '../screens/SongList/SongListScreen';
import SongDetailScreen from '../screens/SongDetail/SongDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SongList"
        component={SongListScreen}
        options={{title: 'Songs'}}
      />
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={{title: 'Song Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
