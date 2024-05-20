import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { TextInput } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { setIsLoggedInKey } from "@/components/Functions/Functions";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const validatePasswordMatch = (repeatPassword: string) => {
    const password = getValues("password");
    return password === repeatPassword || "Passwords must match";
  };

  const submit = (data: Record<string, string>) => {
    console.log(data);

    fetch("https://harmony-run-backend.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setIsLoggedInKey(data.email);
        reset();
        // @ts-ignore
        navigation.navigate("UserCreated");
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  return (
    <>
      <View style={styles.form}>
        <Text>Create account</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text>Username</Text>
              <TextInput
                onChangeText={onChange}
                value={value}
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
                value={value}
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
                value={value}
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
          <Text style={styles.errors}>Password must be same</Text>
        )}

        <Button title="submit" onPress={handleSubmit(submit)} />
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
