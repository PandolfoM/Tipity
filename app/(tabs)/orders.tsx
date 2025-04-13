import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import sizes from "@/config/sizes";
import { OrderProps, useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import React from "react";
import { FlatList, View } from "react-native";

const Item = (item: OrderProps) => {
  const styles = makeStyles();
  const formattedDate = new Date(item.date).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const billBackground = useThemeColor({}, "secondary");
  const roundedNumber = Math.ceil(Number(item.total)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <View style={[styles.bill, { backgroundColor: billBackground, gap: 5 }]}>
      <Text style={[{ margin: "auto", fontWeight: "bold" }]}>
        {formattedDate}
      </Text>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}>
        <View style={[{ gap: 5 }]}>
          <Text style={[{ fontWeight: "bold" }]}>
            Total:{" "}
            <Text style={[{ fontWeight: "normal" }]}>
              ${item.rounded ? roundedNumber : item.total}
            </Text>
          </Text>
          <Text style={[{ fontWeight: "bold" }]}>
            Tip: <Text style={[{ fontWeight: "normal" }]}>{item.service}%</Text>
          </Text>
        </View>
        <View style={[{ gap: 5 }]}>
          {item.split !== 1 && (
            <Text style={[{ fontWeight: "bold" }]}>
              Party:{" "}
              <Text style={[{ fontWeight: "normal" }]}>{item.split}</Text>
            </Text>
          )}
          <Text style={[{ fontWeight: "bold" }]}>
            Rounded Up:{" "}
            <Text style={[{ fontWeight: "normal" }]}>
              {item.rounded ? "Yes" : "No"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

function Orders() {
  const { orders } = useApp();
  const styles = makeStyles();

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <Text style={styles.header} type="title">
        Past Bills
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({ item }) => <Item {...item} />}
      />
    </ThemedView>
  );
}

const makeStyles = () => ({
  bill: {
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.sm,
    marginTop: sizes.xs,
  },
  header: {
    paddingLeft: sizes.sm,
  },
});

export default Orders;
