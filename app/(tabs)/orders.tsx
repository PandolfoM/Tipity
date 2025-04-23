import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { OrderProps, useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import {
  FlatList,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import sizes from "@/config/sizes";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Item = ({
  item,
  onDelete,
}: {
  item: OrderProps;
  onDelete: (item: OrderProps) => void;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  const styles = makeStyles();
  const formattedDate = dayjs(item.date).format("MMMM D, YYYY hh:mm A");
  const billBackground = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");
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

  useEffect(() => {
    const preloadImage = async () => {
      if (item.image) {
        try {
          const isValid = await Image.prefetch(item.image);
          setIsImageValid(isValid); // Cache the result
        } catch {
          console.warn("Invalid image URI:", item.image);
          setIsImageValid(false);
        }
      }
    };

    preloadImage();
  }, [item.image]);

  const RightActions = () => (
    <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
      <Text style={styles.deleteTxt}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
        presentationStyle="pageSheet">
        <View style={[styles.modal, { backgroundColor: billBackground }]}>
          <Image
            source={{ uri: item.image }}
            style={{ height: "100%", width: "100%" }}
            contentFit="contain"
          />
        </View>
      </Modal>
      <Swipeable friction={2} renderRightActions={RightActions}>
        <Pressable onPress={() => isImageValid && setIsVisible(true)}>
          <View
            style={[styles.bill, { backgroundColor: billBackground, gap: 5 }]}>
            <View style={{ flex: 1 }}>
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
                    <Text
                      style={[{ fontWeight: "normal", color: accentColor }]}>
                      ${item.rounded ? roundedNumber : item.total}
                    </Text>
                  </Text>
                  <Text style={[{ fontWeight: "bold" }]}>
                    Tip:{" "}
                    <Text
                      style={[{ fontWeight: "normal", color: accentColor }]}>
                      ${formattedTip} ({item.service}%)
                    </Text>
                  </Text>
                </View>
                <View style={[{ gap: 5 }]}>
                  {item.split !== 1 && (
                    <Text style={[{ fontWeight: "bold" }]}>
                      Party:{" "}
                      <Text
                        style={[{ fontWeight: "normal", color: accentColor }]}>
                        {item.split}
                      </Text>
                    </Text>
                  )}
                  <Text style={[{ fontWeight: "bold" }]}>
                    Rounded Up:{" "}
                    <Text
                      style={[{ fontWeight: "normal", color: accentColor }]}>
                      {item.rounded ? "Yes" : "No"}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            {isImageValid && (
              <View>
                <MaterialCommunityIcons
                  style={[styles.icon, { color: whiteColor }]}
                  name="chevron-right"
                />
              </View>
            )}
          </View>
        </Pressable>
      </Swipeable>
    </>
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
      {sortedOrders.length > 0 ? (
        <FlatList
          data={sortedOrders}
          style={styles.list}
          keyExtractor={(item) => item.date.toString()}
          renderItem={({ item }) => <Item item={item} onDelete={onDelete} />}
        />
      ) : (
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: 2,
            },
          ]}>
          <Text type="subtitle">Nothing to see here yet</Text>
        </View>
      )}
    </ThemedView>
  );
}

const makeStyles = () =>
  StyleSheet.create({
    bill: {
      paddingHorizontal: sizes.sm,
      paddingVertical: sizes.sm,
      marginVertical: sizes.xxs,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    },
    modal: {
      flex: 1,
    },
    icon: {
      fontSize: sizes.flg,
      opacity: 0.3,
    },
  });

export default Orders;
