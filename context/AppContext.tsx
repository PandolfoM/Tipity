import storage from "@/utils/storage";
import { SplashScreen } from "expo-router";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Appearance, AppState, AppStateStatus, View } from "react-native";

interface AppContextProps {
  isRounding: boolean;
  setIsRounding: React.Dispatch<React.SetStateAction<boolean>>;
  split: number | undefined;
  setSplit: React.Dispatch<React.SetStateAction<number | undefined>>;
  service: number | undefined;
  setService: React.Dispatch<React.SetStateAction<number | undefined>>;
  billTotal: number;
  setBillTotal: React.Dispatch<React.SetStateAction<number>>;
  total: string;
  setTotal: React.Dispatch<React.SetStateAction<string>>;
  tip: string;
  setTip: React.Dispatch<React.SetStateAction<string>>;
  orders: Array<OrderProps>;
  setOrders: React.Dispatch<React.SetStateAction<Array<OrderProps>>>;
  themeColor: "auto" | "dark" | "light";
  setThemeColor: React.Dispatch<
    React.SetStateAction<"auto" | "dark" | "light">
  >;
}

export interface OrderProps {
  total: string;
  split: number;
  service: number;
  date: number;
  rounded: boolean;
  tip: string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

function useApp(): AppContextProps {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isRounding, setIsRounding] = useState<boolean>(false);
  const [split, setSplit] = useState<number | undefined>(1);
  const [service, setService] = useState<number | undefined>(18);
  const [orders, setOrders] = useState<Array<OrderProps>>([]);
  const [billTotal, setBillTotal] = useState<number>(0);
  const [total, setTotal] = useState<string>("0.00");
  const [tip, setTip] = useState<string>("0.00");
  const [themeColor, setThemeColor] = useState<"auto" | "dark" | "light">(
    "auto"
  );

  useEffect(() => {
    async function prepare() {
      try {
        const [darkMode, split, service, rounding, orders] = await Promise.all([
          storage.getData("darkMode"),
          storage.getData("split"),
          storage.getData("service"),
          storage.getData("rounding"),
          storage.getData("orders"),
        ]);

        Appearance.setColorScheme(darkMode);
        setThemeColor(darkMode == null ? "auto" : darkMode);
        setSplit(split || 1);
        setService(service || 18);
        setIsRounding(rounding || false);
        setOrders(orders || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        const saveData = async () => {
          try {
            if (billTotal !== 0) {
              const newOrder: OrderProps = {
                date: Date.now(),
                rounded: isRounding,
                service: service || 0,
                split: split || 1,
                total,
                tip,
              };
              const updatedOrders = [...orders, newOrder];

              await Promise.all(
                [
                  updatedOrders.length > orders.length &&
                    storage.storeData("orders", updatedOrders),
                ].filter(Boolean)
              );
            }

            await Promise.all(
              [
                split !== undefined && storage.storeData("split", split),
                isRounding !== undefined &&
                  storage.storeData("rounding", isRounding),
                service !== undefined && storage.storeData("service", service),
              ].filter(Boolean)
            );
          } catch (error) {
            console.error("Error saving data on app close:", error);
          }
        };
        saveData();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [split, isRounding, service, orders]);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        isRounding,
        setIsRounding,
        themeColor,
        setThemeColor,
        split,
        setSplit,
        service,
        setService,
        billTotal,
        setBillTotal,
        orders,
        setOrders,
        total,
        setTotal,
        tip,
        setTip,
      }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {children}
      </View>
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
