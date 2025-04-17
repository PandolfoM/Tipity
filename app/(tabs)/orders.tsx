import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { OrderProps, useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import sizes from "@/config/sizes";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";

const Item = ({
  item,
  onDelete,
}: {
  item: OrderProps;
  onDelete: (item: OrderProps) => void;
}) => {
  const styles = makeStyles();
  const formattedDate = dayjs(item.date).format("MMMM D, YYYY hh:mm A");
  const billBackground = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const formattedTip = Number(item.tip).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const roundedNumber = Number(Math.ceil(Number(item.total))).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  const RightActions = () => (
    <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
      <Text style={styles.deleteTxt}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable friction={2} renderRightActions={RightActions}>
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
              <Text style={[{ fontWeight: "normal", color: accentColor }]}>
                ${item.rounded ? roundedNumber : item.total}
              </Text>
            </Text>
            <Text style={[{ fontWeight: "bold" }]}>
              Tip:{" "}
              <Text style={[{ fontWeight: "normal", color: accentColor }]}>
                ${formattedTip} ({item.service}%)
              </Text>
            </Text>
          </View>
          <View style={[{ gap: 5 }]}>
            {item.split !== 1 && (
              <Text style={[{ fontWeight: "bold" }]}>
                Party:{" "}
                <Text style={[{ fontWeight: "normal", color: accentColor }]}>
                  {item.split}
                </Text>
              </Text>
            )}
            <Text style={[{ fontWeight: "bold" }]}>
              Rounded Up:{" "}
              <Text style={[{ fontWeight: "normal", color: accentColor }]}>
                {item.rounded ? "Yes" : "No"}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

function Orders() {
  const { orders, setOrders } = useApp();
  const styles = makeStyles();

  const onDelete = (item: OrderProps) => {
    const newOrders = orders.filter((order) => order !== item);
    setOrders(newOrders);
  };

  const sortedOrders = [...orders].sort((a, b) => b.date - a.date);

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <Text style={styles.header} type="title">
        Past Tabs
      </Text>
      <FlatList
        data={sortedOrders}
        style={styles.list}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({ item }) => <Item item={item} onDelete={onDelete} />}
      />
    </ThemedView>
  );
}

const makeStyles = () =>
  StyleSheet.create({
    bill: {
      paddingHorizontal: sizes.sm,
      paddingVertical: sizes.sm,
      marginVertical: sizes.xxs,
    },
    deleteBtn: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      marginVertical: sizes.xxs,
    },
    deleteTxt: {
      color: "white",
      fontWeight: "bold",
      fontSize: sizes.fsm,
    },
    header: {
      paddingLeft: sizes.sm,
    },
    list: {
      display: "flex",
      // paddingTop: 10,
    },
  });

export default Orders;
