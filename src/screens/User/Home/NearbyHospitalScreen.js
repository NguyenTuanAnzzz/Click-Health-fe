import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";
import { useSelector, useDispatch } from "react-redux";
import { getNearbyHospital } from "../../../store/slices/placeSlice";
import HospitalCard from "../../../components/ui/HostpitalCard";
import BackButton from "../../../components/ui/BackButton";
import Pagination from "../../../components/ui/Pagination";
import * as Location from "expo-location";

const RADIUS_KM = 20;
const RADIUS_METERS = RADIUS_KM * 1000;
const LIST_PAGE_SIZE = 10;
const FETCH_LIMIT = 500;

/** Chuẩn hóa số cho URI tel: (giữ + quốc tế, bỏ khoảng trắng / dấu gạch). */
function phoneToTelDigits(raw) {
  if (!raw || typeof raw !== "string") return null;
  const first = raw.split(/[;|/]/)[0].trim();
  if (!first) return null;
  const noExt = first.split(/\s+(ext\.?|x)\s*/i)[0].trim();
  let s = noExt.replace(/[\s().-]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (!/^\+?\d{6,}$/.test(s)) return null;
  return s;
}

const filters = [
  { id: 1, title: "Tất cả", active: true },
  { id: 2, title: "Cấp cứu 24/7", icon: "truck" },
  { id: 3, title: "Bệnh viện công" },
  { id: 4, title: "Bệnh viện tư" },
];

const NearbyHospitalScreen = () => {
  const { loading, error, hospitalsInRadius } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil((hospitalsInRadius?.length || 0) / LIST_PAGE_SIZE));

  const pagedHospitals = (hospitalsInRadius || []).slice(
    (currentPage - 1) * LIST_PAGE_SIZE,
    currentPage * LIST_PAGE_SIZE
  );

  const getPaginationPages = (page, total) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (page >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    return [1, "...", page - 1, page, page + 1, "...", total];
  };

  const fitMapToData = useCallback(() => {
    if (!location || !mapRef.current) return;

    const userCoord = { latitude: location.lat, longitude: location.lng };
    const hospitalCoords = (hospitalsInRadius || []).map((h) => ({
      latitude: h.latitude,
      longitude: h.longitude,
    }));

    const coords = [userCoord, ...hospitalCoords];

    if (hospitalCoords.length === 0) {
      mapRef.current.animateToRegion(
        {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.22,
          longitudeDelta: 0.22,
        },
        350
      );
      return;
    }

    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 56, right: 36, bottom: 36, left: 36 },
      animated: true,
    });
  }, [location, hospitalsInRadius]);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationDenied(true);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        });
        setLocationDenied(false);
      } catch (e) {
        setLocationDenied(true);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [location?.lat, location?.lng]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil((hospitalsInRadius?.length || 0) / LIST_PAGE_SIZE));
    setCurrentPage((p) => Math.min(p, maxPage));
  }, [hospitalsInRadius?.length]);

  useEffect(() => {
    if (!location) return;

    dispatch(
      getNearbyHospital({
        lat: location.lat,
        lng: location.lng,
        page: 1,
        limit: FETCH_LIMIT,
        radiusMeters: RADIUS_METERS,
      })
    );
  }, [dispatch, location]);

  useEffect(() => {
    if (!location || loading) return;
    const t = setTimeout(fitMapToData, 400);
    return () => clearTimeout(t);
  }, [location, loading, hospitalsInRadius, fitMapToData]);

  const recenterOnUser = () => {
    if (!location || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.22,
        longitudeDelta: 0.22,
      },
      350
    );
  };

  const zoomMap = (direction) => {
    if (!location || !mapRef.current) return;
    mapRef.current
      .getCamera()
      .then((cam) => {
        const next = Math.min(20, Math.max(4, (cam.zoom || 12) + direction));
        mapRef.current.animateCamera({ center: cam.center, zoom: next }, { duration: 220 });
      })
      .catch(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.12 * (direction > 0 ? 0.65 : 1.45),
            longitudeDelta: 0.12 * (direction > 0 ? 0.65 : 1.45),
          },
          220
        );
      });
  };

  const openDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const openHospitalCall = (h) => {
    if (h.phone) {
      const tel = phoneToTelDigits(h.phone);
      if (tel) {
        const url = `tel:${tel}`;
        Linking.openURL(url).catch(() => {
          Alert.alert("Không thể gọi", "Máy không mở được ứng dụng điện thoại.");
        });
        return;
      }
    }

    Alert.alert(
      "Chưa có số điện thoại",
      `OpenStreetMap chưa ghi số cho "${h.name}". Bạn có thể mở Google Maps (thường có nút gọi giống khi bạn tự tìm) hoặc gọi 115 khi cấp cứu.`,
      [
        { text: "Đóng", style: "cancel" },
        {
          text: "Mở Google Maps",
          onPress: () => {
            const name = encodeURIComponent(h.name);
            const ll = `${h.latitude},${h.longitude}`;
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${name}&ll=${encodeURIComponent(ll)}&hl=vi`
            );
          },
        },
        { text: "Gọi 115", onPress: () => Linking.openURL("tel:115") },
      ]
    );
  };

  const mapProvider = Platform.OS === "android" ? PROVIDER_GOOGLE : undefined;

  const listEmpty =
    !loading &&
    !error &&
    location &&
    (!hospitalsInRadius || hospitalsInRadius.length === 0);

  return (
    <UserLayout>
      <View style={styles.screenHeader}>
        <BackButton />

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bệnh viện gần nhất</Text>
          <Text style={styles.headerDesc}>Tìm bệnh viện gần bạn nhất</Text>
        </View>

        <View style={styles.headerIconBox}>
          <Feather name="map-pin" size={20} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.mapBox}>
        {location && !locationDenied ? (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            provider={mapProvider}
            showsUserLocation={false}
            showsMyLocationButton={false}
            initialRegion={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.22,
              longitudeDelta: 0.22,
            }}
          >
            <Circle
              center={{ latitude: location.lat, longitude: location.lng }}
              radius={RADIUS_METERS}
              strokeColor="rgba(40,107,194,0.55)"
              fillColor="rgba(40,107,194,0.1)"
              strokeWidth={2}
            />

            <Marker
              coordinate={{ latitude: location.lat, longitude: location.lng }}
              title="Vị trí của bạn"
              pinColor={COLORS.primary}
            />

            {(hospitalsInRadius || []).map((h) => (
              <Marker
                key={h.id}
                coordinate={{ latitude: h.latitude, longitude: h.longitude }}
                title={h.name}
                description={`${h.distance} km`}
                pinColor="#EF4444"
              />
            ))}
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            {locationDenied ? (
              <>
                <Feather name="map-pin" size={28} color={COLORS.textMuted} />
                <Text style={styles.mapPlaceholderTitle}>Cần quyền truy cập vị trí</Text>
                <Text style={styles.mapPlaceholderDesc}>
                  Bật định vị để xem bản đồ và danh sách bệnh viện trong bán kính {RADIUS_KM}km.
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color={COLORS.primary} />
            )}
          </View>
        )}

        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton} activeOpacity={0.8} onPress={() => zoomMap(1)}>
            <Feather name="plus" size={18} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mapButton} activeOpacity={0.8} onPress={() => zoomMap(-1)}>
            <Feather name="minus" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.myLocationButton} activeOpacity={0.8} onPress={recenterOnUser}>
          <Feather name="crosshair" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      >
        {filters.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={[styles.filterChip, item.active && styles.filterChipActive]}
          >
            {item.icon && (
              <Feather name={item.icon} size={14} color={item.active ? COLORS.white : "#EF4444"} />
            )}

            <Text style={[styles.filterText, item.active && styles.filterTextActive]}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách bệnh viện</Text>

        <View style={styles.sortButton}>
          <Feather name="arrow-up" size={15} color={COLORS.primary} />
          <Text style={styles.sortText}>Trong {RADIUS_KM}km · gần → xa</Text>
        </View>
      </View>

      {!location || locationDenied ? (
        <View style={styles.emptyBox}>
          <Feather name="map-pin" size={20} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>
            {locationDenied
              ? "Không thể lấy vị trí. Hãy cấp quyền định vị trong cài đặt."
              : "Đang xác định vị trí của bạn..."}
          </Text>
        </View>
      ) : loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải bệnh viện...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyBox}>
          <Feather name="alert-circle" size={20} color="#EF4444" />
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : listEmpty ? (
        <View style={styles.emptyBox}>
          <Feather name="map-pin" size={20} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>Không có bệnh viện nào trong {RADIUS_KM}km</Text>
        </View>
      ) : (
        pagedHospitals.map((h) => (
          <HospitalCard
            key={h.id}
            name={h.name}
            address={h.address}
            distance={typeof h.distance === "number" ? `${h.distance} km` : "Chưa rõ"}
            onDirection={() => openDirections(h.latitude, h.longitude)}
            onCall={() => openHospitalCall(h)}
          />
        ))
      )}

      <View style={styles.emergencyCard}>
        <View style={styles.emergencyIconBox}>
          <Feather name="alert-triangle" size={19} color="#EF4444" />
        </View>

        <View style={styles.emergencyContent}>
          <Text style={styles.emergencyTitle}>Trường hợp khẩn cấp</Text>
          <Text style={styles.emergencyDesc}>
            Nếu có dấu hiệu đột quỵ, hãy gọi ngay <Text style={styles.emergencyPhone}>115</Text> hoặc đến bệnh
            viện có khoa Cấp cứu 24/7 gần nhất.
          </Text>
        </View>
      </View>

      <Pagination
        currentPage={currentPage}
        pages={getPaginationPages(currentPage, totalPages)}
        disablePrevious={currentPage === 1}
        disableNext={currentPage === totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPagePress={(page) => setCurrentPage(page)}
      />
    </UserLayout>
  );
};

export default NearbyHospitalScreen;

const styles = StyleSheet.create({
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "900",
    color: COLORS.black,
  },

  headerDesc: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.darkGray,
  },

  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(132,170,216,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(132,170,216,0.28)",
  },

  mapBox: {
    height: 224,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#E8F4FD",
    borderWidth: 1,
    borderColor: "rgba(132,170,216,0.25)",
  },

  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  mapPlaceholderTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
    textAlign: "center",
  },

  mapPlaceholderDesc: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.darkGray,
    textAlign: "center",
  },

  mapControls: {
    position: "absolute",
    right: 12,
    bottom: 12,
    gap: 8,
  },

  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  myLocationButton: {
    position: "absolute",
    left: 12,
    bottom: 12,
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  filterList: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 15,
  },

  filterChip: {
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  filterChipActive: {
    backgroundColor: COLORS.primary,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.black,
  },

  filterTextActive: {
    color: COLORS.white,
  },

  listHeader: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  listTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.black,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  sortText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    maxWidth: 140,
  },

  loadingBox: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.darkGray,
    fontWeight: "600",
  },

  emptyBox: {
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.darkGray,
    textAlign: "center",
    fontWeight: "600",
  },

  emergencyCard: {
    marginTop: 16,
    marginBottom: 6,
    padding: 15,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  emergencyIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  emergencyContent: {
    flex: 1,
  },

  emergencyTitle: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "900",
    color: "#B91C1C",
  },

  emergencyDesc: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    color: "#DC2626",
  },

  emergencyPhone: {
    fontWeight: "900",
    textDecorationLine: "underline",
  },
});
