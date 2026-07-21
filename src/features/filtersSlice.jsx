import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: "All", minRating: 0, sort: "none"  , showSaleOnly:false };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (s, a) => {
      s.category = a.payload;
    },
    setMinRating: (s, a) => {
      s.minRating = a.payload;
    },
    setSort: (s, a) => {
      s.sort = a.payload;
    },
    saleToggle:(s)=>{
      s.showSaleOnly = !s.showSaleOnly
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setMinRating, setSort, resetFilters , saleToggle } =
  filtersSlice.actions;
export default filtersSlice.reducer;
