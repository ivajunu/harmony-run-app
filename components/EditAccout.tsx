import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useLoggedInUser from "./Functions/fetchUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function EditAccount() {
  const [signInUser, setSignInUser] = useState<string | null>();
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

  const submit = async (data: any) => {
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
            console.error("Error reading value from AsyncStorage:", error);
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
  };

  return (
    <>
      <View style={styles.form}>
        <Text>Edit Account</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Username</Text>
              <TextInput
                onChangeText={onChange}
                value={value ?? user?.username}
                onBlur={onBlur}
                placeholder="Username"
                style={styles.input}
              />
            </View>
          )}
          rules={{ minLength: 3, required: true }}
        />

        {errors.username && (
          <Text style={styles.errors}>
            Username must be at least 3 letters & it's required
          </Text>
        )}

        <Controller
          control={control}
          name="name"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Name</Text>
              <TextInput
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
          <Text style={styles.errors}>
            Name must be at least 2 letters & it's required{" "}
          </Text>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Email</Text>
              <TextInput
                onChangeText={onChange}
                value={value ?? user?.email}
                onBlur={onBlur}
                placeholder="Email"
                style={styles.input}
              />
            </View>
          )}
          rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
        />
        {errors.email && (
          <Text style={styles.errors}>
            Must be a valid email & it's required{" "}
          </Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Password</Text>
              <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
          )}
          rules={{ required: true, minLength: 8 }}
        />
        {errors.password && (
          <Text style={styles.errors}>Minimum length is 8 characters</Text>
        )}
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Repeat Password</Text>
              <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="Repeat password"
                style={styles.input}
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
          <Text style={styles.errors}>Passwords must match</Text>
        )}

        <Button title="Submit" onPress={handleSubmit(submit)} />
        <Button title="Delete Account" onPress={deleteUser} />
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
