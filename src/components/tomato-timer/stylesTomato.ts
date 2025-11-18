import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.7, 
    marginBottom: 40,
  },
  timerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  timerText: {
    position: "absolute",
    fontSize: 30,
    color: "black",
    fontFamily: 'Coiny',
    marginTop: 30,
  },
  breakText: {
    marginTop: 10,
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
});
