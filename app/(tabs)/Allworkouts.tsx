import { WorkoutProps } from "@/Types/Types";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

export default function AllWorkouts() {
  const [high, setHigh] = useState<boolean | undefined>(false);
  const [medium, setMedium] = useState<boolean | undefined>(false);
  const [low, setLow] = useState<boolean | undefined>(false);

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
        {high && (
          <View>
            <FlatList
              data={allWorkouts.high}
              keyExtractor={(item, index) => index.toString()} // Assuming you want to use the index as the key
              renderItem={({ item }) => (
                <View>
                  <Text>{item}</Text>{" "}
                  {/* Replace "propertyName" with the actual property name you want to display */}
                  {/* Add more Text components to display other properties */}
                </View>
              )}
            />
          </View>
        )}
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
