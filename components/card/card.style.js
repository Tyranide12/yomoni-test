import { StyleSheet } from "react-native";

export default StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
  flipCard: {
    width: 170,
    height: 200,
  },
});