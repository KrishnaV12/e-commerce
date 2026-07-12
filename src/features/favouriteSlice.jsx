import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY = "greencart.favorites";
function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: loadFavorites() },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export { STORAGE_KEY };
export default favoritesSlice.reducer;
