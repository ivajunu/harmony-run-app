import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/Types/Types";

const useLoggedInUser = () => {
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const loggedInValue = await AsyncStorage.getItem("IsLoggedInKey");
        setLoggedIn(loggedInValue);
        console.log("Value fetched from AsyncStorage:", loggedInValue);
      } catch (error) {
        console.error("Error reading value from AsyncStorage:", error);
        setError("Error reading value from AsyncStorage");
      }
    };
    getLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUser = async (email: string) => {
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
        if (response.ok) {
          const data: User[] = await response.json();
          console.log("Data fetched: ", data);
          setUser(data[0]);
        } else {
          console.error("Failed to fetch user info:", response.status);
          setError("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info", error);
        setError("Error fetching user info");
      } finally {
        setLoading(false);
      }
    };

    if (loggedIn) {
      fetchUser(loggedIn);
    }
  }, [loggedIn]);

  return { user, loggedIn, loading, error };
};

export default useLoggedInUser;
