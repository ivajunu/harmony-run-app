import { useEffect, useState } from "react";
import { RadioButton, RadioGroup } from "react-native-radio-buttons-group";
import { View } from "react-native";
import { Mood } from "@/components/Forms/RadioChoices";
import HealthForm from "@/components/Forms/HealthForm";
// import RadioChoice from "../../Inputs/RadioInput/RadioChoice";
// import RadioInput from "../../Inputs/RadioInput/RadioInput";
// import ButtonPrimary from "../../Buttons/Button";
// import { Styledh1, StyledButtonDiv } from "./HealthForm.styled.tsx";
// import { useNavigate } from "react-router";

export default function DailyHealth() {
  const [mood, setMood] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [pain, setPain] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [flow, setFlow] = useState<string>("");
  const [periodPain, setPeriodPain] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  // const navigate = useNavigate();

  // console.log(mood.valueOf);

  // useEffect(() => {
  //   if (
  //     mood !== "" &&
  //     energy !== "" &&
  //     pain !== "" &&
  //     period !== "" &&
  //     flow !== "" &&
  //     periodPain !== ""
  //   ) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [energy, flow, mood, pain, period, periodPain]);

  // function handlesubmit() {
  //   // valde att ha kvar värdena som strings för att inte formulären skulle få problem
  //   const moodValue = Number(mood);
  //   console.log(moodValue);
  //   const energyValue = Number(energy);
  //   console.log(energyValue);

  //   const painValue = Number(pain);
  //   console.log(painValue);

  //   const periodValue = Number(period);
  //   console.log(periodValue);

  //   const flowValue = Number(flow);
  //   console.log(flowValue);

  //   const periodPainValue = Number(periodPain);
  //   console.log(periodPainValue);

  //   const dailyResult = Math.round(
  //     (moodValue +
  //       energyValue +
  //       painValue +
  //       periodValue +
  //       flowValue +
  //       periodPainValue) /
  //       6
  //   );
  //   console.log("resultat", dailyResult);

  //   function Converter(dailyResult: number) {
  //     console.log("den går in här");
  //     let resultCategory: string = "nothing";
  //     if (dailyResult <= 2) {
  //       resultCategory = "low";
  //     } else if (dailyResult <= 4) {
  //       resultCategory = "medium";
  //     } else if (dailyResult === 5) {
  //       resultCategory = "high";
  //     }
  //     console.log(resultCategory);
  //     return resultCategory;
  //   }

  //   const finalResult = Converter(dailyResult);
  //   console.log("finalresult:", finalResult);
  //   localStorage.setItem("backendKey", JSON.stringify(finalResult));
  //   // navigate("/workout-advice");
  // }

  return (
    <>
      <View>
        <HealthForm />
      </View>

      {/* <RadioInput
        ariaLabel="energy"
        formId="energy"
        formLabel="What is your energy level?"
        radioGroupName="energy"
        onChange={(e) => {
          setEnergy(e.target.value);
        }}
        value={energy}
      >
        <RadioChoice choiceLabel="Energetic" radioId="energetic" value="5" />
        <RadioChoice choiceLabel="Good" radioId="good-energy" value="4" />
        <RadioChoice
          choiceLabel="A bit tired"
          radioId="a-bit-tired"
          value="2"
        />
        <RadioChoice choiceLabel="Very tired" radioId="very-tired" value="0" />
      </RadioInput>

      <RadioInput
        ariaLabel="pain"
        formId="pain"
        formLabel="Do you have any pain in your body?"
        radioGroupName="pain"
        onChange={(e) => {
          setPain(e.target.value);
        }}
        value={pain}
      >
        <RadioChoice choiceLabel="Yes" radioId="yes-pain" value="0" />
        <RadioChoice choiceLabel="No" radioId="no-pain" value="5" />
      </RadioInput>

      <RadioInput
        ariaLabel="period"
        formId="period"
        formLabel="Are you on your period?"
        radioGroupName="period"
        onChange={(e) => {
          setPeriod(e.target.value);
        }}
        value={period}
      >
        <RadioChoice choiceLabel="Yes" radioId="yes-period" value="3" />
        <RadioChoice choiceLabel="No" radioId="no-period" value="5" />
      </RadioInput>

      <RadioInput
        ariaLabel="flow"
        formId="flow"
        formLabel="Discharge/Flow?"
        radioGroupName="flow"
        onChange={(e) => {
          setFlow(e.target.value);
        }}
        value={flow}
      >
        <RadioChoice choiceLabel="No" radioId="no-flow" value="5" />
        <RadioChoice
          choiceLabel="Some discharge"
          radioId="some-discharge"
          value="4"
        />
        <RadioChoice
          choiceLabel="A lot of discharge"
          radioId="alot-discharge"
          value="3"
        />
        <RadioChoice
          choiceLabel="Period=Light flow"
          radioId="light-flow"
          value="2"
        />
        <RadioChoice
          choiceLabel="Period=Regular flow"
          radioId="regular-flow"
          value="1"
        />
        <RadioChoice
          choiceLabel="Period=Heavy flow"
          radioId="heavy-flow"
          value="0"
        />
      </RadioInput>

      <RadioInput
        ariaLabel="period-pain"
        formId="period-pain"
        formLabel="Do you have any period pain?"
        radioGroupName="period-pain"
        onChange={(e) => {
          setPeriodPain(e.target.value);
        }}
        value={periodPain}
      >
        <RadioChoice choiceLabel="Yes a lot" radioId="p-pain-alot" value="0" />
        <RadioChoice
          choiceLabel="Yes a little bit"
          radioId="p-pain-alittle"
          value="1"
        />
        <RadioChoice
          choiceLabel="Just a little"
          radioId="p-pain-little"
          value="3"
        />
        <RadioChoice
          choiceLabel="Not really"
          radioId="p-pain-notreally"
          value="4"
        />
        <RadioChoice choiceLabel="No" radioId="p-pain-no" value="5" />
      </RadioInput>
      <StyledButtonDiv>
        <ButtonPrimary
          buttonLabel="Send"
          onClick={handlesubmit}
          variant="outlined"
          disabled={disabled}
          id="submit"
        />
      </StyledButtonDiv> */}
    </>
  );
}
