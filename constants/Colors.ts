/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  WHITE:'#fff',
  PRIMERY:'#17202a',
  GRAY:'#808080',
  LIGHTGRAY: '#E8E8E8',
  DIMMYGRAY: '#a6a6a6',
  RED:'#f71f15',
  LIGHTRED:"#F6CACA",
  LIGHTBLUE:'#43abb6',
  Rosy_Brown:'#bc8f8f',
  SILVER: '#dad7d7',

  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
