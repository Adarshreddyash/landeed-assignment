import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const CountdownTimer = () => {
  const [countdownTimers, setCountdownTimers] = useState([]);
  const [newTimer, setNewTimer] = useState("");

  const addTimer = () => {
    // function to add new timer to the existing list
    setCountdownTimers((prevTimers) => [
      ...prevTimers,
      { time: parseInt(newTimer), progress: 0 },
    ]);
    setNewTimer("");
  };

  const removeTimer = (index) => {
    // function to remove timer from existing list
    setCountdownTimers((prevTimers) =>
      prevTimers.filter((_, i) => i !== index)
    );
  };

  const startCountdown = () => {
    const timerInterval = setInterval(() => {
      // increment and set the timer using interval
      setCountdownTimers((prevTimers) =>
        prevTimers.map((timer) => ({
          ...timer,
          progress: timer.progress + 1,
        }))
      );
    }, 1000);

    //after maximum duration stop the interval
    setTimeout(
      () => clearInterval(timerInterval),
      Math.max(...countdownTimers.map((timer) => timer.time)) * 1000
    );
  };

  return (
    <View style={styles.timerContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter time in seconds"
        keyboardType="numeric"
        value={newTimer}
        onChangeText={(text) => setNewTimer(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addTimer}>
        <Text style={styles.buttonText}>Add Timer</Text>
      </TouchableOpacity>
      <ScrollView style={styles.timerList}>
        {countdownTimers.map((timer, index) => (
          <View key={index} style={styles.timerItem}>
            <Text>{`Timer ${index + 1}: ${timer.time}s (${
              timer.progress
            }s)`}</Text>
            <TouchableOpacity onPress={() => removeTimer(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.startButton} onPress={startCountdown}>
        <Text style={styles.buttonText}>Start Countdown</Text>
      </TouchableOpacity>
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
  },
  inactiveTab: {
    marginRight: 20,
    fontSize: 18,
    color: "black",
  },
  timerContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  timerList: {
    maxHeight: 150,
    marginBottom: 10,
  },
  timerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  removeButton: {
    color: "red",
  },
  startButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  worldClockContainer: {
    marginTop: 20,
    width: "100%",
  },
  worldClockText: {
    marginBottom: 10,
  },
  timezoneButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CountdownTimer;
