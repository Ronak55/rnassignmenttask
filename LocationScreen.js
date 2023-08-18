import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const LocationScreen = () => {
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState("");


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });

      try {
        let reverseLocation = await Location.reverseGeocodeAsync(location.coords);
        let address = reverseLocation[0].name + ", " + reverseLocation[0].city + ", " + reverseLocation[0].postalCode;
        setAddress(address);
      } catch (error) {
        console.log(error);
        setAddress("Location not found");
      }
    })();
  }, []);

  useEffect(() => {
    if (region) {
      mapRef.current.animateToRegion(region, 500);
    }
  }, [region]);

  const handleZoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 0.5,
      longitudeDelta: region.longitudeDelta * 0.5,
    });
  };

  const handleZoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  const mapRef = React.createRef();

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Current Location</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <Marker coordinate={region} />
        </MapView>
      ) : (
        <View style={styles.loaderContainer}>
          <Text>Loading map...</Text>
        </View>
      )}
      <TouchableOpacity style={styles.zoomInButton} onPress={handleZoomIn}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomOutButton} onPress={handleZoomOut}>
        <MaterialIcons name="remove" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 1,
    backgroundColor: "transparent",
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#f1f1f1",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomInButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 24,
  },
  zoomOutButton: {
    position: "absolute",
    bottom: 20,
    right: 16,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 24,
  },
});

export default LocationScreen;
