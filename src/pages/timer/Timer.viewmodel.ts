// src/pages/timer/Timer.viewmodel.ts

import { useRef, useState } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

/**
 * Model - Timer
 * @returns funções de lógica do tempo, mudança de título e navegação da página do timer
 */

export function useTimerViewModel() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [title, setTitle] = useState("Começar");

  const timerRef = useRef<any>(null);

  // Fade do título
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTitle = (newText: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTitle(newText);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const goToLibrary = () => navigation.navigate("Library");

  const stopTimer = () => {
    if (timerRef.current) {
      timerRef.current.stopTimer();
    }
  };

  return {
    title,
    fadeAnim,
    timerRef,
    animateTitle,
    goToLibrary,
    stopTimer,
  };
}
