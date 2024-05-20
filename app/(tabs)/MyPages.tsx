import {
  getLoggedInUser,
  setIsLoggedInKey,
} from "@/components/Functions/Functions";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function MyPages() {
  const navigation = useNavigation();
  const [signInUser, setSignInUser] = useState<string | null>();

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const value = await AsyncStorage.getItem("IsLoggedInKey");
        console.log("hämtat värde från store", value);
        setSignInUser(value);
      } catch (error) {
        console.error("Error reading value from AsyncStorage:", error);
      }
    };
  }, [signInUser]);

  const handleLogout = async () => {
    try {
      // Ta bort den lagrade nyckeln
      await AsyncStorage.removeItem("IsLoggedInKey");
      console.log("Lagrad inloggning har tagits bort.");

      // @ts-ignore
      navigation.navigate("Harmony Run");
      const getLoggedInUser = async () => {
        try {
          const value = await AsyncStorage.getItem("IsLoggedInKey");
          console.log("hämtat värde från store", value);
          setSignInUser(value);
        } catch (error) {
          console.error("Error reading value from AsyncStorage:", error);
        }
      };
      getLoggedInUser();
    } catch (error) {
      console.error(
        "Ett fel uppstod när den lagrade inloggningen skulle tas bort:",
        error
      );
    }
  };

  return (
    <>
      <View>
        <Text>Welcome to my pages!</Text>
      </View>
      <View>
        <Text>Log out?</Text>
        <Button title="Sign out" onPress={handleLogout} />
      </View>
    </>
  );
}
