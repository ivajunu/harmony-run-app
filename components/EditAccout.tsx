import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import useLoggedInUser from "./Functions/fetchUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "expo-router";
import {
  ButtonTextWhite,
  DeleteButton,
  ErrorMessage,
  StyledInput,
  StyledPressablePink,
} from "@/styled/StyledForms.styled";
import {
  StyledLinkPink,
  StyledText16PinkBold,
  StyledText16PinkRegular,
  StyledTitlePink,
} from "@/styled/StyledText.styled";

export default function EditAccount() {
  const [signInUser, setSignInUser] = useState<string | null>();
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { user, loggedIn, loading, error } = useLoggedInUser();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  const validatePasswordMatch = (repeatPassword: string) => {
    const password = getValues("password");
    return password === repeatPassword || "Passwords must match";
  };

  const submit = async (data: Record<string, any>) => {
    try {
      const response = await fetch(
        `https://harmony-run-backend.onrender.com/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.text();
      console.log("User updated successfully:", result);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? Your account will be lost forever!",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                const response = await fetch(
                  `https://harmony-run-backend.onrender.com/users/${user.id}`,
                  {
                    method: "DELETE",
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to delete user");
                }

                const result = await response.text();
                console.log("User deleted successfully:", result);
                reset();

                try {
                  await AsyncStorage.removeItem("IsLoggedInKey");
                  console.log("Lagrad inloggning har tagits bort.");

                  // @ts-ignore
                  navigation.navigate("Harmony Run");
                  const getLoggedInUser = async () => {
                    try {
                      const value = await AsyncStorage.getItem("IsLoggedInKey");
                      console.log("hämtat värde från store", value);
                      setSignInUser(value);
                    } catch (error) {
                      console.error(
                        "Error reading value from AsyncStorage:",
                        error
                      );
                    }
                  };
                  getLoggedInUser();
                } catch (error) {
                  console.error(
                    "Ett fel uppstod när den lagrade inloggningen skulle tas bort:",
                    error
                  );
                }
              } catch (error) {
                console.error("Error deleting user:", error);
              }
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error showing delete confirmation:", error);
    }
  };

  return (
    <>
      <View>
        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <StyledText16PinkBold>Username</StyledText16PinkBold>
              <StyledInput
                onChangeText={onChange}
                value={value ?? user?.username}
                onBlur={onBlur}
                placeholder="Username"
                placeholderTextColor={"white"}
              />
            </View>
          )}
          rules={{ minLength: 3, required: true }}
        />

        {errors.username && (
          <ErrorMessage>
            Username must be at least 3 letters & it's required
          </ErrorMessage>
        )}

        <Controller
          control={control}
          name="name"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <StyledText16PinkBold>Name</StyledText16PinkBold>
              <StyledInput
                onChangeText={onChange}
                value={value ?? user?.name}
                onBlur={onBlur}
                placeholder="Name"
                style={styles.input}
              />
            </View>
          )}
          rules={{ minLength: 2, required: true }}
        />
        {errors.name && (
          <ErrorMessage>
            Name must be at least 2 letters & it's required{" "}
          </ErrorMessage>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <StyledText16PinkBold>Email</StyledText16PinkBold>
              <StyledInput
                onChangeText={onChange}
                value={value ?? user?.email}
                onBlur={onBlur}
                placeholder="Email"
              />
            </View>
          )}
          rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
        />
        {errors.email && (
          <ErrorMessage>Must be a valid email & it's required </ErrorMessage>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <StyledText16PinkBold>Password</StyledText16PinkBold>
              <StyledInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry={true}
              />
            </View>
          )}
          rules={{ required: true, minLength: 8 }}
        />
        {errors.password && (
          <ErrorMessage>Minimum length is 8 characters</ErrorMessage>
        )}
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <StyledText16PinkBold>Repeat Password</StyledText16PinkBold>
              <StyledInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="Repeat password"
                placeholderTextColor={"white"}
                secureTextEntry={true}
              />
            </View>
          )}
          rules={{
            required: true,
            validate: validatePasswordMatch,
          }}
        />
        {errors.repeatPassword && (
          <ErrorMessage>Passwords must match</ErrorMessage>
        )}

        <StyledPressablePink onPress={handleSubmit(submit)}>
          <ButtonTextWhite>EDIT</ButtonTextWhite>
        </StyledPressablePink>
        <Pressable
          onPress={() => {
            setDeleteAccount(!deleteAccount);
          }}
        >
          <StyledLinkPink>Delete Account</StyledLinkPink>
        </Pressable>
        {deleteAccount && (
          <View>
            <StyledText16PinkBold>
              Are you sure that you want to delete your account?
            </StyledText16PinkBold>

            <DeleteButton onPress={deleteUser}>
              <ButtonTextWhite>DELETE ACCOUNT</ButtonTextWhite>
            </DeleteButton>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errors: {
    fontWeight: "bold",
    color: "red",
  },
});
