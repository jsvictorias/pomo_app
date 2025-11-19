import { View, Text, Image } from "react-native";
import { styles } from "./SplashScreen.styles";
import { useSplashViewModel } from "./SplashScreen.viewmodel";

/**
 * View da página SplashScreen
 * @returns UI da página
 */
export const SplashScreen = () => {
  const { fontsLoaded } = useSplashViewModel();

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pomo</Text>

      <Image
        source={require("../../assets/pomo.png")}
        style={styles.image}
      />
    </View>
  );
};
