import React from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Text } from "@/components/ThemedText";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import sizes from "@/config/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextRecognition from "react-native-text-recognition";
import * as ImagePicker from "expo-image-picker";

function Bill() {
  const { billTotal, setBillTotal, setImageUri } = useApp();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");

  const openCamera = async () => {
    Keyboard.dismiss();
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const billTotal = await extractBillTotalWithNativeOCR(imageUri);
      if (billTotal) {
        setBillTotal(parseFloat(billTotal));
      } else {
        alert("Could not find bill total. Please try again.");
      }
    }
  };

  const extractBillTotalWithNativeOCR = async (imageUri: string) => {
    try {
      const detectedText = await TextRecognition.recognize(imageUri);

      // Combine detected text into a single string
      const combinedText = detectedText.join(" ");

      // Extract the bill total using a regex
      const matches = combinedText.match(/\$\s?(\d+(\.\d{2})?)/g); // Matches all "$123.45"

      if (matches && matches.length > 0) {
        // Remove the "$" and parse the values as floats
        const values = matches.map((match) =>
          parseFloat(match.replace("$", "").trim())
        );

        // Find the highest value
        const highestValue = Math.max(...values);
        setImageUri(imageUri);
        return highestValue.toFixed(2); // Return the highest value as a string with 2 decimal places
      }
    } catch (error) {
      console.error("Error with Native OCR:", error);
    }

    return null; // Return null if no bill total is found
  };

  return (
    <View style={[{ backgroundColor }]}>
      <View>
        <View style={styles.sectionTitle}>
          <Text type="title" style={[{ color: whiteColor }]}>
            Bill Total
          </Text>
          <Pressable onPress={openCamera}>
            <MaterialCommunityIcons
              style={[{ color: whiteColor }]}
              size={sizes.flg}
              name="camera"
            />
          </Pressable>
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
