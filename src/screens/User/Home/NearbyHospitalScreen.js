import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";
import { useSelector, useDispatch } from "react-redux";
import { getNearbyHospital } from "../../../store/slices/placeSlice";
import CardPaginationNearbyHospital from "../../../components/ui/CardPaginationNearbyHostpital";
import HospitalCard from "../../../components/ui/HostpitalCard";
import BackButton from "../../../components/ui/BackButton";
import Pagination from "../../../components/ui/Pagination";
import * as Location from "expo-location";
const filters = [
  { id: 1, title: "Tất cả", active: true },
  { id: 2, title: "Cấp cứu 24/7", icon: "truck" },
  { id: 3, title: "Bệnh viện công" },
  { id: 4, title: "Bệnh viện tư" },
];





const NearbyHospitalScreen = () => {

  const { loading, error, hospitals, totalItems, pages } = useSelector((state) => state.place)
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pages || 1;


  const getPaginationPages = (currentPage, totalPages) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Người dùng không cho phép lấy vị trí");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        });
      } catch (error) {
        console.log("LOCATION ERROR:", error);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (!location) return;

    dispatch(
      getNearbyHospital({
        lat: location.lat,
        lng: location.lng,
        page: currentPage,
        limit: 10,
      })
    );
  }, [dispatch, location, currentPage]);


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
        <View style={styles.gridLineHorizontalOne} />
        <View style={styles.gridLineHorizontalTwo} />
        <View style={styles.gridLineHorizontalThree} />
        <View style={styles.gridLineVerticalOne} />
        <View style={styles.gridLineVerticalTwo} />
        <View style={styles.gridLineVerticalThree} />

        <View style={styles.userLocation}>
          <View style={styles.userPulse} />
          <View style={styles.userDot}>
            <Feather name="user" size={20} color={COLORS.white} />
          </View>
        </View>

        <MapMarker top={32} left={30} distance="0.8km" color="#EF4444" icon="plus" />
        <MapMarker top={44} right={44} distance="1.2km" color={COLORS.primary} icon="home" />
        <MapMarker bottom={58} left={58} distance="2.1km" color="#84AAD8" icon="plus" />
        <MapMarker bottom={28} right={74} distance="3.5km" color={COLORS.primary} icon="activity" />

        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
            <Feather name="plus" size={18} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
            <Feather name="minus" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.myLocationButton} activeOpacity={0.8}>
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
              <Feather
                name={item.icon}
                size={14}
                color={item.active ? COLORS.white : "#EF4444"}
              />
            )}

            <Text
              style={[
                styles.filterText,
                item.active && styles.filterTextActive,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách bệnh viện</Text>

        <TouchableOpacity style={styles.sortButton} activeOpacity={0.8}>
          <Feather name="arrow-up" size={15} color={COLORS.primary} />
          <Text style={styles.sortText}>Khoảng cách: 20km</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải bệnh viện...</Text>
        </View>
      ) : error ? (
        <View style={styles.emptyBox}>
          <Feather name="alert-circle" size={20} color="#EF4444" />
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : hospitals.length === 0 ? (
        <View style={styles.emptyBox}>
          <Feather name="map-pin" size={20} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>Không tìm thấy bệnh viện gần bạn</Text>
        </View>
      ) : (
        hospitals.map((h) => (
          <HospitalCard
            key={h.id}
            name={h.name}
            address={h.address}
            distance={h.distance ? `${h.distance} km` : "Chưa rõ"}
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
            Nếu có dấu hiệu đột quỵ, hãy gọi ngay{" "}
            <Text style={styles.emergencyPhone}>115</Text> hoặc đến bệnh viện có
            khoa Cấp cứu 24/7 gần nhất.
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

const MapMarker = ({ top, left, right, bottom, distance, color, icon }) => {
  return (
    <View style={[styles.markerWrap, { top, left, right, bottom }]}>
      <Text style={styles.markerDistance}>{distance}</Text>

      <View style={[styles.markerPin, { backgroundColor: color }]}>
        <Feather name={icon} size={15} color={COLORS.white} />
      </View>

      <View style={[styles.markerTriangle, { borderTopColor: color }]} />
    </View>
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

  gridLineHorizontalOne: {
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  gridLineHorizontalTwo: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  gridLineHorizontalThree: {
    position: "absolute",
    top: "75%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  gridLineVerticalOne: {
    position: "absolute",
    left: "25%",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  gridLineVerticalTwo: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  gridLineVerticalThree: {
    position: "absolute",
    left: "75%",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  userLocation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    alignItems: "center",
    justifyContent: "center",
  },

  userPulse: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(40,107,194,0.18)",
  },

  userDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.primary,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  markerWrap: {
    position: "absolute",
    alignItems: "center",
  },

  markerDistance: {
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  markerPin: {
    width: 34,
    height: 38,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  markerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
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
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  hospitalList: {
    gap: 12,
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