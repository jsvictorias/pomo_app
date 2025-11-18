import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../src/types/navigation";
import { TomatoTimer } from "../../src/components/tomato-timer";

const { width, height } = Dimensions.get("window");
const CLOUD_COUNT = 5;

type TimerMode = "focus" | "delay" | "break";

type TimerOption = {
  minutes: number;
  breakMinutes: number;
};

const TIMER_OPTIONS: TimerOption[] = [
  { minutes: 25, breakMinutes: 5 },
  { minutes: 30, breakMinutes: 10 },
  { minutes: 50, breakMinutes: 20 },
];

const DELAY_SECONDS = 5;

const STORAGE_KEYS = {
  FOCUS_TIME: "focus_time",
  BREAK_TIME: "break_time",
};

const TimerStorage = {
  saveFocusTime: async (minutes: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FOCUS_TIME, minutes.toString());
    } catch {}
  },
  saveBreakTime: async (minutes: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BREAK_TIME, minutes.toString());
    } catch {}
  },
  getFocusTime: async () => {
    try {
      const v = await AsyncStorage.getItem(STORAGE_KEYS.FOCUS_TIME);
      return v ? parseInt(v) : 25;
    } catch {
      return 25;
    }
  },
  getBreakTime: async () => {
    try {
      const v = await AsyncStorage.getItem(STORAGE_KEYS.BREAK_TIME);
      return v ? parseInt(v) : 5;
    } catch {
      return 5;
    }
  },
};

export const Timer = () => {
  // Melhor tipo para RN / TS
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const cloudConfigs = useRef(
    Array.from({ length: CLOUD_COUNT }, () => ({
      size: Math.random() * 80 + 400,
      top: Math.random() * (height * 0.6),
      opacity: 0.7 + Math.random() * 0.5,
      duration: Math.random() * 10000 + 30000,
    }))
  ).current;

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [title, setTitle] = useState("Começar");
  const [currentTimer, setCurrentTimer] = useState(TIMER_OPTIONS[0]);
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    // Só inicia se estiver em foco e não estiver rodando
    if (isRunning || mode !== "focus") return;

    clear();
    setIsRunning(true);
    setTitle("Período de foco!");

    TimerStorage.saveFocusTime(currentTimer.minutes);
    TimerStorage.saveBreakTime(currentTimer.breakMinutes);

    // sempre reinicia o foco do zero
    setTimeLeft(currentTimer.minutes * 60);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          handleFocusEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleFocusEnd = () => {
    // terminou foco → entra em delay de 5 segundos
    setIsRunning(true);
    setMode("delay");
    setTitle("Tempo de descanso...");
    setTimeLeft(DELAY_SECONDS);

    clear();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          setIsRunning(false);
          startBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startBreak = () => {
    clear();
    setMode("break");
    setIsRunning(true);
    setTitle("Hora do descanso!");
    setTimeLeft(currentTimer.breakMinutes * 60);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          handleBreakEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBreakEnd = () => {
    clear();
    setIsRunning(false);
    setMode("focus");
    setTitle("Começar");
    setTimeLeft(currentTimer.minutes * 60);
  };


  useEffect(() => {
    const load = async () => {
      const f = await TimerStorage.getFocusTime();
      const b = await TimerStorage.getBreakTime();

      const saved = TIMER_OPTIONS.find(
        (o) => o.minutes === f && o.breakMinutes === b
      );

      if (saved) {
        setCurrentTimer(saved);
        setIndex(TIMER_OPTIONS.indexOf(saved));
        setTimeLeft(saved.minutes * 60);
      }
    };

    load();
  }, []);

  // MUITO IMPORTANTE: limpa interval quando o componente desmontar
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#189DF0", "#EEF5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.tomatotimerview}>
        <TomatoTimer />
      </View>

      {/* Botão para ir pra biblioteca */}
      <View style={styles.libContainer}>
        {/* 3 plantinhas na esquerda */}
        <View style={styles.plantsContainer}>
          <Image
            source={require("../../assets/plantinha.png")}
            style={styles.plantImage}
          />
        </View>

        {/* Botão no centro */}
        <TouchableOpacity
          style={styles.butLib}
          onPress={() => navigation.navigate("Library")}
        >
          <Text style={styles.textLib}>ir para biblioteca</Text>
        </TouchableOpacity>

        {/* 3 plantinhas na direita */}
        <View style={styles.plantsContainer}>
          <Image
            source={require("../../assets/plantinha.png")}
            style={styles.plantImage}
          />
        </View>
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
    fontSize: 50,
    color: "black",
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 999,
    textShadowColor: 'white',
    textShadowOffset: { width: 5, height: 5 },
    textAlign: 'center',
    marginBottom: 50,
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
    marginTop: 20,
  },
  
  tomatotimerview: {
    position: "absolute",
    top: 260,
    width: "100%",
    alignItems: "center",
  },

  arrow: {
    fontSize: 50,
    color: "black",
    fontWeight: "bold",
  },

  timerButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  timerImage: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
  },

  timerText: {
    position: "absolute",
    fontFamily: "Coiny",
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginTop: 40,
  },

  breakText: {
    position: "absolute",
    fontFamily: "Coiny",
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 80,
  },

  circle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#E88787",
    borderWidth: 8,
    borderColor: "#B71C1C",
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    alignItems: "center",
  },

  infoText: {
    fontFamily: "Coiny",
    fontSize: 18,
    color: "black",
    marginVertical: 2,
  },
  libContainer: {
  position: "absolute",
  bottom: 70,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
},
plantsContainer: {
  flexDirection: 'row',
  alignItems: 'flex-end',
},
plantImage: {
  width: 90,
  height: 90,
  marginHorizontal: 2,
},
butLib: {
  backgroundColor: '#78E372',
  borderRadius: 15,
  width: 180,
  padding: 10,
  borderColor: '#216E1D',
  borderWidth: 3,
  marginHorizontal: 10, 
},
textLib: {
  fontSize: 18,
  fontFamily: 'pixel',
  textAlign: 'center',
},
});