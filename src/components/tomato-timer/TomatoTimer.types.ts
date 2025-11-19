export interface TomatoTimerProps {
  /**
   * Callback executado quando o estado do timer muda.
   * 
   * @param text Texto representando o novo estado do timer.
   */
  onChangeState?: (text: string) => void;
}

export interface TimerOption {
  /**
   * Tempo de foco (em minutos) antes de iniciar o descanso.
   */
  minutes: number;

  /**
   * Tempo de descanso (em minutos) após finalizar o foco.
   */
  breakMinutes: number;
}

/**
 * Define o modo atual do timer.
 *
 * * focus – Contagem regressiva do tempo de foco.
 * * delay – Intervalo para a transição antes do descanso.
 * * break – Contagem regressiva do tempo de descanso.
 */
export type TimerMode = "focus" | "delay" | "break";
