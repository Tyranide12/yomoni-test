import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ExempleCard = () => {
  return (<View style={{ width: 100, height: 170, backgroundColor: 'white', borderRadius: 8, shadowColor: "black", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, }}>
  <Text>toto</Text>
</View>)
}

function returnCard(numberMax: number) {
  var i = 0
  var tabTest = []
  while (i < numberMax) {
    tabTest[i] = ExempleCard
    i++
  }
  return tabTest
}

export default function pageOne() {
  const [isScroll, setIsScroll] = useState(false)

  const numberTest = 150

  return (
    <View style={{ flex: 1 }}>
        {isScroll && <View style={{ position: "absolute", backgroundColor: "white", height: 140, width: "100%", top: 0, zIndex: 9999, shadowOpacity: 0.4, shadowColor: "black", shadowOffset: { width: 0, height: 3 } }}>
          <View style={{ flex: 1, marginTop: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('@/assets/images/rickPictures/rick_logo.jpg')}
              style={styles.reactLogo}
              />
              <Image source={require('@/assets/images/rickPictures/rick_title.png')}
              style={styles.reactTitle}
              />
            </View>
            <TouchableOpacity onPress={() => console.log("IsPressed")}>
              <Ionicons name="settings" size={25}/>
            </TouchableOpacity>
          </View>
        </View>}

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      isScroll={isScroll}
      setIsScroll={setIsScroll}
      headerImage={
        <Image
          source={require('@/assets/images/rickPictures/rick_header.jpg')}
          style={styles.reactHeader}
        />
      }>
      <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: 'space-between', gap: 3,
    flexWrap: "wrap" }}>
        {returnCard(numberTest).map(El => <El/>)}
      </View>
    </ParallaxScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  reactHeader: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  reactLogo: {
    height: 50,
    width: 50,
    marginRight: 20
  },
  reactTitle: {
    height: 50,
    width: 150
  }
});