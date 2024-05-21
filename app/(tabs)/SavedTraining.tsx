import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";

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
      <Text>Your saved exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => `${item.user_id}-${item.savedexercise.id}`}
        renderItem={({ item }) => (
          <View>
            <Text>Type of exercise: {item.savedexercise.type}</Text>
            <Text>Duration: {item.savedexercise.duration}</Text>
            <Text>Intensity: {item.savedexercise.intensity}</Text>
            <Text>Instruction: {item.savedexercise.instruction}</Text>
            <Text>Score: {item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}
