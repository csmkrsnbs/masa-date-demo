import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export function scanNearbyDevices(callback) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.warn("BLE Hatası:", error);
      return;
    }
    if (device && device.rssi > -70) {
      callback(device);
    }
  });
}