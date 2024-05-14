import AsyncStorage from "@react-native-async-storage/async-storage";

export function Converter(dailyResult: number) {
  let resultCategory: string = "nothing";
  if (dailyResult <= 2) {
    resultCategory = "low";
  } else if (dailyResult <= 4) {
    resultCategory = "medium";
  } else if (dailyResult === 5) {
    resultCategory = "high";
  }
  return resultCategory;
}

export const storeBackendKey = async (value: string) => {
  try {
    await AsyncStorage.setItem("backendKey", value);
    console.log("det har sparats till storage", value);
  } catch (e) {
    // saving error
  }
};

export const getBackendKey = async () => {
  try {
    const value = await AsyncStorage.getItem("backendKey");
    console.log("hämtat värde från store", value);
  } catch (error) {
    console.error("Error reading value from AsyncStorage:", error);
  }
};
