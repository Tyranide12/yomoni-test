import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { isMobileDevice } from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";

interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
}

interface GroupedBySeason {
  [season: string]: Episode[];
}

export default function Episodes() {
  const [data, setData] = useState<GroupedBySeason>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPages = async (url: string): Promise<Episode[]> => {
    const results: Episode[] = [];

    while (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json: { results: Episode[]; info: { next: string | null } } = await response.json();
      results.push(...json.results);
      url = json.info.next !== null ? json.info.next : '';
    }

    return results;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const allResults = await fetchAllPages(`https://rickandmortyapi.com/api/episode?page=1`);
        const groupedBySeason = allResults.reduce<GroupedBySeason>((acc, episode) => {
          const seasonNumber = episode.episode.split('E')[0];
          if (!acc[seasonNumber]) {
            acc[seasonNumber] = [];
          }
          acc[seasonNumber].push(episode);
          return acc;
        }, {});
        setData(groupedBySeason);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  function getIds(urls: string[]): string[] {
    return urls.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
  }

  return (
    <ScrollView style={[styles.container, { marginTop: isMobileDevice ? 60 : 0 }]}>
      {Object.keys(data).map(season => (
        <View key={season} style={styles.seasonContainer}>
          <Text style={styles.seasonTitle}>Season {season}</Text>
          <FlatList
            scrollEnabled={false}
            data={data[season]}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.episode}</Text>
                    <Text style={styles.cardText}>Episode: {item.name}</Text>
                    <Text style={styles.cardText}>Air Date: {item.air_date}</Text>
                  </View>
                  {item?.characters?.length > 0 ? (
                    <TouchableOpacity onPress={() => router.push(`/characters?id=${getIds(item.characters).join(',')}`)}>
                      <Ionicons name="person-circle-outline" size={30} color="#007bff" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  seasonContainer: {
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seasonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});