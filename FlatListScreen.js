import React, { useState, useRef, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Slider from "./components/Slider";

export default function FlatListScreen({ data, setData }) {
    const [selectedYear, setSelectedYear] = useState(null);
    const slideValue = useSharedValue(0);
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    console.log("datos que llegan a el carousel de base: ", data);
    const filteredData = selectedYear ? data.filter(item => item.year === selectedYear) : data;

    useEffect(() => {
        if (flatListRef.current && filteredData.length > 0) {
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
            slideValue.value = 0; // Reinicia el valor del índice animado
        }
    }, [selectedYear, filteredData]);

    const onSlide = ({ nativeEvent }) => {
        slideValue.value = nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.topBar }>
                {/* Selector de Año */ }
                <View style={ styles.pickerContainer }>
                    <Text>Selecciona un año:</Text>
                    <Picker
                        selectedValue={ selectedYear }
                        onValueChange={ itemValue => setSelectedYear(itemValue) }
                        style={ styles.picker }
                    >
                        <Picker.Item label="Todos" value={ "" } />
                        <Picker.Item label="2020" value={ 2020 } />
                        <Picker.Item label="2021" value={ 2021 } />
                    </Picker>
                </View>
                {/* Botón para añadir imágenes */ }
                <TouchableOpacity style={ styles.addButton } onPress={ () => navigation.navigate("AddImageScreen") }>
                    <Text style={ styles.addButtonText }>+</Text>
                </TouchableOpacity>
            </View>

            {/* Carrusel */ }
            { filteredData.length > 0 ? (
                <FlatList
                    ref={ flatListRef }
                    style={ { flex: 1 } }
                    data={ filteredData }
                    keyExtractor={ item => item.id }
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={ false }
                    onScroll={ onSlide }
                    renderItem={ ({ item, index }) => <Slider item={ item } slideValue={ slideValue } index={ index } /> }
                />
            ) : (
                <View style={ styles.emptyContainer }>
                    <Text style={ styles.emptyText }>No hay imágenes disponibles.</Text>
                </View>
            ) }
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ff5733" },
    topBar: { flexDirection: "row", justifyContent: "space-between", padding: 10 },
    pickerContainer: { backgroundColor: "#ffffff", padding: 10, borderRadius: 10 },
    picker: { width: 150, height: 50 },
    addButton: { backgroundColor: "#33c4ff", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" },
    addButtonText: { fontSize: 24, fontWeight: "bold", color: "#fff" },
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { fontSize: 18, color: "#fff" },
});
