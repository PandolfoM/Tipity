import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (type: string) => {
  try {
    const value = await AsyncStorage.getItem(type);

    if (!value) {
      return;
    }

    const item = JSON.parse(value);
    return item;
  } catch (e) {
    return;
  }
};

const storeData = async (item: string, value: any) => {
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
