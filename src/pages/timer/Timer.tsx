import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./Timer.styles";
import { useTimerViewModel } from "./Timer.viewmodel";
import { TomatoTimer } from "../../components/tomato-timer/TomatoTimer";

/**
 * View página do cronômetro
 * @returns página do timer com navegação para a biblioteca + componentes de título e cronometro
 */
export const Timer = () => {
  const {
    title,
    fadeAnim,
    timerRef,
    animateTitle,
    goToLibrary,
    stopTimer,
  } = useTimerViewModel();

  return (
    <LinearGradient
      colors={["#189DF0", "#EEF5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        {title}
      </Animated.Text>

      <View style={styles.tomatotimerview}>
        <TomatoTimer ref={timerRef} onChangeState={animateTitle} />
      </View>

      {/* Botão Biblioteca + Plantinhas */}
      <View style={styles.libContainer}>
        <View style={styles.plantsContainer}>
          <Image
            source={require("../../../assets/plantinha.png")}
            style={styles.plantImage}
          />
        </View>

        <TouchableOpacity style={styles.butLib} onPress={goToLibrary}>
          <Text style={styles.textLib}>ir para biblioteca</Text>
        </TouchableOpacity>

        <View style={styles.plantsContainer}>
          <Image
            source={require("../../../assets/plantinha.png")}
            style={styles.plantImage}
          />
        </View>
      </View>

      {/* Botão Parar */}
      <TouchableOpacity style={styles.stop} onPress={stopTimer}>
        <Text style={styles.stoptext}>Parar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
