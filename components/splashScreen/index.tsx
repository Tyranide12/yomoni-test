import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/rickPictures/planet.jpg'),
  require('@/assets/images/rickPictures/player.jpg'),
  require('@/assets/images/rickPictures/rick_logo.jpg'),
];

const SplashScreen = () => {
  const translateX = Array(3).fill([]).map(() => useSharedValue(-width - 40));
  const angles = Array(3).fill([]).map(() => useSharedValue(0));

  const startImageAnimation = async (index: number, delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    translateX[index].value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
  };

  const animateImage = async (index: number, delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    angles[index].value = withRepeat(
      withTiming(2 * Math.PI, { duration: 2000, easing: Easing.linear }),
      3,
      false
    );
  
    await new Promise(resolve => setTimeout(resolve, 4000));
    translateX[index].value = withTiming(width, { duration: 1000, easing: Easing.out(Easing.exp) });
  };

  useEffect(() => {
    const startAnimateImages = async () => {
      await startImageAnimation(0, 0);
      await startImageAnimation(1, 666);
      await startImageAnimation(2, 666);
    };
    startAnimateImages();

    const animateImages = async () => {
      animateImage(0, 666);
      animateImage(1, 1332);
      animateImage(2, 2000);
    };
    
    animateImages();
  }, []);

  const createAnimatedStyle = (index: number) => useAnimatedStyle(() => {
    const radius = 80;
    const x = radius * Math.cos(-angles[index].value);
    const y = radius * Math.sin(-angles[index].value);
    return {
      transform: [
        { translateX: translateX[index].value + x },
        { translateY: y },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.Image
          key={index}
          source={image}
          style={[styles.image, createAnimatedStyle(index)]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
});

export default SplashScreen;