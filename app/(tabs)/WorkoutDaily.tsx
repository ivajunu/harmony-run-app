import { User, WorkoutProps } from "@/Types/Types";
import { setUserID } from "@/components/Functions/Functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

export default function WorkoutDaily() {
  const [score, setScore] = useState<string | undefined>("");
  const [workout, setWorkout] = useState<WorkoutProps | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<string | null>("");
  const [user, setUser] = useState<User[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("backendKey");
          if (value !== null) {
            setScore(value);
          }
        } catch (error) {
          console.error("Error reading value from AsyncStorage:", error);
        }
      };

      const getLoggedInUser = async () => {
        try {
          const loggedInValue = await AsyncStorage.getItem("IsLoggedInKey");
          setLoggedIn(loggedInValue);
          console.log("workout daily from AsyncStorage:", loggedInValue);
        } catch (error) {
          console.error("Error reading value from AsyncStorage:", error);
        }
      };

      getData();
      getLoggedInUser();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const getScore = async () => {
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
      };
      const getUserID = async () => {
        if (loggedIn) {
          fetch(
            `https://harmony-run-backend.onrender.com/users?email=${encodeURIComponent(
              loggedIn
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data: User[]) => {
              console.log("Data fetched: ", data);
              setUser(data);
              setUserID(String(data[0].id));
            })
            .catch((error) => {
              console.error("Error fetching user info", error);
            });
        }
      };

      getUserID();
      getScore();
    }, [score])
  );

  function savedExercise() {
    if (user && score !== "" && workout) {
      fetch("https://harmony-run-backend.onrender.com/saved_exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          savedexercise: workout,
          user_id: user[0].id,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error saving workout", error);
        });

      fetch("https://harmony-run-backend.onrender.com/saved_scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: score,
          user_id: user[0].id,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error saving score", error);
        });
    } else {
      alert("We could not save the workout");
    }
  }

  return (
    <View>
      <Text>Hej detta är tab 3</Text>
      <View>
        {workout ? (
          <View>
            <Text>Type of training: {workout.type}</Text>
            <Text>Intensity: {workout.intensity}</Text>
            <Text>Duration: {workout.duration}</Text>
            <Text>Instruction: {workout.instruction}</Text>
          </View>
        ) : (
          <View>
            <Text>We could not find any exercises!</Text>
            <Text>
              Fill out the
              <Link to={"/Daily health form"}>"daily health"</Link> form and get
              a recommendation!
            </Text>
          </View>
        )}
        <View>
          <Text>Want to save your recommended exercise?</Text>
          <Button title="Save exercise" onPress={savedExercise} />
          <Text>
            You need to be logged in or create an account to be able to save the
            exercise.
          </Text>
        </View>
      </View>
    </View>
  );
}
