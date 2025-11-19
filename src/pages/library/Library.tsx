import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./Library.styles";
import { useLibraryViewModel } from "./Library.viewmodel";

/**
 * View da Página da Biblioteca 
 * @returns Livro de receitas com as horas de descanso e de foco e data atual do usuário.
 */
export const Library = () => {
  const {
    focusSeconds,
    breakSeconds,
    currentDate,
    formatTime,
    goToTimer,
  } = useLibraryViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livro de Receitas</Text>
      <Text style={styles.subtitle}>quantas horas de produtividade hoje?</Text>

      <View style={styles.bookcontainer}>

        <Image 
          source={require("../../assets/livrodereceitas.png")} 
          style={styles.book}
        />

        {/* LADO ESQUERDO */}
        <Text style={styles.leftTitle}>Horas{"\n"}Produtivas</Text>
        <Text style={styles.leftHours}>{formatTime(focusSeconds)}</Text>

        {/* LADO DIREITO */}
        <Text style={styles.rightTitle}>Horas{"\n"}Descanso</Text>
        <Text style={styles.rightHours}>{formatTime(breakSeconds)}</Text>

        {/* DATA */}
        <Text style={styles.dayLabel}>dia: {currentDate}</Text>

        {/* BOTÃO + PLANTINHAS */}
        <View style={styles.libContainer}>
          
          <View style={styles.plantsContainer}>
            <Image
              source={require("../../assets/plantinha.png")}
              style={styles.plantImage}
            />
          </View>

          <TouchableOpacity style={styles.butLib} onPress={goToTimer}>
            <Text style={styles.textLib}>ir para timer</Text>
          </TouchableOpacity>

          <View style={styles.plantsContainer}>
            <Image
              source={require("../../assets/plantinha.png")}
              style={styles.plantImage}
            />
          </View>

        </View>
      </View>
    </View>
  );
};
