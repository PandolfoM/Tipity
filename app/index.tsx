import Header from "@/components/Header";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function Index() {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  return (
    <ThemedView style={[styles.container]}>
      <Header />
    </ThemedView>
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
