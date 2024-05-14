import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import WorkoutDaily from "./WorkoutDaily";
import Home from ".";
import Allworkouts from "./Allworkouts";
import Dailyhealth from "./DailyHealth";
import { View } from "react-native";
import { Link } from "expo-router";
import AccountScreen from "./Account";
import MenuButton from "@/components/MenuButton";
import Icon from "@/components/Icon";

const Drawer = createDrawerNavigator();

export default function TabLayout() {
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
            <Link href={"Account"}>
              <Icon name="user" version="5" color="#f3ecef" size={35} />
            </Link>
            <View style={{ marginLeft: 20 }}>
              <MenuButton tintColor="red" />
            </View>
          </View>
        ),
        // headerTitle: "Harmony Run",
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
        name="Daily Health"
        component={Dailyhealth}
        options={{
          drawerIcon: () => <Icon name="heart-o" color={"#f3ecef"} />,
        }}
      />
      <Drawer.Screen
        name="Daily workout"
        component={WorkoutDaily}
        options={{
          drawerIcon: () => (
            <Icon name="dumbbell" size={22} color={"#f3ecef"} version="5" />
          ),
        }}
      />
      <Drawer.Screen
        name="All workouts"
        component={Allworkouts}
        options={{
          drawerIcon: () => <Icon name="list-alt" color={"#f3ecef"} />,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: () => <Icon name="user" version="5" color={"#f3ecef"} />,
        }}
      />
    </Drawer.Navigator>
  );
}
