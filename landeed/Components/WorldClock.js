import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WorldClock = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Kolkata");
  const [timer, setTime] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWorldClock = async () => {
    try {
      // Fetch time from worldtime api
      const response = await fetch(
        `https://worldtimeapi.org/api/timezone/${selectedTimeZone}`
      );
      const data = await response.json();
      const { datetime } = data;
      setTime(datetime);
    } catch (error) {
      console.error("Error fetching world clock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAndSetInterval = async () => {
      await fetchWorldClock(); // Wait for initial fetch to complete

      const worldClockInterval = setInterval(() => {
        if (selectedTimeZone !== "Asia/Kolkata") {
          // Only update time if the selected time zone is not IST
          setTime((prevTime) => {
            if (prevTime) {
              const currentTime = new Date(prevTime);
              currentTime.setSeconds(currentTime.getSeconds() + 1);

              // Check if a minute has passed
              if (currentTime.getSeconds() === 0) {
                currentTime.setMinutes(currentTime.getMinutes() + 1);

                // Check if an hour has passed
                if (currentTime.getMinutes() === 0) {
                  currentTime.setHours(currentTime.getHours() + 1);
                }
              }

              return currentTime.toISOString();
            }
            return prevTime;
          });
        }
      }, 1000);

      // Clear the interval when selectedTimeZone changes
      return () => clearInterval(worldClockInterval);
    };

    fetchDataAndSetInterval(); // Invoke the function
  }, [selectedTimeZone]);

  return (
    <View style={styles.worldClockContainer}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : timer ? (
        <View>
          <Text
            style={styles.worldClockText}
          >{`Selected Timezone: (${selectedTimeZone})`}</Text>
          <Text style={styles.currentTimeText}>{`${timer.slice(11, 19)}`}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Error fetching world clock data.</Text>
      )}
      <TouchableOpacity
        style={styles.timezoneButton}
        onPress={() => setSelectedTimeZone("PST8PDT")}
      >
        <Text style={styles.buttonText}>Set PST</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.timezoneButton}
        onPress={() => setSelectedTimeZone("Asia/Kolkata")}
      >
        <Text style={styles.buttonText}>Set IST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  worldClockContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginVertical: 10,
    color: "gray",
  },
  worldClockText: {
    fontSize: 18,
    marginVertical: 10,
  },
  currentTimeText: {
    fontSize: 100,
    fontWeight: "bold",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginVertical: 10,
    color: "red",
  },
  timezoneButton: {
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default WorldClock;
