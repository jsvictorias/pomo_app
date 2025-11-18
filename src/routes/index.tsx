import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import { SplashScreen } from "../../pages/splashscreen";
import { HomeDay } from "../../pages/home/day";
import { HomeNight } from "../../pages/home/night";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeDay"
        component={HomeDay}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeNight"
        component={HomeNight}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
