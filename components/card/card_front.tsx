import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface RegularContentProps {
  content: {
    name: string;
    image: string;
    gender: 'Female' | 'Male' | 'Unknown';
  };
}

const RegularContent = ({ content }: RegularContentProps) => {
  const { name, image, gender } = content;

  const genderPicto: { [key: string]: string | null } = {
    "Female": 'female-outline',
    "Male": 'male-outline',
    "Unknown": null,
  };

  const currentGender = genderPicto[gender];

  return (
    <View style={regularContentStyles.card}>
      <Image
        style={regularContentStyles.image}
        source={{ uri: image }}
      />
      <View style={regularContentStyles.absoluteContainer}>
        {currentGender && (
          <View style={regularContentStyles.genderIconContainer}>
            <Ionicons size={20} color={currentGender === "female-outline" ? 'pink' : 'blue'} name={currentGender} />
          </View>
        )}
        <View style={regularContentStyles.gradientContainer}>
          <LinearGradient style={regularContentStyles.gradient} colors={['transparent', 'rgba(0,0,0,1)']}>
            <View style={regularContentStyles.textContainer}>
              <Text style={regularContentStyles.text}>{name}</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#b6cff7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  genderIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
  },
  gradient: {
    height: 60,
    width: "100%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
  },
});

export default RegularContent;