import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../src/types/navigation";
import { useFonts } from 'expo-font';

type SplashNav = NativeStackNavigationProp<RootStackParamList, "SplashScreen">;

export const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    pixel: require('../../fonts/PixelifySans-VariableFont_wght.ttf'),
  });
  const navigation = useNavigation<SplashNav>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeDay");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POMO</Text>

      <Image
        source={require("../../assets/pomo.png")}
        style={{ width: 340, height: 340 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD9C4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    marginBottom: 90,
    fontFamily: 'pixel',
    letterSpacing: 3,
  },
});
