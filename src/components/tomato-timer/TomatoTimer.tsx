import React, { forwardRef, useImperativeHandle } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./TomatoTimer.styles";
import { useTomatoTimerViewModel } from "./TomatoTimer.viewmodel";

type TomatoTimerProps = {
  onChangeState?: (text: string) => void;
};

/**
 * View - TomatoTimer
 * @returns estilos do cronometro em formato de tomate
 */
export const TomatoTimer = forwardRef<any, TomatoTimerProps>(
  ({ onChangeState }, ref) => {
    const {
      mode,
      currentTimer,
      timeLeft,
      isRunning,
      prev,
      next,
      startTimer,
      stopTimer,
      formatTime,
    } = useTomatoTimerViewModel(onChangeState);

    useImperativeHandle(ref, () => ({
      stopTimer,
    }));

    return (
      <View style={styles.carouselContainer}>
        {/* PREVIOUS */}
        <TouchableOpacity disabled={isRunning} onPress={prev}>
          <Image source={require("../../../assets/setaesquerda.png")} />
        </TouchableOpacity>

        {/* TIMER BUTTON */}
        <TouchableOpacity
          style={styles.timerButton}
          onPress={startTimer}
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

        {/* NEXT */}
        <TouchableOpacity disabled={isRunning} onPress={next}>
          <Image source={require("../../../assets/setadireita.png")} />
        </TouchableOpacity>
      </View>
    );
  }
);
