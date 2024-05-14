import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";

export default function HealthForm() {
  const [mood, setMood] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [pain, setPain] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [flow, setFlow] = useState<string>("");
  const [periodPain, setPeriodPain] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const Mood: RadioButtonProps[] = useMemo(
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

  const Energy: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Energetic",
        value: "5",
      },
      {
        id: "2",
        label: "Good",
        value: "4",
      },
      {
        id: "3",
        label: "A bit tired",
        value: "2",
      },
      {
        id: "4",
        label: "Very tired",
        value: "0",
      },
    ],
    []
  );

  const Pain: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Yes",
        value: "0",
      },
      {
        id: "2",
        label: "No",
        value: "5",
      },
    ],
    []
  );

  const Flow: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "No",
        value: "5",
      },
      {
        id: "2",
        label: "Some discharge",
        value: "4",
      },
      {
        id: "3",
        label: "A lot of discharge",
        value: "3",
      },
      {
        id: "4",
        label: "Period=Light flow",
        value: "2",
      },
      {
        id: "5",
        label: "Period=Regular flow",
        value: "1",
      },
      {
        id: "6",
        label: "Period=Heavy flow",
        value: "0",
      },
    ],
    []
  );

  const PeriodPain: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Yes a lot",
        value: "0",
      },
      {
        id: "2",
        label: "Yes a little bit",
        value: "1",
      },
      {
        id: "3",
        label: "Just a little",
        value: "3",
      },
      {
        id: "4",
        label: "Not really",
        value: "4",
      },
      {
        id: "5",
        label: "No",
        value: "5",
      },
    ],
    []
  );
  const Period: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Yes",
        value: "3",
      },
      {
        id: "2",
        label: "No",
        value: "5",
      },
    ],
    []
  );

  useEffect(() => {
    if (
      mood !== "" &&
      energy !== "" &&
      pain !== "" &&
      period !== "" &&
      flow !== "" &&
      periodPain !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [energy, flow, mood, pain, period, periodPain]);

  function handlesubmit() {
    const formvalues = {
      mood: Mood.find((button) => button.id === mood)?.value ?? "",
      energy: Energy.find((button) => button.id === energy)?.value ?? "",
      pain: Pain.find((button) => button.id === pain)?.value ?? "",
      perod: Period.find((button) => button.id === period)?.value ?? "",
      flow: Flow.find((button) => button.id === flow)?.value ?? "",
      periodPain:
        PeriodPain.find((button) => button.id === periodPain)?.value ?? "",
    };
    console.log(formvalues);
  }

  return (
    <ScrollView>
      <View>
        <Text>How are you feeling today?</Text>
        <RadioGroup radioButtons={Mood} selectedId={mood} onPress={setMood} />
      </View>
      <View>
        <Text>What is your energy level?</Text>
        <RadioGroup
          radioButtons={Energy}
          selectedId={energy}
          onPress={setEnergy}
        />
      </View>
      <View>
        <Text>Do you have any pain in your body?</Text>
        <RadioGroup radioButtons={Pain} selectedId={pain} onPress={setPain} />
      </View>
      <View>
        <Text>Are you on your period?</Text>
        <RadioGroup
          radioButtons={Period}
          selectedId={period}
          onPress={setPeriod}
        />
      </View>
      <View>
        <Text>Discharge/Flow?</Text>
        <RadioGroup radioButtons={Flow} selectedId={flow} onPress={setFlow} />
      </View>
      <View>
        <Text>Do you have any period pain?</Text>
        <RadioGroup
          radioButtons={PeriodPain}
          selectedId={periodPain}
          onPress={setPeriodPain}
        />
      </View>
      <Pressable onPress={handlesubmit} disabled={disabled}>
        <Text>Skicka</Text>
      </Pressable>
    </ScrollView>
  );
}
