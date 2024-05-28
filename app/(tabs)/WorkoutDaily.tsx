import { WorkoutProps } from "@/Types/Types";
import { setUserID } from "@/components/Functions/Functions";
import { StyledView, StyledViewBlueBorder } from "@/styled/StyledContainers";
import {
  StyledTitle,
  StyledText16Bold,
  StyledText16Regular,
  StyledPressable,
  ButtonText,
  StyledTitleGreen,
  StyledText16GreenBold,
} from "../../styled/StyledText.styled";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import useLoggedInUser from "@/components/Functions/fetchUser";

export default function WorkoutDaily() {
  const { user, loggedIn, loading: userLoading } = useLoggedInUser();
  const [score, setScore] = useState<string | undefined>("");
  const [workout, setWorkout] = useState<WorkoutProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
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

      getData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchUserAndScore = async () => {
        try {
          if (loggedIn) {
            setUserID(String(user?.id));
          }

          if (score) {
            const scoreResponse = await fetch(
              `https://harmony-run-backend.onrender.com/score?score=${encodeURIComponent(
                score
              )}`
            );
            const workoutData: WorkoutProps = await scoreResponse.json();
            console.log("resultat från fetch", workoutData);
            setWorkout(workoutData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserAndScore();
    }, [score, loggedIn, user])
  );

  const savedExercise = async () => {
    if (user && score !== "" && workout) {
      setSaving(true);
      try {
        const saveExerciseResponse = await fetch(
          "https://harmony-run-backend.onrender.com/saved_exercises",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              savedexercise: workout,
              user_id: user.id,
            }),
          }
        );
        const saveExerciseResult = await saveExerciseResponse.text();
        console.log(saveExerciseResult);

        const saveScoreResponse = await fetch(
          "https://harmony-run-backend.onrender.com/saved_scores",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              score: score,
              user_id: user.id,
            }),
          }
        );
        const saveScoreResult = await saveScoreResponse.text();
        console.log(saveScoreResult);
      } catch (error) {
        console.error("Error saving workout or score", error);
      } finally {
        setSaving(false);
      }
    } else {
      alert("We could not save the workout");
    }
  };

  if (loading || userLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <View>
        {workout ? (
          <StyledView>
            <StyledTitle>Result from the form:</StyledTitle>
            <StyledText16Bold>Type of training:</StyledText16Bold>
            <StyledText16Regular>{workout.type}</StyledText16Regular>
            <StyledText16Bold>Intensity:</StyledText16Bold>
            <StyledText16Regular>{workout.intensity}</StyledText16Regular>
            <StyledText16Bold>Duration:</StyledText16Bold>
            <StyledText16Regular>{workout.duration}</StyledText16Regular>

            <StyledText16Bold>Instruction:</StyledText16Bold>
            <StyledText16Regular>{workout.instruction}</StyledText16Regular>
          </StyledView>
        ) : (
          <StyledView>
            <StyledTitle>We could not find any exercises!</StyledTitle>
            <StyledText16Bold>
              Fill out the
              <Link to={"/Healthform"}>"daily health"</Link> form and get a
              recommendation!
            </StyledText16Bold>
          </StyledView>
        )}
        <StyledViewBlueBorder>
          <StyledTitleGreen>
            Want to save your recommended exercise?
          </StyledTitleGreen>
          <StyledPressable onPress={savedExercise} disabled={saving}>
            <ButtonText>SAVE EXERCISE</ButtonText>
          </StyledPressable>
          {saving && <ActivityIndicator size="small" color="#b24c84" />}
          <StyledText16GreenBold>
            You need to be logged in or create an account to be able to save the
            exercise.
          </StyledText16GreenBold>
        </StyledViewBlueBorder>
      </View>
    </View>
  );
}
