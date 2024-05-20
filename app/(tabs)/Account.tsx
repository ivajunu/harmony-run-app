import { User } from "@/Types/Types";
import { setIsLoggedInKey } from "@/components/Functions/Functions";
import { Link, useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function AccountScreen() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const response = await fetch(
        `https://harmony-run-backend.onrender.com/users?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the status and response text
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
      <View>
        <Text>Account</Text>
        <Text>Sign in</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <Button title="Sign in" onPress={handleSignIn} />
      </View>
      <View>
        <Text>Don't have an account?</Text>
        <Link to="/CreateAccount">Create account</Link>
      </View>
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
