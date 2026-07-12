import { createSlice } from "@reduxjs/toolkit";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: load("greencart.theme", "light") },
  reducers: {
    toggleTheme: (s) => {
      s.theme = s.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
