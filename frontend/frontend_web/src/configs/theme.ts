import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8a55f7',
    },
    secondary: {
      main: '#00a9f4',
    },
    background: {
      default: '#f5f2ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#141421',
      secondary: '#6f6a7f',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
});
