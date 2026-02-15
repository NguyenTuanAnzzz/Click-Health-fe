import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
  // 1. If you set an environment variable, use it.
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Dynamic Host Detection (Best for Development with physical devices)
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  
  if (debuggerHost) {
    // debuggerHost is like "192.168.1.10:8081"
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:9999/api/users`;
  }

  // 3. Fallbacks for Simulators/Emulators if debuggerHost isn't available
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:9999/api/users';
  }

  // iOS Simulator or Web
  return 'http://localhost:9999/api/users';
};

const API_URL = getApiUrl();

console.log('--- API CONFIG ---');
console.log('Platform:', Platform.OS);
console.log('Resolved API_URL:', API_URL);

export default API_URL;