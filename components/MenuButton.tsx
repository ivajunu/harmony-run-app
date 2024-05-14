import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { PlatformPressable } from "@react-navigation/elements";
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import * as React from "react";
import { Image, Platform, StyleSheet } from "react-native";

type Props = {
  accessibilityLabel?: string;
  pressColor?: string;
  pressOpacity?: number;
  tintColor?: string;
};

export default function MenuButton({ tintColor, ...rest }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.touchable}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
    >
      <FontAwesome
        size={40}
        style={{
          color: "#f3ecef",
          width: "100%",
        }}
        name="bars"
      />
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: "contain",
  },
  touchable: {
    marginHorizontal: 11,
  },
});
