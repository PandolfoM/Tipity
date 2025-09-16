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
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import sizes from "@/config/sizes";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useImage } from "@/context/ImageProvider";
import * as Location from "expo-location";

const Item = ({
  item,
  onDelete,
}: {
  item: OrderProps;
  onDelete: (item: OrderProps) => void;
}) => {
  const { showImage } = useImage();
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
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
    async function fetchAddress() {
      if (item.location && item.location.coords) {
        const { latitude, longitude } = item.location.coords;
        try {
          const results = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          if (results && results.length > 0) {
            const place = results[0];
            let addr = place.name || "";
            // if (place.street) addr += `, ${place.street}`;
            if (place.city) addr += `, ${place.city}`;
            if (place.region) addr += `, ${place.region}`;
            // if (place.country) addr += `, ${place.country}`;
            setAddress(addr);
          } else {
            setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          }
        } catch (e) {
          setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        }
      }
    }
    fetchAddress();
  }, [item.location]);

  useEffect(() => {
    const preloadImage = async () => {
      if (item.image) {
        try {
          const isValid = await Image.prefetch(item.image);
          setIsImageValid(isValid);
        } catch {
          console.warn("Invalid image URI:", item.image);
          setIsImageValid(false);
        }
      }
    };

    preloadImage();
  }, [item.image]);

  const RightActions = () => (
    <>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
        <Text style={styles.deleteTxt}>Delete</Text>
      </TouchableOpacity>
      {address && (
        <TouchableOpacity style={styles.viewBtn} onPress={() => openInMaps()}>
          <Text style={styles.deleteTxt}>View Location</Text>
        </TouchableOpacity>
      )}
    </>
  );

  const openInMaps = () => {
    if (item.location && item.location.coords) {
      const url = Platform.select({
        ios: `maps:0,0?q=${item.location.coords.latitude},${item.location.coords.longitude}`,
        android: `geo:0,0?q=${item.location.coords.latitude},${item.location.coords.longitude}`,
        default: `https://www.google.com/maps/search/?api=1&query=${item.location.coords.latitude},${item.location.coords.longitude}`,
      });
      Linking.openURL(url);
    }
  };

  return (
    <>
      <Swipeable friction={1} renderRightActions={RightActions}>
        <Pressable
          onPress={() => isImageValid && showImage(item.image as string)}>
          <View
            style={[styles.bill, { backgroundColor: billBackground, gap: 5 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[{ margin: "auto", fontWeight: "bold" }]}>
                {formattedDate}
              </Text>
              {address !== "" && (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                  }}>
                  {address}
                </Text>
              )}
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
            },
          ]}>
          <Text type="title">Nothing to see here yet</Text>
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
    viewBtn: {
      backgroundColor: "dodgerblue",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
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
      textAlign: "center",
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
      // paddingTop: 100,
    },
    icon: {
      fontSize: sizes.flg,
      opacity: 0.3,
    },
  });

export default Orders;
