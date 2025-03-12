import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import useCarousel from '../hooks/useCarousel';

const Slider = ({ item, slideValue, index }) => {
    const { width, height } = useWindowDimensions();

    // Usa el hook para obtener los estilos animados
    const { animatedContainerStyle, imageStyle, animatedHeaderStyle } = useCarousel(slideValue, index);

    return (
        <Animated.View
            style={ [
                {
                    flex: 1,
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            ] }
        >
            <Animated.View
                style={ [
                    styles.header,
                    { height: height * 0.15 },
                    animatedHeaderStyle, // Aplica el estilo animado al encabezado
                ] }
            >
                <Text style={ styles.title }>{ item.title }</Text>
                <Text style={ styles.subtitle }>{ item.subtitle }</Text>
            </Animated.View>

            <Animated.View
                style={ [
                    styles.imageContainer,
                    { height: height * 0.65 },
                    animatedContainerStyle, // Aplica el estilo animado al contenedor de la imagen
                ] }
            >
                <Animated.Image
                    style={ [{ height: 300, width: 200 }, imageStyle] } // Aplica el estilo animado a la imagen
                    source={ { uri: item.url } }
                    resizeMode="cover"
                />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f1f1f1',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 18,
        overflow: 'hidden',
    },
});

export default Slider;
