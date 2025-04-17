import storage from "@/utils/storage";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { AppState, AppStateStatus, View } from "react-native";

interface SettingsContextProps {
  keepAwake: boolean;
  setKeepAwake: React.Dispatch<React.SetStateAction<boolean>>;
  saveBills: boolean;
  setSaveBills: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
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

  useEffect(() => {
    async function prepare() {
      try {
        const [keepAwake, saveBills] = await Promise.all([
          storage.getData("keepAwake"),
          storage.getData("saveBills"),
        ]);

        setKeepAwake(keepAwake || false);
        setSaveBills(saveBills || true);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        const saveData = async () => {
          try {
            await Promise.all(
              [
                storage.storeData("keepAwake", keepAwake),
                storage.storeData("saveBills", saveBills),
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
  }, [keepAwake, saveBills]);

  return (
    <SettingsContext.Provider
      value={{
        keepAwake,
        setKeepAwake,
        saveBills,
        setSaveBills,
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings };
