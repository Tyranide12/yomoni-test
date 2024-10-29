import { useEffect, PropsWithChildren, ReactElement, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

interface Props {
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  isScroll: boolean;
  setIsScroll: React.Dispatch<React.SetStateAction<boolean>>;
  loadMore: () => void;
  nbPagesGet: { current: number; rest: number };
}

export const isMobileFormat = Platform.OS === 'android' || Platform.OS === 'ios' || Dimensions.get('window').width < 650;
export const isMobileDevice = Platform.OS === 'android' || Platform.OS === 'ios';

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  loadMore,
  nbPagesGet,
  isScroll,
  setIsScroll
}: PropsWithChildren<Props>) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (nbPagesGet.rest > 0 && contentHeight < Dimensions.get('window').height) loadMore();
  }, [contentHeight]);

  const isFitToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 120;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView 
        ref={scrollRef} 
        scrollEventThrottle={isMobileDevice ? 16 : 400}
        onContentSizeChange={(contentWidth, contentHeight) => setContentHeight(contentHeight)}
        onScroll={({ nativeEvent }) => {
          if (isScroll !== (nativeEvent.contentOffset.y > 250)) {
            setIsScroll(nativeEvent.contentOffset.y > 250);
          }
          if (isFitToBottom(nativeEvent)) {
            !isMobileDevice && loadMore();
          }
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          setIsScroll(nativeEvent.contentOffset.y > 250);
          if (isFitToBottom(nativeEvent)) {
            isMobileDevice && loadMore();
          }
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme], height: HEADER_HEIGHT },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    overflow: 'hidden',
  },
});