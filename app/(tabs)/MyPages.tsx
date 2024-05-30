import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import EditAccont from "@/components/EditAccout";
import {
  StyledLink16GreenBold,
  StyledText16GreenBold,
  StyledText16PinkBold,
  StyledText16PinkRegular,
  StyledTitleBlue,
} from "@/styled/StyledText.styled";
import {
  ButtonTextWhite,
  StyledPressablePink,
} from "@/styled/StyledForms.styled";
import {
  AllViewStyle,
  StyledViewBlueBorder,
  StyledViewPinkBorder,
} from "@/styled/StyledContainers";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function MyPages() {
  const navigation = useNavigation();
  const [signInUser, setSignInUser] = useState<string | null>();
  const [edit, setEdit] = useState<boolean>(false);

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
      await AsyncStorage.removeItem("IsLoggedInKey");
      console.log("IsLoggedInKey har tagits bort.");
      await AsyncStorage.removeItem("setUserID");
      console.log("setUserID har tagits bort.");
      await AsyncStorage.removeItem("backendKey");
      console.log("backendKey har tagits bort.");
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
    <AllViewStyle>
      <ScrollView>
        <StyledViewBlueBorder>
          <StyledTitleBlue style={{ fontSize: 26, textAlign: "center" }}>
            Welcome to my pages!
          </StyledTitleBlue>
          <StyledText16GreenBold style={{ textAlign: "center" }}>
            Here you can edit, delete and see your saved workouts.
          </StyledText16GreenBold>
          <StyledLink16GreenBold>
            <Link href={"SavedTraining"}>SAVED WORKOUTS</Link>
          </StyledLink16GreenBold>
        </StyledViewBlueBorder>
        <StyledViewPinkBorder>
          <StyledText16PinkBold style={{ textAlign: "center" }}>
            EDIT USER INFORMATION
          </StyledText16PinkBold>
          <View style={{ alignItems: "center" }}>
            <StyledPressablePink
              onPress={() => {
                setEdit(!edit);
              }}
            >
              <ButtonTextWhite>
                {edit ? "CLOSE EDIT MODE" : "EDIT"}
              </ButtonTextWhite>
            </StyledPressablePink>
          </View>
          {edit && <EditAccont />}
        </StyledViewPinkBorder>

        <StyledViewPinkBorder style={{ alignItems: "center" }}>
          <StyledText16PinkRegular>Sign out?</StyledText16PinkRegular>
          <StyledPressablePink onPress={handleLogout}>
            <ButtonTextWhite>SIGN OUT</ButtonTextWhite>
          </StyledPressablePink>
        </StyledViewPinkBorder>
      </ScrollView>
    </AllViewStyle>
  );
}
