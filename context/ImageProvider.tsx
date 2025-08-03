import React, {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sizes from "@/config/sizes";
import { useThemeColor } from "@/hooks/useThemeColors";

type ImageViewHandle = {
  show: (imageUri: string) => void;
};

const ImageContext = createContext<{
  showImage: (imageUri: string) => void;
} | null>(null);

export default function ImageProvider({ children }: { children: ReactNode }) {
  const imageRef = useRef<ImageViewHandle>(null);

  const showImage = (imageUri: string) => {
    imageRef.current?.show(imageUri);
  };

  return (
    <ImageContext.Provider value={{ showImage }}>
      {children}
      <ImageView ref={imageRef} />
    </ImageContext.Provider>
  );
}

const ImageView = forwardRef((props, ref) => {
  const bgColor = useThemeColor({}, "background");
  const accentColor = useThemeColor({}, "accent");
  const [show, setShow] = useState(false);
  const imageUriRef = useRef("");

  useImperativeHandle(ref, () => ({
    hide: () => {
      imageUriRef.current = "";
      setShow(false);
    },
    show: (uri = "") => {
      imageUriRef.current = uri;
      setShow(true);
    },
  }));

  if (!show) return null;

  const hide = () => {
    setShow(false);
    imageUriRef.current = "";
  };

  return (
    <View style={styles.overlayContainer}>
      <View
        style={[
          styles.overlayBackground,
          { backgroundColor: bgColor, opacity: 0.8 },
        ]}
      />
      <View style={styles.overlayContent}>
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: accentColor }]}
          onPress={hide}>
          <MaterialCommunityIcons
            name="close"
            size={sizes.fxl}
            color={"#fff"}
          />
        </TouchableOpacity>
        <Zoomable isDoubleTapEnabled>
          <Image
            source={{ uri: imageUriRef.current }}
            contentFit="contain"
            style={styles.fullScreenImage}
          />
        </Zoomable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000000,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContent: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 10,
    padding: 5,
    borderRadius: 20,
    zIndex: 100001,
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
}
