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
const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: sizes.sm,
    marginVertical: height <= 667 ? sizes.xxs : sizes.sm,
  },
  thumb: {
    height: height <= 667 ? 20 : 40,
    width: height <= 667 ? 20 : 40,
    borderRadius: "100%",
  },
  track: {
    height: height <= 667 ? 10 : 15,
    borderRadius: "100%",
  },
});

export default Rating;
