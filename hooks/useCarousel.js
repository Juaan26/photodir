import { useWindowDimensions } from "react-native";
import { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

const useCarousel = (slideValue, index) => {
    const { width, height } = useWindowDimensions();

    const inputValues = [index - 1, index, index + 1];

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                slideValue.value,
                inputValues,
                [height * 0.5, height * 0.55, height * 0.50],
                Extrapolation.CLAMP
            ),
            transform: [
                {
                    translateX: interpolate(
                        slideValue.value,
                        inputValues,
                        [-(width * 80) / 100, 0, (width * 27) / 100],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        slideValue.value,
                        inputValues,
                        [1.5, 1, 1.5],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                slideValue.value,
                inputValues,
                [0, 1, 0],
                Extrapolation.CLAMP
            ),
            transform: [
                {
                    translateY: interpolate(
                        slideValue.value,
                        inputValues,
                        [0.5, 1, 0.5],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return { animatedContainerStyle, imageStyle, animatedHeaderStyle };
};

export default useCarousel;