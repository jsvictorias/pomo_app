import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

/**
 * Hook para Página Library
 * @returns Funções de lógica de navegação e pegar data do dispositivo do usuário
 */

export function useLibraryViewModel() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  // Carregar valores armazenados
  const loadTimes = async () => {
    try {
      const f = await AsyncStorage.getItem("storedFocusSeconds");
      const b = await AsyncStorage.getItem("storedBreakSeconds");

      setFocusSeconds(f ? Number(f) : 0);
      setBreakSeconds(b ? Number(b) : 0);
    } catch (e) {
      console.log("Erro ao carregar:", e);
    }
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, "0");
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const y = today.getFullYear();

    return `${d}/${m}/${y}`;
  };

  useEffect(() => {
    loadTimes();
    setCurrentDate(getCurrentDate());
  }, []);

  return {
    focusSeconds,
    breakSeconds,
    currentDate,
    formatTime,
    goToTimer: () => navigation.navigate("Timer"),
  };
}
