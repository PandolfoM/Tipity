import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors.js";

function Rating(props) {
  const { split, setSplit } = props;

  return (
    <View style={styles.container}>
      <Slider
        value={split}
        step={1}
        thumbTintColor={colors.accent}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.secondary}
        minimumValue={1}
        maximumValue={100}
        onValueChange={(value) => setSplit(value)}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        style={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  thumb: {
    height: 40,
    width: 40,
    borderRadius: "100%",
  },
  track: {
    height: 15,
    borderRadius: "100%",
  },
});

export default Rating;
