import { Animated, Button, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Filter from ".";
import { isMobileDevice, isMobileFormat } from "../ParallaxScrollView";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

interface FilterModalProps {
  selectOption: (category: string, value: any) => void;
  getChangeName: (name: string) => void;
  filterParams: { [key: string]: any } | null;
  removeOption: (key: string) => void;
  setRefresh: (refresh: boolean) => void;
  isScroll: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  selectOption,
  getChangeName,
  filterParams,
  removeOption,
  setRefresh,
  isScroll,
}) => {
  const [absoluteFilterOpen, setAbsoluteFilterOpen] = useState<boolean>(false);
  const slideAnimation = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const newParams = useLocalSearchParams();

  const showInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setAbsoluteFilterOpen(true);
  };

  const hideInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setAbsoluteFilterOpen(false);
  };

  return (
    <>
      {isMobileFormat && isScroll && !newParams.id && (
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          right: 0,
          backgroundColor: "white",
          width: 60,
          height: 60,
          zIndex: 999,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5
        }}>
          <TouchableOpacity onPress={showInfo}>
            <Ionicons size={40} name="filter-circle-outline" />
          </TouchableOpacity>
        </View>
      )}
      <Animated.View style={[
        styles.infoBox,
        {
          paddingTop: isMobileDevice ? 60 : 0,
          transform: [{ translateX: slideAnimation }],
        },
      ]}>
        <Filter {...{ selectOption, getChangeName, filterParams, removeOption, setRefresh }} isScroll={isScroll || absoluteFilterOpen} />
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, marginBottom: 40, backgroundColor: '#fc7e7e', marginHorizontal: 20, borderRadius: 10 }}>
          <Button color={"white"} title="Fermer" onPress={hideInfo} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FilterModal;