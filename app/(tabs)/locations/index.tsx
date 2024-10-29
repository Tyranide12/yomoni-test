import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { isMobileDevice } from "@/components/ParallaxScrollView";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export default function Locations() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPages = async (url: string): Promise<Location[]> => {
    const results: Location[] = [];

    while (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      results.push(...json.results);
      url = json.info.next;
    }

    return results;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const allResults = await fetchAllPages(`https://rickandmortyapi.com/api/location?page=1`);
        setData(allResults);
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
      {data.map((location) => (
        <View key={location.id} style={styles.card}>
          <View style={{ maxWidth: '70%' }}>
            <Text style={styles.title}>{location.name}</Text>
            <Text>Type: {location.type}</Text>
            <Text>Dimension: {location.dimension}</Text>
          </View>
          <View>
            {location?.residents?.length > 0 ? (
              <TouchableOpacity onPress={() => {
                router.push(`/characters?id=${getIds(location.residents).join(',')}`);
              }}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>View residents</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noResidentsText}>No residents</Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  card: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  buttonText: {
    color: "black",
  },
  noResidentsText: {
    color: "red",
  },
});