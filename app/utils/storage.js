import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (type) => {
  try {
    const value = await AsyncStorage.getItem(type);
    const item = JSON.parse(value);
    return item;
  } catch (e) {
    return;
  }
};

const storeData = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export default {
  getData,
  storeData,
};
