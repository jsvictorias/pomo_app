import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerMode, TimerOption } from "./TomatoTimer.types";

export function useTomatoTimerViewModel(onChangeState?: (text: string) => void) {
  const TIMER_OPTIONS: TimerOption[] = [
    { minutes: 25, breakMinutes: 5 },
    { minutes: 30, breakMinutes: 10 },
    { minutes: 50, breakMinutes: 20 },
    { minutes: 1, breakMinutes: 1 }
  ];

  const DELAY_SECONDS = 5;


  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [currentTimer, setCurrentTimer] = useState(TIMER_OPTIONS[0]);
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  // --- FUNÇÕES GERAIS ---
    const intervalRef = useRef<number | null>(null);

    const clear = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startInterval = (callback: () => void) => {
      clear();
      intervalRef.current = setInterval(callback, 1000) as unknown as number;
    };


  // --- SALVAR TEMPO ---
  const safeNumber = (value: string | null) => {
    if (!value) return 0;
    const n = Number(value);
    return isNaN(n) ? 0 : n;
  };

  const saveFocusTime = async (seconds: number) => {
    try {
      // Se for a opção de 1 minuto, salvar equivalente a 25 min
      const equivalentSeconds = 
        currentTimer.minutes === 1 && currentTimer.breakMinutes === 1
          ? 25 * 60  // 1500 segundos
          : seconds;

      const stored = await AsyncStorage.getItem("storedFocusSeconds");
      const total = stored ? Number(stored) + equivalentSeconds : equivalentSeconds;

      await AsyncStorage.setItem("storedFocusSeconds", total.toString());
    } catch (e) {
      console.log("Erro ao salvar foco:", e);
    }
  };
  
  const saveBreakTime = async (seconds: number) => {
    try {
      const stored = await AsyncStorage.getItem("storedBreakSeconds");
      const total = stored ? Number(stored) + seconds : seconds;
      await AsyncStorage.setItem("storedBreakSeconds", total.toString());

      const check = await AsyncStorage.getItem("storedBreakSeconds");
      console.log("NOVO BREAK SALVO:", check);
    } catch (e) {
      console.log("Erro ao salvar descanso:", e);
    }
  };


  // --- TIMER PRINCIPAL ---
  const startTimer = () => {
    if (isRunning || mode !== "focus") return;

    setIsRunning(true);
    setTimeLeft(currentTimer.minutes * 60);
    onChangeState?.("Hora de Focar!");

    startInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          handleFocusEnd();
          return 0;
        }
        return prev - 1;
      });
    });
  };

  const handleFocusEnd = () => {
    saveFocusTime(currentTimer.minutes * 60);

    setMode("delay");
    setIsRunning(true);
    setTimeLeft(DELAY_SECONDS);
    onChangeState?.("Descanso iniciando...");

    startInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          startBreak();
          return 0;
        }
        return prev - 1;
      });
    });
  };

  const startBreak = () => {
    setMode("break");
    setIsRunning(true);
    setTimeLeft(currentTimer.breakMinutes * 60);
    onChangeState?.("Descanso...");

    startInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          handleBreakEnd();
          return 0;
        }
        return prev - 1;
      });
    });
  };

  const handleBreakEnd = () => {
    saveBreakTime(currentTimer.breakMinutes * 60);

    setIsRunning(false);
    setMode("focus");
    setTimeLeft(currentTimer.minutes * 60);
  };

  // --- TROCA DE OPÇÕES ---
  const prev = () => {
    if (isRunning) return;
    const newIndex = index === 0 ? TIMER_OPTIONS.length - 1 : index - 1;
    setIndex(newIndex);
    setCurrentTimer(TIMER_OPTIONS[newIndex]);
    setTimeLeft(TIMER_OPTIONS[newIndex].minutes * 60);
  };

  const next = () => {
    if (isRunning) return;
    const newIndex = index === TIMER_OPTIONS.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    setCurrentTimer(TIMER_OPTIONS[newIndex]);
    setTimeLeft(TIMER_OPTIONS[newIndex].minutes * 60);
  };

  // --- STOP ---
  const stopTimer = () => {
    clear();
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(currentTimer.minutes * 60);
  };

  useEffect(() => {
    return () => clear();
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };


  return {
    index,
    mode,
    currentTimer,
    timeLeft,
    isRunning,
    prev,
    next,
    startTimer,
    stopTimer,
    formatTime,
  };
}
