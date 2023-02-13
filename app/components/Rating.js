import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import sizes from "../config/sizes.js";
import useDarkMode from "../hooks/useDarkMode.js";

function Rating({ split, setSplit, service, setService }) {
  const isDarkMode = useDarkMode();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  return (
    <View style={styles.container}>
      <Slider
        value={split ? split : service}
        step={1}
        thumbTintColor={isDarkMode.accent}
        minimumTrackTintColor={isDarkMode.accent}
        maximumTrackTintColor={isDarkMode.secondary}
        minimumValue={split ? 1 : 0}
        maximumValue={split ? 6 : 30}
        onValueChange={(value) =>
          setSplit ? setSplit(value) : setService(value)
        }
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        style={styles.slider}
      />
    </View>
  );
}

const makeStyles = (fontScale) =>
  StyleSheet.create({
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
      borderRadius: "100%",
    },
  });

export default Rating;
