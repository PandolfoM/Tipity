import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    let values = [];
    const splitAmt = await AsyncStorage.getItem("splitAmt");
    const serviceAmt = await AsyncStorage.getItem("serviceAmt");
    values.push(splitAmt, serviceAmt);
    return values;
  } catch (e) {
    console.log(e);
  }
};
