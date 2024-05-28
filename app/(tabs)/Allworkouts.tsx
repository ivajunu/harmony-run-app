import { WorkoutProps } from "@/Types/Types";
import {
  AllViewStyle,
  StyledView,
  StyledViewPinkBorder,
} from "@/styled/StyledContainers";
import {
  ButtonTextLarge,
  StyledPressableLarge,
  StyledText16Bold,
  StyledText16PinkBold,
  StyledText16Regular,
  StyledTitlePink,
} from "@/styled/StyledText.styled";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AllWorkouts() {
  const [high, setHigh] = useState<boolean>(false);
  const [medium, setMedium] = useState<boolean>(false);
  const [low, setLow] = useState<boolean>(false);

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

  function fetchWorkouts(url: string, key: keyof WorkoutState) {
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
    <AllViewStyle>
      <ScrollView>
        <StyledViewPinkBorder>
          <StyledTitlePink>BROWSE ALL WORKOUTS</StyledTitlePink>
          <StyledText16PinkBold>
            Here you can browse the different workouts categorised by intensity
            levels.
          </StyledText16PinkBold>
        </StyledViewPinkBorder>

        <StyledPressableLarge
          onPress={() => {
            if (allWorkouts.high.length === 0) {
              fetchWorkouts(URL.high, "high");
            }
            setHigh(!high);
          }}
        >
          <ButtonTextLarge>HIGH INTENSITY</ButtonTextLarge>
        </StyledPressableLarge>
        {high && (
          <FlatList
            data={allWorkouts.high}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <StyledView>
                <StyledText16Bold>Type:</StyledText16Bold>
                <StyledText16Regular>{item.type}</StyledText16Regular>
                <View>
                  <StyledText16Bold>Duration:</StyledText16Bold>
                  <StyledText16Regular>{item.duration}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Instructions:</StyledText16Bold>
                  <StyledText16Regular>{item.instruction}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Intensity:</StyledText16Bold>
                  <StyledText16Regular>{item.intensity}</StyledText16Regular>
                </View>
              </StyledView>
            )}
          />
        )}

        <StyledPressableLarge
          onPress={() => {
            if (allWorkouts.medium.length === 0) {
              fetchWorkouts(URL.medium, "medium");
            }
            setMedium(!medium);
          }}
        >
          <ButtonTextLarge>MEDIUM INTENSITY</ButtonTextLarge>
        </StyledPressableLarge>
        {medium && (
          <FlatList
            data={allWorkouts.medium}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <StyledView>
                <StyledText16Bold>Type:</StyledText16Bold>
                <StyledText16Regular>{item.type}</StyledText16Regular>
                <View>
                  <StyledText16Bold>Duration:</StyledText16Bold>
                  <StyledText16Regular>{item.duration}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Instructions:</StyledText16Bold>
                  <StyledText16Regular>{item.instruction}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Intensity:</StyledText16Bold>
                  <StyledText16Regular>{item.intensity}</StyledText16Regular>
                </View>
              </StyledView>
            )}
          />
        )}

        <StyledPressableLarge
          onPress={() => {
            if (allWorkouts.low.length === 0) {
              fetchWorkouts(URL.low, "low");
            }
            setLow(!low);
          }}
        >
          <ButtonTextLarge>LOW INTENSITY</ButtonTextLarge>
        </StyledPressableLarge>
        {low && (
          <FlatList
            data={allWorkouts.low}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <StyledView>
                <StyledText16Bold>Type:</StyledText16Bold>
                <StyledText16Regular>{item.type}</StyledText16Regular>
                <View>
                  <StyledText16Bold>Duration:</StyledText16Bold>
                  <StyledText16Regular>{item.duration}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Instructions:</StyledText16Bold>
                  <StyledText16Regular>{item.instruction}</StyledText16Regular>
                </View>
                <View>
                  <StyledText16Bold>Intensity:</StyledText16Bold>
                  <StyledText16Regular>{item.intensity}</StyledText16Regular>
                </View>
              </StyledView>
            )}
          />
        )}
      </ScrollView>
    </AllViewStyle>
  );
}
