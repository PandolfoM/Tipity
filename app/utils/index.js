import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    let values = [];
    const splitAmt = await AsyncStorage.getItem("splitAmt");
    const serviceAmt = await AsyncStorage.getItem("serviceAmt");
    const rounding = await AsyncStorage.getItem("rounding");
    values.push(splitAmt, serviceAmt, rounding);
    return values;
  } catch (e) {
    return;
  }
};
