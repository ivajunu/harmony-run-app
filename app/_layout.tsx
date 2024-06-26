import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DosisBold: require("../assets/fonts/static/Dosis-Bold.ttf"),
    DosisRegular: require("../assets/fonts/static/Dosis-Regular.ttf"),
    DosisExtraBold: require("../assets/fonts/static/Dosis-ExtraBold.ttf"),
    DosisExtraLight: require("../assets/fonts/static/Dosis-ExtraLight.ttf"),
    DosisLight: require("../assets/fonts/static/Dosis-Light.ttf"),
    DosisMedium: require("../assets/fonts/static/Dosis-Medium.ttf"),
    DosisSemiBold: require("../assets/fonts/static/Dosis-SemiBold.ttf"),
    DosisAll: require("../assets/fonts/Dosis-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="CreateAccount" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
