import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:9999`;
  }

  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:9999';
  }

  return 'http://localhost:9999';
};

const normalizeBaseUrl = (url) => (url?.endsWith('/') ? url.slice(0, -1) : url);

const API_URL = `${normalizeBaseUrl(getBaseUrl())}/api`;
console.log('[API_CONFIG] API_URL =', API_URL);

export default API_URL;
