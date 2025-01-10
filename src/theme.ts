import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFB300", // Orange from the sidebar button
      light: "#FFD54F",
      dark: "#FFA000",
    },
    secondary: {
      main: "#4CAF50", // Green accents in the image
      light: "#81C784",
      dark: "#388E3C",
    },
    text: {
      primary: "#333333", // Dark text
      secondary: "#757575", // Light text for descriptions
    },
    background: {
      default: "#F5F5F5", // Light background
      paper: "#FFFFFF", // White card background
    },
    warning: {
      main: "#FF5722", // Warnings and alerts
    },
    info: {
      main: "#0288D1", // Blue tones
    },
    success: {
      main: "#66BB6A", // Green success tones
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#333333",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#333333",
    },
    body1: {
      fontSize: "1rem",
      color: "#757575",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: "bold",
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#FFB300",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#FFA000",
          },
        },
        outlinedPrimary: {
          borderColor: "#FFB300",
          color: "#FFB300",
          "&:hover": {
            borderColor: "#FFA000",
            backgroundColor: "#FFF3E0",
          },
        },
        containedSecondary: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#388E3C",
          },
        },
        outlinedSecondary: {
          borderColor: "#4CAF50",
          color: "#4CAF50",
          "&:hover": {
            borderColor: "#388E3C",
            backgroundColor: "#E8F5E9",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
