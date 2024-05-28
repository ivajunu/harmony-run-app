import { User } from "@/Types/Types";
import { setIsLoggedInKey } from "@/components/Functions/Functions";
import { AllViewStyle, StyledViewPinkBorder } from "@/styled/StyledContainers";
import { ErrorMessage, StyledInput } from "@/styled/StyledForms.styled";
import {
  ButtonText,
  StyledPressable,
  StyledTitlePink,
} from "@/styled/StyledText.styled";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";

export default function AccountScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();

  async function handleSignIn(formData: Record<string, any>) {
    try {
      const response = await fetch(
        `https://harmony-run-backend.onrender.com/users?email=${encodeURIComponent(
          formData.email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      const data: User[] = JSON.parse(responseText);
      console.log("Parsed data:", data);

      if (data.length > 0) {
        const user = data[0];
        setIsLoggedInKey(user.email);
        // @ts-ignore
        navigation.navigate("MyPages");
      } else {
        console.error("No user found with the provided email.");
      }
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  }

  return (
    <>
      <AllViewStyle>
        <StyledViewPinkBorder>
          <StyledTitlePink style={{ textAlign: "center", fontSize: 26 }}>
            SIGN IN
          </StyledTitlePink>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
                placeholderTextColor={"white"}
              />
            )}
            name="email"
            rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
            defaultValue=""
          />
          {errors.email && (
            <ErrorMessage>Must be a valid email & it's required</ErrorMessage>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && <ErrorMessage>Password is required</ErrorMessage>}
          <View style={{ alignItems: "center", padding: 10 }}>
            <StyledPressable onPress={handleSubmit(handleSignIn)}>
              <ButtonText>SIGN IN</ButtonText>
            </StyledPressable>
          </View>
        </StyledViewPinkBorder>
        <StyledViewPinkBorder style={{ alignItems: "center" }}>
          <StyledTitlePink style={{ fontSize: 26 }}>
            Don't have an account?
          </StyledTitlePink>
          <StyledPressable
            onPress={() => {
              // @ts-ignore
              navigation.navigate("CreateAccount");
            }}
          >
            <ButtonText>CREATE ACCOUNT</ButtonText>
          </StyledPressable>
        </StyledViewPinkBorder>
      </AllViewStyle>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
