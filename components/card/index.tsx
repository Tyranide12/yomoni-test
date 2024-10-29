import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Button, Pressable, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";

import flipCardStyles from './card.style';

interface FlipCardProps {
  direction?: 'x' | 'y';
  duration?: number;
  RegularContent: ReactNode;
  FlippedContent: ReactNode;
}

const FlipCard = ({
  direction = 'y',
  duration = 300,
  RegularContent,
  FlippedContent,
}: FlipCardProps) => {
  const isFlipped = useSharedValue(false);
  const isDirectionX = direction === 'x';

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "transparent", zIndex: 8, flex: 1, position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
        onPress={handlePress}
      />
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          flipCardStyles.flipCard,
          regularCardAnimatedStyle,
        ]}
      >
        <View style={{ flex: 1 }}>{RegularContent}</View>
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          flipCardStyles.flipCard,
          flippedCardAnimatedStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }}>{FlippedContent}</Pressable>
      </Animated.View>
    </View>
  );
};

export default FlipCard;