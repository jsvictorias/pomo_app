import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

const { width, height } = Dimensions.get("window");
const CLOUD_COUNT = 5;

/**
 * Hook para página Home
 * @returns Funções referente as animações e navegação da página Home
 */
export function useHomeViewModel() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [fontsLoaded] = useFonts({
    Coiny: require("../../../fonts/Coiny.ttf"),
  });

  // funções nuvens
  const cloudConfigs = useRef(
    Array.from({ length: CLOUD_COUNT }, () => ({
      size: Math.random() * 80 + 400,
      top: Math.random() * (height * 0.6),
      opacity: 0.7 + Math.random() * 0.50,
      duration: Math.random() * 10000 + 30000,
    }))
  ).current;

  const cloudAnims = useRef(
    Array.from({ length: CLOUD_COUNT }, () => new Animated.Value(0))
  ).current;

  // Botões animados
  const scaleStart = useRef(new Animated.Value(1)).current;
  const scaleLibrary = useRef(new Animated.Value(1)).current;

  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isLibraryPressed, setIsLibraryPressed] = useState(false);

  const animPressIn = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 0.88,
      speed: 60,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const animPressOut = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 1,
      speed: 60,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  // Animação das nuvens
  useEffect(() => {
    const startAnimations = () => {
      cloudAnims.forEach((anim, i) => {
        const config = cloudConfigs[i];
        const delay = i * 500 + Math.random() * 1000;

        const animateCloud = () => {
          anim.setValue(width + config.size);

          Animated.timing(anim, {
            toValue: -config.size * 2,
            duration: config.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) animateCloud();
          });
        };

        setTimeout(animateCloud, delay);
      });
    };

    startAnimations();

    return () => cloudAnims.forEach(anim => anim.stopAnimation());
  }, []);

  return {
    fontsLoaded,
    cloudAnims,
    cloudConfigs,

    scaleStart,
    scaleLibrary,
    isStartPressed,
    isLibraryPressed,
    setIsStartPressed,
    setIsLibraryPressed,

    animPressIn,
    animPressOut,

    navigateToTimer: () => navigation.navigate("Timer"),
    navigateToLibrary: () => navigation.navigate("Library"),
  };
}
