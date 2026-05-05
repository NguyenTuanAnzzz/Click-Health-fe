    import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants/theme";
import UserLayout from "../../../layouts/UserLayout";

const filters = [
  { id: 1, title: "Tất cả", active: true },
  { id: 2, title: "Cấp cứu 24/7", icon: "truck" },
  { id: 3, title: "Bệnh viện công" },
  { id: 4, title: "Bệnh viện tư" },
];

const hospitals = [
  {
    id: 1,
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, P.12, Q.5",
    distance: "0.8 km",
    rating: "4.8",
    reviews: "2.5k",
    status: "Mở",
    icon: "briefcase",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    phone: "0289235800",
  },
  {
    id: 2,
    name: "Bệnh viện Đại học Y Dược",
    address: "215 Hồng Bàng, P.11, Q.5",
    distance: "1.2 km",
    rating: "4.6",
    reviews: "1.8k",
    status: "Mở",
    icon: "home",
    color: COLORS.primary,
    bgColor: "#EEF6FF",
    phone: "0289235800",
  },
  {
    id: 3,
    name: "Bệnh viện Tim Tâm Đức",
    address: "4 Nguyễn Lương Bằng, P.Tân Phú, Q.7",
    distance: "2.1 km",
    rating: "4.9",
    reviews: "3.2k",
    status: "Mở",
    icon: "heart",
    color: "#84AAD8",
    bgColor: "#F0F7FF",
    phone: "02839237088",
  },
  {
    id: 4,
    name: "Bệnh viện 175",
    address: "786 Nguyễn Kiệm, P.3, Q.Gò Vấp",
    distance: "3.5 km",
    rating: "4.5",
    reviews: "1.5k",
    status: "Đóng",
    icon: "activity",
    color: COLORS.primary,
    bgColor: "#EEF6FF",
    phone: "02839237088",
  },
];

const NearbyHospitalScreen = () => {
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleDirection = () => {
    Linking.openURL("https://www.google.com/maps");
  };

  return (
    <UserLayout>
      <View style={styles.pageTitleBox}>
        <View style={styles.pageIconBox}>
          <Feather name="map-pin" size={21} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.pageTitle}>Bệnh viện gần nhất</Text>
          <Text style={styles.pageDesc}>Tìm bệnh viện gần bạn nhất</Text>
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
          <Feather name="arrow-up-down" size={15} color={COLORS.primary} />
          <Text style={styles.sortText}>Khoảng cách</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hospitalList}>
        {hospitals.map((item) => (
          <HospitalCard
            key={item.id}
            item={item}
            onCall={() => handleCall(item.phone)}
            onDirection={handleDirection}
          />
        ))}
      </View>

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

const HospitalCard = ({ item, onCall, onDirection }) => {
  const isOpen = item.status === "Mở";

  return (
    <View style={styles.hospitalCard}>
      <View style={[styles.hospitalIconBox, { backgroundColor: item.bgColor }]}>
        <Feather name={item.icon} size={23} color={item.color} />
      </View>

      <View style={styles.hospitalContent}>
        <View style={styles.hospitalTopRow}>
          <Text style={styles.hospitalName} numberOfLines={1}>
            {item.name}
          </Text>

          <View
            style={[
              styles.statusBadge,
              isOpen ? styles.statusOpen : styles.statusClose,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isOpen ? styles.statusTextOpen : styles.statusTextClose,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Feather name="star" size={13} color="#FACC15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewText}>({item.reviews} đánh giá)</Text>
        </View>

        <Text style={styles.address} numberOfLines={1}>
          {item.address}
        </Text>

        <View style={styles.cardBottomRow}>
          <View style={styles.distanceRow}>
            <Feather name="map-pin" size={14} color={COLORS.primary} />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.directionButton}
              activeOpacity={0.8}
              onPress={onDirection}
            >
              <Feather name="navigation" size={16} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.8}
              onPress={onCall}
            >
              <Feather name="phone" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NearbyHospitalScreen;

const styles = StyleSheet.create({
  pageTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  pageIconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(132,170,216,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  pageTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: COLORS.black,
  },

  pageDesc: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.darkGray,
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

  hospitalCard: {
    minHeight: 112,
    borderRadius: 22,
    padding: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    flexDirection: "row",

    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  hospitalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  hospitalContent: {
    flex: 1,
    minWidth: 0,
  },

  hospitalTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },

  hospitalName: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: COLORS.black,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  statusOpen: {
    backgroundColor: "#DCFCE7",
  },

  statusClose: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },

  statusTextOpen: {
    color: "#15803D",
  },

  statusTextClose: {
    color: "#B91C1C",
  },

  ratingRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  reviewText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textMuted,
  },

  address: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.darkGray,
  },

  cardBottomRow: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  distanceText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primary,
  },

  actionRow: {
    flexDirection: "row",
    gap: 8,
  },

  directionButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(132,170,216,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  callButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
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