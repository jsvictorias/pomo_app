import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./stylesTomato"

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

export const TomatoTimer = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<TimerMode>("focus");
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
    if (isRunning || mode !== "focus") return;

    clear();
    setIsRunning(true);
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
    setIsRunning(true);
    setMode("delay");
    setTimeLeft(DELAY_SECONDS);

    clear();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
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
    setTimeLeft(currentTimer.minutes * 60);
  };

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

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <TouchableOpacity disabled={isRunning} onPress={prev}>
        <Image source={require("../../../assets/setaesquerda.png")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.timerButton}
        onPress={() => {
            console.log("CLICOU NO TOMATE!!!");
            startTimer();
        }}
        disabled={isRunning || mode !== "focus"}
        >
        <Image
          source={require("../../../assets/tomatotimer.png")}
          style={styles.timerImage}
        />

        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

        {mode === "break" && (
          <Text style={styles.breakText}>
            Descanso: {currentTimer.breakMinutes} min
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity disabled={isRunning} onPress={next}>
        <Image source={require("../../../assets/setadireita.png")} />
      </TouchableOpacity>
    </View>
  );
};
