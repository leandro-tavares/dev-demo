import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  headerText: {
    fontSize: 15,
    color: "#737380"
  },

  headerTextBold: {
    fontWeight: "bold"
  },

  logo: {
    height: 50,
    width: 50,
    marginRight: 10
  },

  logoText: {
    fontSize: 16,
    color: "#57baa7",
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#57baa7",
    borderBottomWidth: 1,
    borderBottomColor: "#57baa7"
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: "#13131a",
    fontWeight: "bold"
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#737380"
  },

  incidentList: {
    marginTop: 32
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    marginTop: 16
  },

  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },

  incidentValue: {
    marginTop: 0,
    fontSize: 15,
    marginBottom: 18,
    color: "#737380"
  }
});
