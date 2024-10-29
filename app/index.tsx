import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function first() {
  return (
    <View style={{ marginTop: 50 }}>
      <Text>Bienvenue sur Happy's APP !</Text>
      <Link href="/(tabs)/characters" asChild>
      <Button title="Découvrir"/>
    </Link>
    </View>
  )
}