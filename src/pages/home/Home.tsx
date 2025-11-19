import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./Home.styles";
import { useHomeViewModel } from "./Home.viewmodel";

/**
 * Página Principal
 * @returns UI da Página Principal
 */
export const Home = () => {
  const {
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
    navigateToTimer,
    navigateToLibrary,
  } = useHomeViewModel();

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={["#189DF0", "#EEF5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* NUVENS */}
      {cloudAnims.map((anim, i) => {
        const config = cloudConfigs[i];
        return (
          <Animated.Image
            key={i}
            source={require("../../../assets/n-grande.png")}
            style={{
              position: "absolute",
              width: config.size,
              height: config.size * 0.5,
              top: config.top,
              opacity: config.opacity,
              left: 0,
              transform: [{ translateX: anim }],
            }}
            resizeMode="contain"
          />
        );
      })}

      {/* TÍTULO */}
      <Text style={styles.title}>Pomo</Text>

      {/* BOTÕES */}
      <View style={styles.buttonRow}>
        {/* TIMER */}
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            animPressIn(scaleStart);
            setIsStartPressed(true);
            navigateToTimer();
          }}
          onPressOut={() => {
            animPressOut(scaleStart);
            setIsStartPressed(false);
          }}
        >
          <Animated.View style={[styles.buttonBox, { transform: [{ scale: scaleStart }] }]}>
            <Image
              source={
                isStartPressed
                  ? require("../../../assets/botaovermelhoclicado.png")
                  : require("../../../assets/botaovermelho.png")
              }
              style={styles.pixelImage}
            />
            <Text style={styles.buttonText}>iniciar timer</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* BIBLIOTECA */}
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            animPressIn(scaleLibrary);
            setIsLibraryPressed(true);
            navigateToLibrary();
          }}
          onPressOut={() => {
            animPressOut(scaleLibrary);
            setIsLibraryPressed(false);
          }}
        >
          <Animated.View style={[styles.buttonBox, { transform: [{ scale: scaleLibrary }] }]}>
            <Image
              source={
                isLibraryPressed
                  ? require("../../../assets/botaoverdeclicado.png")
                  : require("../../../assets/botaoverde.png")
              }
              style={styles.pixelImage}
            />
            <Text style={styles.buttonText}>biblioteca</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
