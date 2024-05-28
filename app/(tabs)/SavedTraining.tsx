import { StyledViewBlueBackground } from "@/styled/StyledContainers";
import {
  StyledText16PinkBold,
  StyledText16PinkRegular,
  StyledTitleGreen,
  StyledTitlePink,
} from "@/styled/StyledText.styled";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { View, FlatList } from "react-native";

export default function SavedTraining() {
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [user, setUser] = useState<number | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  const getUserID = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("setUserID");
      console.log("Hämtat värde från GetUserID", value);
      setLoggedIn(value);
      setUser(Number(value));
    } catch (error) {
      console.error("Error reading value from AsyncStorage:", error);
    }
  }, []);

  const fetchExercises = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch(
          `https://harmony-run-backend.onrender.com/myexercises?user_id=${user}`
        );
        if (response.ok) {
          const data = await response.json();

          setExercises(data);
        } else {
          console.error("Failed to fetch exercises:", response.status);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      getUserID();
    }, [getUserID])
  );

  useFocusEffect(
    useCallback(() => {
      fetchExercises();
    }, [fetchExercises, user])
  );

  return (
    <View>
      <StyledTitleGreen style={{ fontSize: 26 }}>
        SAVED EXERCISES
      </StyledTitleGreen>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) =>
          `${item.user_id}-${item.savedexercise.id}-${index}`
        }
        renderItem={({ item }) => (
          <StyledViewBlueBackground>
            <StyledTitlePink>Your score: {item.score}</StyledTitlePink>
            <View>
              <StyledText16PinkBold>Type of exercise:</StyledText16PinkBold>
              <StyledText16PinkRegular>
                {item.savedexercise.type}
              </StyledText16PinkRegular>
              <StyledText16PinkBold>Duration:</StyledText16PinkBold>
              <StyledText16PinkRegular>
                {item.savedexercise.duration}
              </StyledText16PinkRegular>
              <StyledText16PinkBold>Intensity:</StyledText16PinkBold>
              <StyledText16PinkRegular>
                {item.savedexercise.intensity}
              </StyledText16PinkRegular>
              <StyledText16PinkBold>Instruction:</StyledText16PinkBold>
              <StyledText16PinkRegular>
                {item.savedexercise.instruction}
              </StyledText16PinkRegular>
            </View>
          </StyledViewBlueBackground>
        )}
      />
    </View>
  );
}
