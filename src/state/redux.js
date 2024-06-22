import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  readingMode: 'no',
  mode: 'light',
  detailCerita: [],
  favorite: [],
  language: 'Indonesia',
  jeniscerita: '',
  search: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setReadingmode: (state, action) => {
      state.readingMode = action.payload.readingMode;
    },
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },
    setDetailCerita: (state, action) => {
      state.detailCerita = action.payload.detailCerita;
    },
    setJenisCeritaRedux: (state, action) => {
      state.jeniscerita = action.payload.jeniscerita;
    },
    setSearchRedux: (state, action) => {
      state.search = action.payload.search;
    },
    setFavoriteList: (state, action) => {
      state.favorite = action.payload.favorite;
    },
  },
});

export const { setLogin, setLogout, setMode, setReadingmode, setDetailCerita, setLanguage, setJenisCeritaRedux, setSearchRedux, setFavoriteList } =
  authSlice.actions;
export default authSlice.reducer;
