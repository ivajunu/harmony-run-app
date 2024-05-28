import { Converter, storeBackendKey } from "@/components/Functions/Functions";
import { StyledQ } from "@/styled/StyledContainers";
import {
  StyledTitle,
  StyledPressable,
  ButtonText,
  StyledTitlePink,
} from "@/styled/StyledText.styled";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";

export default function HealthForm() {
  const [mood, setMood] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [pain, setPain] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [flow, setFlow] = useState<string>("");
  const [periodPain, setPeriodPain] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const navigation = useNavigation();

  // radiobuttons
  const Mood: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Happy & Motivated",
        value: "5",
        color: "white",
      },
      {
        id: "2",
        label: "Good",
        value: "4",
        color: "white",
      },
      {
        id: "3",
        label: "So-so",
        value: "3",
        color: "white",
      },
      {
        id: "4",
        label: "Unmotivated",
        value: "2",
        color: "white",
      },
      {
        id: "5",
        label: "Bad",
        value: "1",
        color: "white",
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
        color: "white",
      },
      {
        id: "2",
        label: "Good",
        value: "4",
        color: "white",
      },
      {
        id: "3",
        label: "A bit tired",
        value: "2",
        color: "white",
      },
      {
        id: "4",
        label: "Very tired",
        value: "0",
        color: "white",
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
        color: "white",
      },
      {
        id: "2",
        label: "No",
        value: "5",
        color: "white",
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
        color: "white",
      },
      {
        id: "2",
        label: "Some discharge",
        value: "4",
        color: "white",
      },
      {
        id: "3",
        label: "A lot of discharge",
        value: "3",
        color: "white",
      },
      {
        id: "4",
        label: "Period=Light flow",
        value: "2",
        color: "white",
      },
      {
        id: "5",
        label: "Period=Regular flow",
        value: "1",
        color: "white",
      },
      {
        id: "6",
        label: "Period=Heavy flow",
        value: "0",
        color: "white",
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
        color: "white",
      },
      {
        id: "2",
        label: "Yes a little bit",
        value: "1",
        color: "white",
      },
      {
        id: "3",
        label: "Just a little",
        value: "3",
        color: "white",
      },
      {
        id: "4",
        label: "Not really",
        value: "4",
        color: "white",
      },
      {
        id: "5",
        label: "No",
        value: "5",
        color: "white",
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
        color: "white",
      },
      {
        id: "2",
        label: "No",
        value: "5",
        color: "white",
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
    // Spara value som nummer
    const formvalues = {
      mood: Number(Mood.find((button) => button.id === mood)?.value ?? ""),
      energy: Number(
        Energy.find((button) => button.id === energy)?.value ?? ""
      ),
      pain: Number(Pain.find((button) => button.id === pain)?.value ?? ""),
      period: Number(
        Period.find((button) => button.id === period)?.value ?? ""
      ),
      flow: Number(Flow.find((button) => button.id === flow)?.value ?? ""),
      periodPain: Number(
        PeriodPain.find((button) => button.id === periodPain)?.value ?? ""
      ),
    };
    console.log(formvalues);

    // Gör om till ett värde avrundat uppåt
    const dailyResult = Math.round(
      (formvalues.mood +
        formvalues.energy +
        formvalues.pain +
        formvalues.period +
        formvalues.flow +
        formvalues.periodPain) /
        6
    );
    console.log("resultat", dailyResult);

    const finalresult = Converter(dailyResult);
    console.log(finalresult);

    // spara till storage
    storeBackendKey(finalresult);

    // @ts-ignore
    navigation.navigate("WorkoutDaily");
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <StyledTitlePink>
          Welcome, let's see how you are feeling today
        </StyledTitlePink>
      </View>
      <StyledQ>
        <StyledTitle>How are you feeling today?</StyledTitle>
        <RadioGroup
          radioButtons={Mood}
          selectedId={mood}
          onPress={setMood}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <StyledQ>
        <StyledTitle>What is your energy level?</StyledTitle>
        <RadioGroup
          radioButtons={Energy}
          selectedId={energy}
          onPress={setEnergy}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <StyledQ>
        <StyledTitle>Do you have any pain in your body?</StyledTitle>
        <RadioGroup
          radioButtons={Pain}
          selectedId={pain}
          onPress={setPain}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <StyledQ>
        <StyledTitle>Are you on your period?</StyledTitle>
        <RadioGroup
          radioButtons={Period}
          selectedId={period}
          onPress={setPeriod}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <StyledQ>
        <StyledTitle>Discharge/Flow?</StyledTitle>
        <RadioGroup
          radioButtons={Flow}
          selectedId={flow}
          onPress={setFlow}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <StyledQ>
        <StyledTitle>Do you have any period pain?</StyledTitle>
        <RadioGroup
          radioButtons={PeriodPain}
          selectedId={periodPain}
          onPress={setPeriodPain}
          containerStyle={{
            padding: 10,
            alignItems: "flex-start",
            maxWidth: "100%",
            width: 280,
          }}
          labelStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "DosisBold",
            padding: 10,
          }}
        />
      </StyledQ>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledPressable onPress={handlesubmit} disabled={disabled}>
          <ButtonText>SUBMIT</ButtonText>
        </StyledPressable>
      </View>
    </ScrollView>
  );
}
