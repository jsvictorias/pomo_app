import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import { SplashScreen } from "../../srcV/pages/splashscreen/SplashScreen";
import { Home } from "../../srcV/pages/home/Home";
import { Timer } from "../../srcV/pages/timer/Timer";
import { Library } from "../../srcV/pages/library/Library"; 

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
        component={Home}
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
