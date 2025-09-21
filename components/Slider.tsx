import sizes from "@/config/sizes";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Slider as Slide } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

type Props = {
  state: number | undefined;
  setState: React.Dispatch<React.SetStateAction<number | undefined>>;
  minValue?: number;
  maxValue?: number;
};

function Slider({ state, setState, minValue, maxValue }: Props) {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const accentColor = useThemeColor({}, "accent");
  const secColor = useThemeColor({}, "secondary");

  return (
    <View style={styles.container}>
      <Slide
        value={state ? state : minValue}
        step={1}
        thumbTintColor={accentColor}
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor={secColor}
        minimumValue={minValue ? minValue : 0}
        maximumValue={maxValue ? maxValue : 6}
        onValueChange={(value) => setState(Number(value))}
        thumbStyle={styles.thumb}
        trackStyle={{ ...styles.track }}
      />
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
      color: "white",
      paddingLeft: sizes.sm,
      paddingVertical: sizes.xs,
    },

    container: {
      alignItems: "stretch",
      justifyContent: "center",
      marginHorizontal: sizes.sm,
      marginVertical: 10 / fontScale,
    },
    thumb: {
      height: 40 / fontScale,
      width: 40 / fontScale,
      borderRadius: "100%",
    },
    track: {
      height: 15 / fontScale,
      borderRadius: 15 / fontScale,
    },
  });

export default Slider;
