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
      const billTotal = await extractBillTotalWithNativeOCR(imageUri);
      if (billTotal) {
        setBillTotal(parseFloat(billTotal));
      } else {
        alert("Could not find bill total. Please try again.");
      }
    }
  };

  const extractBillTotalWithNativeOCR = async (
    imageUri: string
  ): Promise<string | null> => {
    try {
      const detectedText = await TextRecognition.recognize(imageUri);

      const validLines = getValidLinesBeforeTipSection(detectedText);

      const likelyTotal = findLikelyTotal(validLines);
      if (likelyTotal !== null) return likelyTotal.toFixed(2);

      const allAmounts = extractAmountsFromLines(validLines);
      if (allAmounts.length === 0) return null;

      const highest = Math.max(...allAmounts);
      return highest.toFixed(2);
    } catch (error) {
      console.error("Error with Native OCR:", error);
      return null;
    }
  };

  const getValidLinesBeforeTipSection = (lines: string[]): string[] => {
    const tipTriggerRegex =
      /(suggest(ed)? (tip|gratuity))|tip amount|gratuity amount|tip recommended|service charge|\b\d{1,2}%/i;

    const validLines: string[] = [];
    for (const line of lines) {
      if (tipTriggerRegex.test(line)) break;
      if (line.includes("%")) continue;

      validLines.push(line);
    }

    return validLines;
  };

  const extractAmountsFromLines = (lines: string[]): number[] => {
    const amountRegex = /\$?\s?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})/g;

    return lines.flatMap((line) => {
      const matches = line.match(amountRegex) || [];
      return matches.map((m) => parseFloat(m.replace(/[^0-9.]/g, "")));
    });
  };

  const findLikelyTotal = (lines: string[]): number | null => {
    const totalKeywords = /total|amount due|balance due/i;

    // Check lines from bottom-up, assuming total is near the bottom
    for (const line of [...lines].reverse()) {
      if (totalKeywords.test(line) && !line.includes("%")) {
        const match = line.match(/\$?\s?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})/);
        if (match) {
          return parseFloat(match[0].replace(/[^0-9.]/g, ""));
        }
      }
    }

    return null;
  };

  // const extractBillTotalWithNativeOCR = async (
  //   imageUri: string
  // ): Promise<string | null> => {
  //   try {
  //     const detectedText = await TextRecognition.recognize(imageUri);

  //     const tipMarkerRegex = /suggest(ed)? tip/i;
  //     const amountRegex = /\$?\s?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})/g;

  //     const validLines: string[] = [];

  //     for (const line of detectedText) {
  //       if (tipMarkerRegex.test(line)) {
  //         // Stop processing when "Suggested Tip" is reached
  //         break;
  //       }

  //       if (line.includes("%")) {
  //         // Skip lines with percentage signs
  //         continue;
  //       }

  //       validLines.push(line);
  //     }

  //     const validAmounts: number[] = [];

  //     for (const line of validLines) {
  //       const matches = line.match(amountRegex);
  //       if (matches) {
  //         const lineValues = matches.map((match) =>
  //           parseFloat(match.replace(/[^0-9.]/g, ""))
  //         );
  //         validAmounts.push(...lineValues);
  //       }
  //     }

  //     if (validAmounts.length > 0) {
  //       const highestValue = Math.max(...validAmounts);
  //       return highestValue.toFixed(2);
  //     }
  //   } catch (error) {
  //     console.error("Error with Native OCR:", error);
  //   }

  //   return null;
  // };

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
