import Header from "@/components/ui/Header";
import Service from "@/components/ui/Service";
import Split from "@/components/ui/Split";
import Totals from "@/components/ui/Totals";
import Bill from "@/components/ui/Bill";
import { ThemedView } from "@/components/ThemedView";
import { useKeepAwake } from "expo-keep-awake";
import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";

export default function Index() {
  useKeepAwake();
  const [isScrollable, setIsScrollable] = useState(false);
  const { height: screenHeight } = useWindowDimensions();

  const handleLayout = (event: any) => {
    const contentHeight = event.nativeEvent.layout.height;
    setIsScrollable(contentHeight > screenHeight);
  };

  const Content = (
    <View onLayout={handleLayout}>
      <Header />
      <Bill />
      <Split />
      <Service />
      <Totals />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={[{ flex: 1 }]}>
        {isScrollable ? <ScrollView>{Content}</ScrollView> : Content}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
