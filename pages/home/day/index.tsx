import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Easing } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const CLOUD_COUNT = 5; // REDUZIDO para 5 nuvens

export const HomeDay = () => {
  const [fontsLoaded] = useFonts({
    Coiny: require("../../../fonts/Coiny.ttf"),
  });

  // Nuvens - AGORA com valores FIXOS
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
  // estados para trocar a imagem quando pressionado
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isLibraryPressed, setIsLibraryPressed] = useState(false);

  const animPressIn = (anim: Animated.Value | Animated.ValueXY) => {
    Animated.spring(anim, {
      toValue: 0.88,
      speed: 60,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const animPressOut = (anim: Animated.Value | Animated.ValueXY) => {
    Animated.spring(anim, {
      toValue: 1,
      speed: 60,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const startAnimations = () => {
      cloudAnims.forEach((anim, i) => {
        const config = cloudConfigs[i];
        const delay = i * 500 + Math.random() * 1000;

        const animateCloud = () => {
          // Começa da direita
          anim.setValue(width + config.size);
          
          Animated.timing(anim, {
            toValue: -config.size * 2,
            duration: config.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(({ finished }) => {
            // Quando terminar, reinicia imediatamente
            if (finished) {
              animateCloud();
            }
          });
        };

        // Delay inicial
        setTimeout(animateCloud, delay);
      });
    };

    startAnimations();

    return () => cloudAnims.forEach(anim => anim.stopAnimation());
  }, []);

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={["#4904AA", "#EEF5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* NUVENS - AGORA com valores FIXOS */}
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

      {/* BOTÕES PIXELADOS */}
      <View style={styles.buttonRow}>
        {/* BOTÃO 1 — INICIAR TIMER */}
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            animPressIn(scaleStart);
            setIsStartPressed(true);
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

        {/* BOTÃO 2 — BIBLIOTECA */}
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            animPressIn(scaleLibrary);
            setIsLibraryPressed(true);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: "Coiny",
    fontSize: 80,
    color: "#DC3733",
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 999,
    textShadowColor: 'white',
    textShadowOffset: { width: 5, height: 5 },
  },

  buttonRow: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  buttonBox: {
    alignItems: "center",
  },

  pixelImage: {
    width: 140,
    height: 140
  },

  buttonText: {
    fontFamily: "Coiny",
    fontSize: 26,
    color: "#000",
    marginTop: 10,
  },
});