import { create } from 'zustand';

export const darkTheme = {
  "colorTextBase": "#FFF",
  "colorBgBase": "#000"
}

export const lightTheme = {
  "colorTextBase": "#000",
  "colorBgBase": "#FFF"
}

export const useThemeStore = create((set, get) => ({
  theme: {},
  themeValue: '',
  setTheme: (themeValue) => {
    if (themeValue === 'darkTheme') {
      return set(state => ({ theme: darkTheme, themeValue }))
    } else {
      return set(state => ({ theme: lightTheme, themeValue }))
    }
  },
}))
