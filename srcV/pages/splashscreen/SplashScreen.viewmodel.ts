import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../src/types/navigation";
import { useFonts } from "expo-font";

/**
 * Hook para página SplashScreen
 * @returns Função do tempo que a SplashScreen fica na tela
 */
export function useSplashViewModel() {
  type Nav = NativeStackNavigationProp<RootStackParamList, "SplashScreen">;
  const navigation = useNavigation<Nav>();

  const [fontsLoaded] = useFonts({
    pixel: require("../../../fonts/PixelifySans-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("HomeDay"), 5000);

    return () => clearTimeout(timer);
  }, []);

  return {
    fontsLoaded,
  };
}
