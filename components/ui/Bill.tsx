import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Text } from "@/components/ThemedText";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import sizes from "@/config/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { extractTotal } from "@/utils/extractTotal";
import { useSettings } from "@/context/SettingsContext";

function Bill() {
  const { billTotal, setBillTotal, setImageUri } = useApp();
  const { aiExtractTotal } = useSettings();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");

  const openCamera = async () => {
    Keyboard.dismiss();

    // const permission = await ImagePicker.requestCameraPermissionsAsync();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }

    // const result = await ImagePicker.launchCameraAsync({
    //   presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
    // });
    const result = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const billTotal = await extractTotal(imageUri, aiExtractTotal);

      if (billTotal) {
        setBillTotal(parseFloat(billTotal));
      } else {
        alert("Could not find bill total. Please try again.");
      }
    }
  };

  return (
    <View style={[{ backgroundColor }]}>
      <View>
        <View style={styles.sectionTitle}>
          <Text type="title" style={[{ color: whiteColor }]}>
            Bill Total
          </Text>
          <TouchableOpacity onPress={openCamera}>
            <MaterialCommunityIcons
              style={[{ color: whiteColor }]}
              size={sizes.flg}
              name="camera"
            />
          </TouchableOpacity>
        </View>
        <FakeCurrencyInput
          autoComplete="off"
          autoCapitalize="none"
          placeholderTextColor={"#fff"}
          value={billTotal}
          onChangeValue={(formattedValue) => {
            setBillTotal(!formattedValue ? 0 : formattedValue);
          }}
          keyboardType="number-pad"
          style={[
            styles.billInput,
            {
              color: accentColor,
            },
          ]}
          maxLength={11}
          prefix="$"
          delimiter=","
          separator="."
        />
      </View>
    </View>
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    billInput: {
      height: 100,
      fontSize: 60 / fontScale,
      textAlign: "center",
      fontWeight: "500",
    },
    container: {
      flex: 1,
    },
    sectionTitle: {
      fontWeight: "bold",
      paddingHorizontal: sizes.sm,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

export default Bill;
