import React, { useState, useRef, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Animated, { useSharedValue } from "react-native-reanimated";
import Slider from "./components/Slider";

export default function App() {
  const [selectedYear, setSelectedYear] = useState(null); // Año seleccionado
  const slideValue = useSharedValue(0); // Inicializa slideValue
  const flatListRef = useRef(null); // Referencia al FlatList

  const data = [
    { id: "1", title: "Titulo 1", subtitle: "Subtitle 1", url: "https://picsum.photos/200/300", year: 2020 },
    { id: "2", title: "Title 2", subtitle: "Subtitle 2", url: "https://picsum.photos/200/300", year: 2021 },
    { id: "3", title: "Title 3", subtitle: "Subtitle 3", url: "https://picsum.photos/200/300", year: 2022 },
    { id: "4", title: "Titulo 4", subtitle: "Subtitle 4", url: "https://picsum.photos/200/300", year: 2021 },
    { id: "5", title: "Title 5", subtitle: "Subtitle 5", url: "https://picsum.photos/200/300", year: 2020 },
  ];

  // Filtrar los datos según el año seleccionado
  const filteredData = selectedYear ? data.filter(item => item.year === selectedYear) : data;

  // Reiniciar la posición del carrusel cuando cambie el filtro
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
      slideValue.value = 0; // Reinicia el valor del índice animado
    }
  }, [selectedYear]);

  return (
    <View style={ styles.container }>
      {/* Selector de Año */ }
      <View style={ styles.pickerContainer }>
        <Text style={ styles.pickerLabel }>Selecciona un año:</Text>
        <Picker
          selectedValue={ selectedYear }
          onValueChange={ (itemValue) => setSelectedYear(itemValue) }
          style={ styles.picker }
        >
          <Picker.Item label="Todos" value={ null } />
          <Picker.Item label="2020" value={ 2020 } />
          <Picker.Item label="2021" value={ 2021 } />
          <Picker.Item label="2022" value={ 2022 } />
        </Picker>
      </View>

      {/* Carrusel */ }
      <FlatList
        ref={ flatListRef }
        style={ { flex: 1 } }
        data={ filteredData }
        keyExtractor={ (item) => item.id }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={ false }
        onScroll={ ({ nativeEvent }) => {
          slideValue.value = nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
        } }
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
    backgroundColor: "#ff5733",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    width: 200,
    height: 50,
  },
});
