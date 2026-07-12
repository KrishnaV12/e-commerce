import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filtersSlice";
import favoritesReducer, { STORAGE_KEY } from "../features/favouriteSlice";
import uiReducer from "../features/uiSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
});

let prev = {};
store.subscribe(() => {
  const { favorites, ui } = store.getState();
  try {
    if (favorites.ids !== prev.favIds) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.ids));
      prev.favIds = favorites.ids;
    }
    if (ui.theme !== prev.theme) {
      localStorage.setItem("greencart.theme", JSON.stringify(ui.theme));
      prev.theme = ui.theme;
    }
  } catch {}
});
