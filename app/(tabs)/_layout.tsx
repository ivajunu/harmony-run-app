import React, { useCallback, useEffect, useState } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import WorkoutDaily from "./WorkoutDaily";
import Home from ".";
import Dailyhealth from "./DailyHealth";
import { View } from "react-native";
import { Link } from "expo-router";
import AccountScreen from "./Account";
import MenuButton from "@/components/MenuButton";
import Icon from "@/components/Icon";
import AllWorkouts from "./Allworkouts";
import CreateAccount from "./CreateAccount";
import UserCreated from "./UserCreated";
import MyPages from "./MyPages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import SavedTraining from "./SavedTraining";

const Drawer = createDrawerNavigator();

export default function TabLayout() {
  const [loggedIn, setLoggedIn] = useState<string | null>("");

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("IsLoggedInKey");
      console.log("Hämtat värde från LoggedInkey", value);
      setLoggedIn(value);
    } catch (error) {
      console.error("Error reading value from AsyncStorage:", error);
    }
  };

  // Denna kollar hela tiden om en användare är inloggad.
  useFocusEffect(() => {
    getUser();
  });

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#a01d5d",
          height: 130,
        },
        headerTintColor: "#f3ecef",
        headerTitleStyle: {
          fontSize: 30,
          paddingHorizontal: 40,
          fontFamily: "DosisBold",
        },
        drawerStyle: {
          backgroundColor: "#a01d5d",
        },
        drawerLabelStyle: {
          color: "white",
          fontSize: 16,
          fontWeight: "500",
        },
        drawerPosition: "right",
        headerLeft: () => null,
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <Link href={loggedIn ? "MyPages" : "Account"}>
              <Icon name="user" version="5" color="#f3ecef" size={35} />
            </Link>
            <View style={{ marginLeft: 20 }}>
              <MenuButton tintColor="red" />
            </View>
          </View>
        ),
        headerTitle: "Harmony Run",
      }}
    >
      <Drawer.Screen
        name="Harmony Run"
        component={Home}
        options={{
          drawerIcon: () => <Icon name="home" color={"#f3ecef"} />,
        }}
      />
      <Drawer.Screen
        name="DailyHealth"
        component={Dailyhealth}
        options={{
          drawerIcon: () => <Icon name="heart-o" color={"#f3ecef"} />,
          drawerLabel: "Health form",
        }}
      />
      <Drawer.Screen
        name="WorkoutDaily"
        component={WorkoutDaily}
        options={{
          drawerIcon: () => (
            <Icon name="dumbbell" size={22} color={"#f3ecef"} version="5" />
          ),
          drawerLabel: "Your workout",
        }}
      />
      <Drawer.Screen
        name="Allworkouts"
        component={AllWorkouts}
        options={{
          drawerIcon: () => <Icon name="list-alt" color={"#f3ecef"} />,
          drawerLabel: "All workouts",
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerItemStyle: { display: "none" },
          drawerIcon: () => <Icon name="user" version="5" color={"#f3ecef"} />,
        }}
      />
      <Drawer.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          drawerItemStyle: { display: "none" },
          drawerIcon: () => <Icon name="user" version="5" color={"#f3ecef"} />,
          headerTitle: "Create Account",
          drawerLabel: "Create Account",
        }}
      />
      <Drawer.Screen
        name="UserCreated"
        component={UserCreated}
        options={{
          drawerItemStyle: { display: "none" },
          drawerIcon: () => <Icon name="user" version="5" color={"#f3ecef"} />,
        }}
      />
      <Drawer.Screen
        name="MyPages"
        component={MyPages}
        options={{
          drawerItemStyle: { display: loggedIn ? "flex" : "none" },
          drawerIcon: () => <Icon name="user" version="5" color={"#f3ecef"} />,
          drawerLabel: "My Pages",
        }}
      />
      <Drawer.Screen
        name="SavedTraining"
        component={SavedTraining}
        options={{
          drawerItemStyle: { display: loggedIn ? "flex" : "none" },
          drawerIcon: () => <Icon name="save" version="5" color={"#f3ecef"} />,
          drawerLabel: "Saved Exercises",
        }}
      />
    </Drawer.Navigator>
  );
}
