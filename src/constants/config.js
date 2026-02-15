import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  // 1. Priority: Environment Variable (.env)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Dynamic Host Detection
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:9999`;
  }

  // 3. Fallbacks
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:9999';
  }
  return 'http://localhost:9999';
};

// Luôn nối thêm path cố định của Users API
const BASE_URL = getBaseUrl();

export default BASE_URL;