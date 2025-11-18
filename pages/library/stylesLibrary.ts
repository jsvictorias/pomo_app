import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#422D2C",
  },

  title: {
    fontFamily: "Coiny",
    fontSize: 50,
    color: "#DC3733",
    position: "absolute",
    top: 30,
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: 4, height: 4 },
    zIndex: 10,
  },

  subtitle: {
    fontFamily: "pixel",
    fontSize: 28,
    color: "#fff",
    position: "absolute",
    top: 200,
    textAlign: "center",
    zIndex: 10,
  },

  bookcontainer: {
    marginTop: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  book: {
    width: width * 1,    
    height: 360,
    resizeMode: "contain",
  },

  /* ========= Textos dentro do livro ========= */

  leftTitle: {
    position: "absolute",
    top: "30%",           
    left: "15%",
    textAlign: "center",
    fontFamily: "pixel",
    fontSize: 20,
    color: "#000",
  },

  leftHours: {
    position: "absolute",
    top: "45%",
    left: "13%",
    fontFamily: "Coiny",
    fontSize: 32,
    color: "#000",
  },

  rightTitle: {
    position: "absolute",
    top: "30%", 
    right: "20%",
    textAlign: "center",
    fontFamily: "pixel",
    fontSize: 20,
    color: "#000",
  },

  rightHours: {
    position: "absolute",
    top: "45%",
    right: "20%",
    fontFamily: "Coiny",
    fontSize: 32,
    color: "#000",
  },

  dayLabel: {
    position: "absolute",
    bottom: "30%",        
    right: "17%",
    fontFamily: "pixel",
    fontSize: 18,
    color: "#000",
  },

  /* ========= botão + plantinhas ========= */

  libContainer: {
    position: "absolute",
    bottom: -40,              
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  plantsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  plantImage: {
    width: 80,
    height: 80,
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
});
