import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import { SplashScreen } from "../src/pages/splashscreen/SplashScreen";
import { Home } from "../src/pages/home/Home";
import { Library } from "../src/pages/library/Library";
import { Timer } from "../src/pages/timer/Timer";

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
