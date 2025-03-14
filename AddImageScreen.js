import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddImageScreen({ navigation, data, setData }) {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [year, setYear] = useState("");
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permiso denegado",
                    "Es necesario otorgar permisos de acceso a la galería para seleccionar imágenes."
                );
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri); // Almacenar la imagen seleccionada
            }
        } catch (error) {
            console.error("Error al abrir la galería:", error);
            Alert.alert("Error", "Hubo un problema al abrir la galería. Por favor, intenta de nuevo.");
        }
    };

    const handleAddImage = () => {
        if (!imageUri || !title || !year) {
            Alert.alert("Campos incompletos", "Por favor, rellena todos los campos antes de continuar.");
            return;
        }

        const newImage = {
            id: (data.length + 1).toString(),
            title,
            subtitle,
            url: imageUri,
            year: parseInt(year, 10),
        };

        setData([...data, newImage]); // Agregar la nueva imagen
        navigation.goBack(); // Regresar a la pantalla anterior
    };

    return (
        <View style={ styles.container }>
            <Text style={ styles.label }>Título:</Text>
            <TextInput
                style={ styles.input }
                value={ title }
                onChangeText={ setTitle }
                placeholder="Escribe el título"
            />

            <Text style={ styles.label }>Subtítulo:</Text>
            <TextInput
                style={ styles.input }
                value={ subtitle }
                onChangeText={ setSubtitle }
                placeholder="Escribe el subtítulo"
            />

            <Text style={ styles.label }>Año:</Text>
            <TextInput
                style={ styles.input }
                value={ year }
                onChangeText={ setYear }
                placeholder="Escribe el año"
                keyboardType="numeric"
            />

            <TouchableOpacity style={ styles.imagePickerButton } onPress={ pickImage }>
                <Text style={ styles.imagePickerButtonText }>Seleccionar Imagen</Text>
            </TouchableOpacity>
            { imageUri ? <Image source={ { uri: imageUri } } style={ styles.imagePreview } /> : null }

            <Button title="Añadir Imagen" onPress={ handleAddImage } />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f1f1f1" },
    label: { fontSize: 16, marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
    imagePickerButton: { backgroundColor: "#33c4ff", padding: 10, marginBottom: 10, borderRadius: 5 },
    imagePickerButtonText: { color: "#fff", textAlign: "center" },
    imagePreview: { width: 200, height: 200, marginBottom: 15, alignSelf: "center" },
});
