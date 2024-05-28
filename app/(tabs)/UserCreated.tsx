import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import {
  AllViewStyle,
  StyledViewBlueBorder,
  UserCreatedView,
} from "@/styled/StyledContainers";
import {
  StyledLink16GreenBold,
  StyledText16PinkBold,
  StyledTitleGreen,
  StyledTitlePink,
} from "@/styled/StyledText.styled";
import useLoggedInUser from "@/components/Functions/fetchUser";
import { Link } from "expo-router";

export default function UserCreated() {
  const { user, loading, error } = useLoggedInUser();

  if (loading) {
    return (
      <AllViewStyle>
        <ActivityIndicator size="large" color="#a01d5d" />
      </AllViewStyle>
    );
  }

  if (error) {
    return (
      <AllViewStyle>
        <Text>{error}</Text>
      </AllViewStyle>
    );
  }

  return (
    <AllViewStyle>
      <UserCreatedView>
        {user && (
          <StyledTitlePink>Welcome to Harmony run {user.name}!</StyledTitlePink>
        )}
        <View>
          <StyledText16PinkBold>
            Get ready to embark on an empowering journey tailored specifically
            for women runners. Whether you're a beginner or seasoned athlete,
            Harmony Run is here to support and motivate you every step of the
            way. Lace up your shoes, hit the pavement, and let's strive for
            progress, not perfection. Together, we'll embrace the joy of
            running, celebrate our achievements, and create a community that
            uplifts and inspires. Let's run towards harmony, strength, and
            empowerment.
          </StyledText16PinkBold>
          {user && (
            <StyledText16PinkBold>
              Again, welcome aboard {user.name}!
            </StyledText16PinkBold>
          )}
        </View>
        <StyledViewBlueBorder style={{ alignItems: "baseline" }}>
          <StyledTitleGreen>What do you want to do?</StyledTitleGreen>
          <StyledLink16GreenBold>
            <Link href="/MyPages">Go to my pages</Link>
          </StyledLink16GreenBold>
          <StyledLink16GreenBold>
            <Link href="/DailyHealth">Fill in the daily form</Link>
          </StyledLink16GreenBold>
          <StyledLink16GreenBold>
            <Link href="/WorkoutDaily">
              See your daily recommended exercise
            </Link>
          </StyledLink16GreenBold>
          <StyledLink16GreenBold>
            <Link href="Allworkouts">Browse all exercises</Link>
          </StyledLink16GreenBold>
        </StyledViewBlueBorder>
      </UserCreatedView>
    </AllViewStyle>
  );
}
