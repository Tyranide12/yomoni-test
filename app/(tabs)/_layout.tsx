import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
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
        name="rick&morty/index"
        options={{
          title: 'rick&morty',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('@/assets/images/rickPictures/rick_logo.jpg')} style={{ width: focused ? 30 : 20, height: focused ? 30 : 20 }}/>
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pokemon/index"
        options={{
          title: 'Pokemon',
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="starWars/index"
        options={{
          title: 'StarWars',
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
