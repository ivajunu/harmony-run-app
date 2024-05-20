import { WorkoutProps } from "@/Types/Types";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";

export default function AllWorkouts() {
  const [high, setHigh] = useState<boolean | undefined>(false);
  const [medium, setMedium] = useState<boolean | undefined>(false);
  const [low, setLow] = useState<boolean | undefined>(false);

  type WorkoutState = {
    low: WorkoutProps[];
    medium: WorkoutProps[];
    high: WorkoutProps[];
  };

  const [allWorkouts, setAllWorkouts] = useState<WorkoutState>({
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

  return (
    <>
      <Text>Browse all workouts</Text>
      <View>
        <Pressable
          onPress={() => {
            if (allWorkouts.high.length === 0) {
              fetchWorkouts(URL.high, "high");
            }
            setHigh(!high);
          }}
          style={styles.container}
        >
          <Text style={styles.title}>High intensity workouts</Text>
        </Pressable>
        {high && (
          <View>
            <FlatList
              data={allWorkouts.high}
              keyExtractor={(item) => item.id.toString()} // Assuming you want to use the index as the key
              renderItem={({ item }) => (
                <View>
                  <Text>{item.type}</Text>
                  <View>
                    <Text>{item.duration}</Text>
                  </View>
                  <View>
                    <Text>{item.instruction}</Text>
                  </View>
                  <View>
                    <Text>{item.intensity}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
      <View>
        <Pressable
          onPress={() => {
            if (allWorkouts.medium.length === 0) {
              fetchWorkouts(URL.medium, "medium");
            }
            setMedium(!medium);
          }}
          style={styles.container}
        >
          <Text style={styles.title}>Medium intensity workouts</Text>
        </Pressable>
        {medium && (
          <View>
            <FlatList
              data={allWorkouts.medium}
              keyExtractor={(item) => item.id.toString()} // Assuming you want to use the index as the key
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <View>
                    <Text style={styles.title}>{item.type}</Text>
                  </View>
                  <View>
                    <Text>{item.duration}</Text>
                  </View>
                  <View>
                    <Text>{item.instruction}</Text>
                  </View>
                  <View>
                    <Text>{item.intensity}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
      <View>
        <Pressable
          onPress={() => {
            if (allWorkouts.low.length === 0) {
              fetchWorkouts(URL.low, "low");
            }
            setLow(!low);
          }}
          style={styles.container}
        >
          <Text style={styles.title}>Low intensity workouts</Text>
        </Pressable>
        {low && (
          <View>
            <FlatList
              data={allWorkouts.low}
              keyExtractor={(item) => item.id.toString()} // Assuming you want to use the index as the key
              renderItem={({ item }) => (
                <View>
                  <Text>{item.type}</Text>
                  <View>
                    <Text>{item.duration}</Text>
                  </View>
                  <View>
                    <Text>{item.instruction}</Text>
                  </View>
                  <View>
                    <Text>{item.intensity}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a01d5d",
    margin: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    margin: 10,
    color: "white",
  },
});
