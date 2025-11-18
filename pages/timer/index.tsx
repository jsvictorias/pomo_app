import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../src/types/navigation";
import { TomatoTimer } from "../../src/components/tomato-timer";


type TimerOption = {
  minutes: number;
  breakMinutes: number;
};

const TIMER_OPTIONS: TimerOption[] = [
  { minutes: 25, breakMinutes: 5 },
  { minutes: 30, breakMinutes: 10 },
  { minutes: 50, breakMinutes: 20 },
  { minutes: 1, breakMinutes: 1 },
];


export const Timer = () => {

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [title, setTitle] = useState("Começar");

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