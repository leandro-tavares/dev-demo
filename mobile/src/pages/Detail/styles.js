import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },

  itemTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30
  },

  itemDescription: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 15,
    color: "#737380"
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center"
  },

  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  }
});
