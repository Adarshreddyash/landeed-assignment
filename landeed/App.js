import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import WorldClock from "./Components/WorldClock";
import CountdownTimer from "./Components/CountDownTimer";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Countdown Timer");

  return (
    <View style={styles.container}>
      {/* Status bar default dark in ios & androidd */}
      <StatusBar color="primary"></StatusBar>
      <View style={styles.tabContainer}>
        {/* Tabs */}
        <TouchableOpacity onPress={() => setCurrentTab("Countdown Timer")}>
          <Text
            style={
              currentTab === "Countdown Timer"
                ? styles.activeTab
                : styles.inactiveTab
            }
          >
            Countdown Timer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentTab("World Clock")}>
          <Text
            style={
              currentTab === "World Clock"
                ? styles.activeTab
                : styles.inactiveTab
            }
          >
            World Clock
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab === "Countdown Timer" ? <CountdownTimer /> : <WorldClock />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  activeTab: {
    marginRight: 20,
    fontSize: 18,
    color: "blue",
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderRadius: 25,
  },
  inactiveTab: {
    marginRight: 20,
    fontSize: 18,
    color: "black",
  },
});

export default App;
