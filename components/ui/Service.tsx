import React, { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import sizes from "@/config/sizes";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import Slider from "@/components/Slider";
import { Text } from "@/components/ThemedText";

function Service() {
  const { service, setService } = useApp();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");

  const inputRef = useRef<TextInput | null>(null);

  return (
    <View>
      <View style={[styles.section, { backgroundColor }]}>
        <Text
          type="title"
          style={[styles.sectionTitle, { backgroundColor, color: whiteColor }]}>
          Service:{" "}
        </Text>
        <TouchableOpacity
          style={[styles.section, { flex: 1 }]}
          activeOpacity={1}
          onPress={() => {
            inputRef.current?.focus();
          }}>
          <TextInput
            ref={inputRef}
            maxLength={3}
            onFocus={() => setService(undefined)}
            onEndEditing={() => !service && setService(15)}
            onChangeText={(value) =>
              setService(Number(value) > 100 ? 100 : Number(value))
            }
            keyboardType="number-pad"
            value={service !== undefined ? service.toString() : ""}
            style={[styles.numberInput, { color: accentColor }]}
          />
          <Text type="title" style={[styles.percent, { color: accentColor }]}>
            %
          </Text>
        </TouchableOpacity>
      </View>
      <Slider state={service} setState={setService} maxValue={30} />
    </View>
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    numberInput: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      alignSelf: "center",
    },
    pickerContainer: {
      flexDirection: "column",
      justifyContent: "center",
    },
    section: {
      flexDirection: "row",
    },
    sectionTitle: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      paddingLeft: sizes.sm,
    },
    percent: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
    },
  });

export default Service;
