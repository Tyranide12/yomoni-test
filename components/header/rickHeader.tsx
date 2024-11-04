import { Image, StyleSheet, View } from "react-native";
import Filter from "../Filter";
import { isMobileDevice, isMobileFormat } from "../ParallaxScrollView";

interface RickHeaderProps {
  selectOption: (category: string, value: any) => void;
  removeOption: (key: string) => void;
  getChangeName: (name: string) => void;
  filterParams: { [key: string]: any } | null;
  isScroll: boolean;
  setRefresh: (refresh: boolean) => void;
}

const RickHeader: React.FC<RickHeaderProps> = (props) => {
  return (
    <View style={[styles.headerContainer, isMobileDevice ? styles.mobilePadding : styles.defaultPadding]}>
      <View style={[styles.innerContainer, !isMobileFormat ? styles.mobileMargin : null]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/rickPictures/rick_logo.jpg')}
            style={styles.reactLogo}
          />
          <Image
            source={require('@/assets/images/rickPictures/rick_title.png')}
            style={styles.reactTitle}
          />
        </View>
      </View>
      {!isMobileFormat && <Filter {...props} />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    top: 0,
    zIndex: 10,
    shadowOpacity: 0.4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
  },
  mobilePadding: {
    paddingTop: 50,
    paddingVertical: 12,
  },
  mobileMargin: {
    marginBottom: 20
  },
  defaultPadding: {
    paddingTop: 12,
    paddingVertical: 12,

  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoContainer: {
    flexDirection: 'row',
  },
  reactLogo: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
  reactTitle: {
    height: 50,
    width: 150,
  },
});

export default RickHeader;