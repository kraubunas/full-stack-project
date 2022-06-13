import '@mui/material';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    section: CSSProperties;
    box: CSSProperties;
    container: CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    darkBlue?: PaletteColorOptions;
    blue?: PaletteColorOptions;
    lightBlue?: PaletteColorOptions;
    white?: PaletteColorOptions;
  }

  interface Palette {
    darkBlue: PaletteColor;
    blue: PaletteColor;
    lightBlue: PaletteColor;
    white: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    yellow: true;
    green: true;
    red: true;
  }
}
