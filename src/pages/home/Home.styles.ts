import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: "Coiny",
    fontSize: 80,
    color: "#DC3733",
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 999,
    textShadowColor: "white",
    textShadowOffset: { width: 5, height: 5 },
  },

  buttonRow: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  buttonBox: {
    alignItems: "center",
  },

  pixelImage: {
    width: 140,
    height: 140,
  },

  buttonText: {
    fontFamily: "Coiny",
    fontSize: 26,
    color: "#000",
    marginTop: 10,
  },
});
