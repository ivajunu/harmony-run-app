import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the User type based on the expected data structure from the API
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function UserCreated() {
  const [loggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const loggedInValue = await AsyncStorage.getItem("IsLoggedInKey");
        setIsLoggedIn(loggedInValue);
        console.log("Value fetched from AsyncStorage:", loggedInValue);
      } catch (error) {
        console.error("Error reading value from AsyncStorage:", error);
      }
    };
    getLoggedInUser();
  }, []);

  useEffect(() => {
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
        })
        .catch((error) => {
          console.error("Error fetching user info", error);
        });
    }
  }, [loggedIn]);

  return (
    <View>
      <Text>User created successfully!!</Text>
      {user && (
        <FlatList
          data={user}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <View>
              <View>
                <Text>{item.name}</Text>
              </View>
              <View>
                <Text>{item.username}</Text>
              </View>
              <View>
                <Text>{item.email}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
