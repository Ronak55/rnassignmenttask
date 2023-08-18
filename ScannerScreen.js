import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData('');
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <MaterialIcons name="qr-code-scanner" size={150} color="#fff" />
           
          </View>
        </View>
      </BarCodeScanner>
      {scanned && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Data:</Text>
          <Text style={styles.barcodeDataText}>{scannedData}</Text>
          <Button title="Scan Again" onPress={handleScanAgain} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanArea: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
  scanText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    padding: 25,
    alignItems: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  barcodeDataText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ScannerScreen;
