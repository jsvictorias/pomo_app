import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import { SplashScreen } from "../../pages/splashscreen";
import { HomeDay } from "../../pages/home/day";
import { Timer } from "../../pages/timer";
import { Library } from "../../pages/library";  

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
        name="Timer"
        component={Timer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Library"
        component={Library}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
