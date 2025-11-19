import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./stylesLibrary";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../src/types/navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Library = () => {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [focusSeconds, setFocusSeconds] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [currentDate, setCurrentDate] = useState("");

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

    useEffect(() => {
        loadTimes();
    }, []);

    const format = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
        return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
    };
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        loadTimes();

        const date = getCurrentDate();
        setCurrentDate(date);
    }, []);

    return(
        <View style={styles.container}>
            
            <Text style={styles.title}>Livro de Receitas</Text>
            <Text style={styles.subtitle}>quantas horas de produtividade hoje?</Text>

            <View style={styles.bookcontainer}>
                
                <Image 
                    source={require('../../assets/livrodereceitas.png')} 
                    style={styles.book}
                />

                {/* ----------- LADO ESQUERDO ----------- */}

                <Text style={styles.leftTitle}>Horas{"\n"}Produtivas</Text>
                <Text style={styles.leftHours}>{format(focusSeconds)}</Text>

                {/* ----------- LADO DIREITO ----------- */}

                <Text style={styles.rightTitle}>Horas{"\n"}Descanso</Text>
                <Text style={styles.rightHours}>{format(breakSeconds)}</Text>

                {/* ----------- DIA ----------- */}

                <Text style={styles.dayLabel}>dia: {currentDate}</Text>

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
                        onPress={() => navigation.navigate("Timer")}
                    >
                        <Text style={styles.textLib}>ir para timer</Text>
                    </TouchableOpacity>
                
                    {/* 3 plantinhas na direita */}
                    <View style={styles.plantsContainer}>
                        <Image
                            source={require("../../assets/plantinha.png")}
                            style={styles.plantImage}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
