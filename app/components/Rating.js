import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../config/colors.js";
import sizes from "../config/sizes.js";

function Rating(props) {
  const { split, setSplit, service, setService } = props;

  return (
    <View style={styles.container}>
      <Slider
        value={split ? split : service}
        step={1}
        thumbTintColor={colors.accent}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.secondary}
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

const height = Dimensions.get("screen").height;
let thumbSize;
let trackSize;
let marginSize;

if (height <= 667) {
  thumbSize = 20;
} else if (height >= 1194) {
  thumbSize = 60;
} else {
  thumbSize = 40;
}

if (height <= 667) {
  trackSize = 10;
} else if (height >= 1194) {
  trackSize = 25;
} else {
  trackSize = 15;
}

if (height <= 667) {
  marginSize = sizes.xxs;
} else if (height >= 1194) {
  marginSize = sizes.lg;
} else {
  marginSize = sizes.sm;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: sizes.sm,
    marginVertical: marginSize,
  },
  thumb: {
    height: thumbSize,
    width: thumbSize,
    borderRadius: "100%",
  },
  track: {
    height: trackSize,
    borderRadius: "100%",
  },
});

export default Rating;
