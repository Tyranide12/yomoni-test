import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isMobileFormat } from "../ParallaxScrollView";
import { router, useLocalSearchParams } from "expo-router";

const options = {
  gender: ['Male', 'Female', 'genderless', 'unknown'],
  status: ['alive', 'dead', 'unknown'],
  espece: ['human', 'android', 'unknown'],
};

interface FilterProps {
  selectOption: (category: string, value: any) => void;
  removeOption: (key: string) => void;
  getChangeName: (name: string) => void;
  filterParams: { [key: string]: any } | null;
  isScroll: boolean;
  setRefresh: (refresh: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectOption,
  removeOption,
  getChangeName,
  filterParams,
  setRefresh,
}) => {
  const newParams = useLocalSearchParams();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const currentParams = filterParams;

  const renderRadioButton = (category: string, option: string) => {
    const isSelected = filterParams?.[category] === option;

    return (
      <TouchableOpacity
        key={option}
        style={styles.radioButtonContainer}
        onPress={() => selectOption(category, option)}
      >
        <View style={[styles.radioButton, isSelected && styles.selectedRadioButton]} />
        <Text>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={[styles.container, { flexDirection: isMobileFormat ? "column" : "row" }]}>
        {!newParams.id && (
          <View style={styles.searchContainer}>
            <TextInput onChangeText={getChangeName} placeholder="Search by name ..." />
          </View>
        )}
        {newParams?.id && (
          <TouchableOpacity onPress={() => {
            router.navigate('/characters');
            setRefresh((prev: boolean) => !prev);
          }}>
            <View style={styles.returnButton}>
              <Text>Return to all characters</Text>
            </View>
          </TouchableOpacity>
        )}
        {!newParams.id && (
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterIsOpen(prev => !prev)}
            >
              <Ionicons size={25} name="filter-circle-outline" />
              <Text style={styles.filterButtonText}>{filterIsOpen ? "Close" : "Filters"}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.selectedFiltersContainer}>
          {currentParams && Object.keys(currentParams).map((key) => (
            <View key={key} style={styles.selectedFilter}>
              <Text>{currentParams[key]}</Text>
              <TouchableOpacity onPress={() => removeOption(key)}>
                <Ionicons color="red" name="close-circle-outline" size={15} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {filterIsOpen && (
        <View style={styles.filterOptions}>
          <Text style={styles.subTitle}>Sexe</Text>
          <View style={styles.optionsContainer}>{options.gender.map((option) => renderRadioButton('gender', option))}</View>
          <Text style={styles.subTitle}>Status</Text>
          <View style={styles.optionsContainer}>{options.status.map((option) => renderRadioButton('status', option))}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginBottom: 15,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    width: isMobileFormat ? "100%" : 230,
  },
  returnButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  filterButtonContainer: {
    width: isMobileFormat ? "100%" : "auto",
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
  },
  filterButtonText: {
    color: "black",
    marginLeft: 5,
  },
  selectedFiltersContainer: {
    gap: 8,
    flexDirection: "row",
    marginLeft: 0,
    marginTop: 0,
  },
  selectedFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c4e4ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 15,
  },
  filterOptions: {
    flexDirection: "column",
  },
  optionsContainer: {
    flexDirection: "row",
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  subTitle: {
    fontWeight: '700',
  },
  selectedRadioButton: {
    backgroundColor: '#007AFF',
  },
  selectedFilters: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default Filter;