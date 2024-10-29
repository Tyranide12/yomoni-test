import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import FlipCard from "../../../components/card";
import RegularContent from "../../../components/card/card_front";
import FlippedContent from "../../../components/card/card_back";
import RickHeader from "@/components/header/rickHeader";
import Filter from "@/components/Filter";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import FilterModal from "@/components/Filter/modal";

interface NbPages {
  current: number;
  rest: number;
}

interface Location {
  name: string;
}

interface Origin {
  name: string;
}

interface Character {
  id: number;
  name: string;
  gender: "Female" | "Male" | "Unknown";
  status: string;
  image: string;
  species: string;
  type?: string;
  origin: Origin;
  location: Location;
}

interface FilterParams {
  [key: string]: any;
}

export default function Characters() {
  const newParams = useLocalSearchParams();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nbPagesGet, setNbPageGet] = useState<NbPages>({ current: 1, rest: 0 });
  const [filterParams, setFilterParams] = useState<FilterParams | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const selectOption = (category: string, value: any) => {
    setFilterParams((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const removeOption = (key: string) => {
    setFilterParams((prev) => {
      const newObject = { ...prev };
      delete newObject[key];
      return newObject;
    });
  };

  const getCharacters = async (params: FilterParams) => {
    const formattedParams = new URLSearchParams(params).toString();
    setIsFetching(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character${newParams.id ? "/" + newParams.id : ""}?${formattedParams}`);
      const json = await response.json();

      setNbPageGet((prev) => ({ current: prev.current + 1, rest: json?.info?.pages }));
      if (json?.results?.length > 0) {
        setCharacters((prev) => [...prev, ...json.results]);
      } else if (json?.length > 0) {
        setCharacters((prev) => [...prev, ...json]);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => !prev);
      return () => {
        setNbPageGet({ current: 1, rest: 0 });
        setCharacters([]);
      };
    }, [])
  );

  useEffect(() => {
    setNbPageGet({ current: 1, rest: 0 });
    setCharacters([]);
    const timer = setTimeout(() => {
      getCharacters({ ...filterParams, page: 1 });
    }, 1000);
    return () => clearTimeout(timer);
  }, [filterParams, refresh]);

  const loadMore = () => {
    if (nbPagesGet.current <= nbPagesGet.rest) {
      getCharacters({ ...filterParams, page: nbPagesGet.current });
    }
  };

  const getChangeName = (params: string) => {
    setFilterParams((prev) => ({ ...prev, name: params }));
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterModal {...{ selectOption, getChangeName, filterParams, removeOption, setRefresh, isScroll }} />
      {isScroll && <RickHeader {...{ selectOption, getChangeName, filterParams, removeOption, setRefresh, isScroll }} />}
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        setIsScroll={setIsScroll}
        isScroll={isScroll}
        loadMore={loadMore}
        nbPagesGet={nbPagesGet}
        headerImage={
          <Image
            source={require('@/assets/images/rickPictures/rick_header.jpg')}
            style={styles.reactHeader}
          />
        }
      >
        <Filter {...{ selectOption, getChangeName, filterParams, removeOption, isScroll, setRefresh }} />
        <View style={{ flexDirection: "row", gap: 10, margin: 'auto', flexWrap: "wrap", marginTop: 20 }}>
          {characters?.length === 0 && !isFetching && <Text>No Characters with filters parameters</Text>}
          {characters?.map((char, i) => (
            <FlipCard
              key={`current-card-${i}`}
              FlippedContent={<FlippedContent content={char}/>}
              RegularContent={<RegularContent content={char} />}
            />
          ))}
          {isFetching && <ActivityIndicator size={30} />}
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  reactHeader: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#007AFF',
  },
  selectedFilters: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  infoText: {
    marginBottom: 10,
  },
});