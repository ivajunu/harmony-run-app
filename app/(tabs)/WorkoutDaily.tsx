import { WorkoutProps } from "@/Types/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function WorkoutDaily() {
  const [score, setScore] = useState<string | undefined>("");
  const [workout, setWorkout] = useState<WorkoutProps | undefined>(undefined);

  // Detta används istället för useEffect, då komponenten inte laddar om
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("backendKey");
          if (value !== null) {
            // Uppdatera state med värdet från AsyncStorage
            setScore(value);
          }
        } catch (error) {
          console.error("Error reading value from AsyncStorage:", error);
        }
      };

      getData(); // Anropa getData varje gång skärmen blir fokuserad
    }, [])
  );

  useEffect(() => {
    if (score) {
      fetch(
        `https://harmony-run-backend.onrender.com/score?score=${encodeURIComponent(
          score
        )}`
      )
        .then((response) => response.json())
        .then((result: WorkoutProps) => {
          console.log("resultat från fetch", result);
          setWorkout(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [score]);

  console.log("hämtat från store", score);

  return (
    <>
      <View>
        <Text>Hej detta är tab 3</Text>
        <View>
          {workout && (
            <View>
              <Text>Type of training: {workout.type}</Text>
              <Text>Intesity: {workout.intensity}</Text>
              <Text>Duration: {workout.duration}</Text>
              <Text>Instruction: {workout.instruction}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
