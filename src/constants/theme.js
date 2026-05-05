export const COLORS = {
  primary: "#286BC2",
  primaryDark: "#1E5296",
  primaryLight: "#84AAD8",

  white: "#FFFFFF",
  black: "#111827",

  background: "#FFFFFF",
  screenBackground: "#FFFFFF",

  gray: "#F9FAFB",
  lightGray: "#F3F4F6",
  inputBackground: "#F5F6FA",

  border: "#EEF2F7",

  darkGray: "#6B7280",
  textMuted: "#9CA3AF",

  error: "#EF4444",
  success: "#22C55E",

  gradientBlue: ["#286BC2", "#3E7FCA", "#84AAD8"],
};

export const SIZES = {
  padding: 24,
  radius: 18,
  h1: 30,
  h2: 22,
  h3: 16,
  body: 14,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: "bold" },
  h2: { fontSize: SIZES.h2, fontWeight: "bold" },
  h3: { fontSize: SIZES.h3, fontWeight: "600" },
  body: { fontSize: SIZES.body, fontWeight: "400" },
};

export default { COLORS, SIZES, FONTS };