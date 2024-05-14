import { useMemo } from "react";
import { RadioButtonProps } from "react-native-radio-buttons-group";

export const Mood: RadioButtonProps[] = useMemo(
  () => [
    {
      id: "1",
      label: "Happy & Motivated",
      value: "5",
    },
    {
      id: "2",
      label: "Good",
      value: "4",
    },
    {
      id: "3",
      label: "So-so",
      value: "3",
    },
    {
      id: "4",
      label: "Unmotivated",
      value: "2",
    },
    {
      id: "5",
      label: "Bad",
      value: "1",
    },
  ],
  []
);
