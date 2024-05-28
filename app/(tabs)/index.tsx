import { Homepage } from "@/Types/Types";
import { getLoggedInUser } from "@/components/Functions/Functions";
import { StyledView } from "@/styled/StyledContainers";
import {
  StyledH1,
  StyledText16Regular,
  StyledTitle,
} from "@/styled/StyledText.styled";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {
  const [intro, setIntro] = useState<Homepage[] | undefined>([]);

  useEffect(() => {
    fetch("https://harmony-run-backend.onrender.com/homepage")
      .then((response) => response.json())
      .then((result: Homepage[]) => {
        setIntro(result);
      });
  }, []);

  return (
    <SafeAreaView>
      {intro && (
        <FlatList
          data={intro}
          keyExtractor={(intro) => intro.id.toString()}
          renderItem={({ item }) => (
            <StyledView>
              <View>
                <StyledTitle>{item.headline}</StyledTitle>
              </View>
              <View>
                <StyledText16Regular>{item.description}</StyledText16Regular>
              </View>
            </StyledView>
          )}
        />
      )}
    </SafeAreaView>
  );
}
