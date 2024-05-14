import { WorkoutProps } from "@/Types/Types";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function AllWorkouts() {
  const [allWorkouts, setAllWorkouts] = useState({
    low: [],
    medium: [],
    high: [],
  });

  const URL = {
    low: "https://harmony-run-backend.onrender.com/low",
    medium: "https://harmony-run-backend.onrender.com/medium",
    high: "https://harmony-run-backend.onrender.com/high",
  };

  function fetchWorkouts(url: string, key: string) {
    fetch(url)
      .then((response) => response.json())
      .then((result: WorkoutProps[]) => {
        setAllWorkouts((prevState) => ({
          ...prevState,
          [key]: result,
        }));
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }

  console.log("high", allWorkouts.high);
  console.log("medium", allWorkouts.medium);
  console.log("low", allWorkouts.low);

  return (
    <>
      <Text>Browse all workouts</Text>
      <View>
        <Pressable
          onPress={() => {
            fetchWorkouts(URL.high, "high");
          }}
        >
          <Text>High intensity workouts</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            fetchWorkouts(URL.medium, "medium");
          }}
        >
          <Text>Medium intensity workouts</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            fetchWorkouts(URL.low, "low");
          }}
        >
          <Text>Low intensity workouts</Text>
        </Pressable>
      </View>
    </>
  );
}
