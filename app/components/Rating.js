import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
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
        maximumValue={split ? 5 : 50}
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

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: sizes.sm,
    marginTop: sizes.sm,
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
