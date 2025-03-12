import { FlatList, StyleSheet, View, Text } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Slider from "./components/Slider";

export default function App() {
  const slideValue = useSharedValue(0); // Inicializa slideValue

  const data = [{
    'id': '1',
    'title': 'Titulo 1',
    'subtitle': 'Subtitle 1',
    'url': 'https://picsum.photos/200/300'
  }, {
    'id': '2',
    'title': 'Title 2',
    'subtitle': 'Subtitle 2',
    'url': 'https://picsum.photos/200/300'
  }, {
    'id': '3',
    'title': 'Title 3',
    'subtitle': 'Subtitle 3',
    'url': 'https://picsum.photos/200/300'
  }];

  const onSlide = ({ nativeEvent }) => {
    slideValue.value = nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
  };

  return (
    <View style={ styles.container }>
      <View style={ { height: 50 } }>
        <Text>Carousel</Text>
      </View>
      <FlatList
        style={ { flex: 1, backgroundColor: '#33c4ff' } }
        data={ data }
        keyExtractor={ (item) => item.id }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={ false }
        onScroll={ onSlide } // Detecta el deslizamiento
        renderItem={ ({ item, index }) => (
          <Slider item={ item } slideValue={ slideValue } index={ index } />
        ) }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5733',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
