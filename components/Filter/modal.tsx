import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  const isVisible = isMobileFormat && isScroll && !newParams.id;

  return (
    <>
      {isVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showInfo}>
            <Ionicons size={40} name="filter-circle-outline" />
          </TouchableOpacity>
        </View>
      )}
      <Animated.View style={[styles.infoBox, { paddingTop: isMobileDevice ? 60 : 20, transform: [{ translateX: slideAnimation }] }]}>
        <Filter 
          selectOption={selectOption} 
          getChangeName={getChangeName} 
          filterParams={filterParams} 
          removeOption={removeOption} 
          setRefresh={setRefresh} 
          isScroll={isScroll || absoluteFilterOpen} 
        />
        <TouchableOpacity onPress={hideInfo} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
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
    borderBottomLeftRadius: 5,
  },
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
  closeButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 40,
    marginHorizontal: 20,
    backgroundColor: "#fc7e7e",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 10,
  },
  closeButtonText: {
    color: "white",
  },
});

export default FilterModal;