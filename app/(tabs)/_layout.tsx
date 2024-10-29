import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="characters/index"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('@/assets/images/rickPictures/rick_logo.jpg')} style={{ width: focused ? 30 : 20, height: focused ? 30 : 20 }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="locations/index"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('@/assets/images/rickPictures/planet.jpg')} style={{ width: focused ? 30 : 20, height: focused ? 30 : 20 }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="episodes/index"
        options={{
          title: 'Episodes',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('@/assets/images/rickPictures/player.jpg')} style={{ width: focused ? 30 : 20, height: focused ? 30 : 20 }}/>
          ),
        }}
      />
    </Tabs>
  );
}
