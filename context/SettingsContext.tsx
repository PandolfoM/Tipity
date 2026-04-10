import storage from "@/utils/storage";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import * as RNIap from "react-native-iap";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REMOVE_ADS_PRODUCT_ID = "no_ads";

interface SettingsContextProps {
  keepAwake: boolean;
  setKeepAwake: React.Dispatch<React.SetStateAction<boolean>>;
  saveBills: boolean;
  setSaveBills: React.Dispatch<React.SetStateAction<boolean>>;
  autoSaveTabs: boolean;
  setAutoSaveTabs: React.Dispatch<React.SetStateAction<boolean>>;
  aiExtractTotal: boolean;
  setAiExtractTotal: React.Dispatch<React.SetStateAction<boolean>>;
  adsDisabled: boolean;
  purchaseRemoveAds: () => Promise<void>;
  checkRemoveAds: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

function useSettings(): SettingsContextProps {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [keepAwake, setKeepAwake] = useState<boolean>(false);
  const [saveBills, setSaveBills] = useState<boolean>(true);
  const [autoSaveTabs, setAutoSaveTabs] = useState<boolean>(true);
  const [aiExtractTotal, setAiExtractTotal] = useState<boolean>(false);
  const [adsDisabled, setAdsDisabled] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await RNIap.initConnection();
        await checkRemoveAds();
      } catch (e) {
        console.log(e);
      }
    };
    init();
    return () => {
      RNIap.endConnection();
    };
  }, []);

  const checkRemoveAds = async () => {
    // // Check AsyncStorage first for quick UX
    // const stored = await AsyncStorage.getItem("adsDisabled");
    // if (stored === "true") {
    //   setAdsDisabled(true);
    //   return;
    // }

    // Check purchase history
    try {
      const purchases = await RNIap.getAvailablePurchases();

      const hasRemoveAds = purchases.some(
        (purchase) => purchase.productId === REMOVE_ADS_PRODUCT_ID,
      );
      setAdsDisabled(hasRemoveAds);
      if (hasRemoveAds) {
        await AsyncStorage.setItem("adsDisabled", "true");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const purchaseRemoveAds = async () => {
    try {
      await RNIap.requestPurchase({
        request: {
          apple: {
            sku: REMOVE_ADS_PRODUCT_ID,
          },
        },
        type: "in-app",
      });
      setAdsDisabled(true);
      await AsyncStorage.setItem("adsDisabled", "true");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        const [keepAwake, saveBills, autoSaveTabs, aiExtractTotal] =
          await Promise.all([
            storage.getData("keepAwake"),
            storage.getData("saveBills"),
            storage.getData("autoSaveTabs"),
            storage.getData("aiExtractTotal"),
          ]);

        setKeepAwake(typeof keepAwake === "boolean" ? keepAwake : false);
        setSaveBills(typeof saveBills === "boolean" ? saveBills : true);
        setAutoSaveTabs(
          typeof autoSaveTabs === "boolean" ? autoSaveTabs : true,
        );
        setAiExtractTotal(
          typeof aiExtractTotal === "boolean" ? aiExtractTotal : false,
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    prepare();
  }, []);

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: AppStateStatus) => {
  //     if (nextAppState === "background") {
  //       const saveData = async () => {
  //         try {
  //           await Promise.all(
  //             [
  //               storage.storeData("keepAwake", keepAwake),
  //               storage.storeData("saveBills", saveBills),
  //               storage.storeData("autoSaveTabs", autoSaveTabs),
  //               storage.storeData("aiExtractTotal", aiExtractTotal),
  //             ].filter(Boolean)
  //           );
  //         } catch (error) {
  //           console.error("Error saving data on app close:", error);
  //         }
  //       };
  //       saveData();
  //     }
  //   };

  //   const subscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [keepAwake, saveBills, autoSaveTabs]);

  return (
    <SettingsContext.Provider
      value={{
        keepAwake,
        setKeepAwake,
        saveBills,
        setSaveBills,
        autoSaveTabs,
        setAutoSaveTabs,
        aiExtractTotal,
        setAiExtractTotal,
        adsDisabled,
        checkRemoveAds,
        purchaseRemoveAds,
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings };
