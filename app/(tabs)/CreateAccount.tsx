import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { setIsLoggedInKey } from "@/components/Functions/Functions";
import { useNavigation } from "@react-navigation/native";
import {
  ButtonTextWhite,
  ErrorMessage,
  StyledInput,
  StyledPressablePink,
} from "@/styled/StyledForms.styled";
import {
  StyledText16PinkBold,
  StyledTitlePink,
} from "@/styled/StyledText.styled";
import { StyledViewPinkBorder } from "@/styled/StyledContainers";

export default function CreateAccount() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const validatePasswordMatch = (repeatPassword: string) => {
    const password = getValues("password");
    return password === repeatPassword || "Passwords must match";
  };

  const submit = (data: Record<string, string>) => {
    console.log(data);

    fetch("https://harmony-run-backend.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setIsLoggedInKey(data.email);
        reset();
        // @ts-ignore
        navigation.navigate("UserCreated");
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  return (
    <>
      <>
        <StyledViewPinkBorder>
          <StyledTitlePink style={{ textAlign: "center", fontSize: 26 }}>
            CREATE ACCOUNT
          </StyledTitlePink>
          <StyledText16PinkBold style={{ textAlign: "center" }}>
            Oh, how fun to see you here!
          </StyledText16PinkBold>
          <Controller
            control={control}
            name="username"
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <StyledText16PinkBold>Username</StyledText16PinkBold>
                <StyledInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={"white"}
                  placeholder="Username"
                />
              </View>
            )}
            rules={{ minLength: 3, required: true }}
          />

          {errors.username && (
            <ErrorMessage>
              Username must be at least 3 letters & it's required
            </ErrorMessage>
          )}

          <Controller
            control={control}
            name="name"
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <StyledText16PinkBold>Name</StyledText16PinkBold>
                <StyledInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={"white"}
                  placeholder="Name"
                />
              </View>
            )}
            rules={{ minLength: 2, required: true }}
          />
          {errors.name && (
            <ErrorMessage>
              Name must be at least 2 letters & it's required{" "}
            </ErrorMessage>
          )}
          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <StyledText16PinkBold>Email</StyledText16PinkBold>
                <StyledInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={"white"}
                  placeholder="Email"
                />
              </View>
            )}
            rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
          />
          {errors.email && (
            <ErrorMessage>Must be a valid email & it's required </ErrorMessage>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <StyledText16PinkBold>Password</StyledText16PinkBold>
                <StyledInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholder="Password"
                  placeholderTextColor={"white"}
                  secureTextEntry={true}
                />
              </View>
            )}
            rules={{ required: true, minLength: 8 }}
          />
          {errors.password && (
            <ErrorMessage>Minimum length is 8 characters</ErrorMessage>
          )}
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <StyledText16PinkBold>Repeat Password</StyledText16PinkBold>
                <StyledInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholder="Repeat password"
                  placeholderTextColor={"white"}
                  secureTextEntry={true}
                />
              </View>
            )}
            rules={{
              required: true,
              validate: validatePasswordMatch,
            }}
          />
          {errors.repeatPassword && (
            <ErrorMessage>Passwords must match</ErrorMessage>
          )}
          <View style={{ alignItems: "center", padding: 10 }}>
            <StyledPressablePink onPress={handleSubmit(submit)}>
              <ButtonTextWhite>CREATE ACCOUNT</ButtonTextWhite>
            </StyledPressablePink>
          </View>
        </StyledViewPinkBorder>
      </>
    </>
  );
}
