import { StyleSheet, Text, View } from "react-native";

interface Origin {
  name: string;
}

interface Location {
  name: string;
}

interface FlippedContentProps {
  content: {
    name: string;
    image: string;
    gender: 'Female' | 'Male' | 'Unknown';
    status: string;
    species: string;
    type?: string;
    origin: Origin;
    location: Location;
  };
}

const FlippedContent = ({ content }: FlippedContentProps) => {
  const { name, status, species, type, gender, origin, location } = content;
  
  return (
    <View style={flippedContentStyles.card}>
      <Text>Nom: {name}</Text>
      <Text>Status: {status}</Text>
      <Text>Species: {species}</Text>
      <Text>Type: {type || "unknown"}</Text>
      <Text>Gender: {gender}</Text>
      <Text>Origin: {origin.name}</Text>
      <Text>Last Position: {location.name}</Text>
    </View>
  );
};

const flippedContentStyles = StyleSheet.create({
  card: {
    padding: 10,
    flex: 1,
    backgroundColor: '#baeee5',
    borderRadius: 16,
    justifyContent: 'center',
  },
  text: {
    color: '#001a72',
  },
});

export default FlippedContent;