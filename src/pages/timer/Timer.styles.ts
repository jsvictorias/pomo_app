import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: "Coiny",
    fontSize: 50,
    color: "black",
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 999,
    textShadowColor: "white",
    textShadowOffset: { width: 5, height: 5 },
    textAlign: "center",
  },

  tomatotimerview: {
    position: "absolute",
    top: 260,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },

  libContainer: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  plantsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  plantImage: {
    width: 90,
    height: 90,
    marginHorizontal: 2,
  },

  butLib: {
    backgroundColor: "#78E372",
    borderRadius: 15,
    width: 180,
    padding: 10,
    borderColor: "#216E1D",
    borderWidth: 3,
    marginHorizontal: 10,
  },

  textLib: {
    fontSize: 18,
    fontFamily: "pixel",
    textAlign: "center",
  },

  stop: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  stoptext: {
    fontFamily: "pixel",
    fontSize: 18,
    color: "#AD2E2B",
    fontWeight: "800",
  },
});
